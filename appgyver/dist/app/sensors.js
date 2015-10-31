(function() {
  angular.module('sensors', ['common']);

}).call(this);

(function() {
  angular.module('sensors').controller('AccelerometerController', function($scope, supersonic) {});

}).call(this);

(function() {
  angular.module('sensors').controller('CompassController', function($scope, supersonic) {
    $scope.reading = 0;
    $scope.accuracy = 0;
    $scope.isWatching = false;
    $scope.compassIsInitiated = false;
    supersonic.ui.views.current.whenVisible(function() {
      if (!$scope.compassIsInitiated) {
        $scope.compassIsInitiated = true;
        supersonic.device.compass.watchHeading({
          frequency: 100
        }).onValue(function(heading) {
          if ($scope.isWatching) {
            return $scope.$apply(function() {
              $scope.reading = heading.magneticHeading;
              return $scope.accuracy = heading.headingAccuracy;
            });
          }
        });
      }
      return $scope.isWatching = true;
    });
    return supersonic.ui.views.current.whenHidden(function() {
      return $scope.isWatching = false;
    });
  });

}).call(this);

(function() {
  angular.module('sensors').controller('GeolocationController', function($scope, supersonic, $timeout) {
    $scope.position = {
      latitude: 0,
      longitude: 0,
      accuracy: 100
    };
    $scope.isGettingPosition = false;
    $scope.isWatchingPosition = false;
    $scope.getPosition = function() {
      if ($scope.isGettingPosition || $scope.isWatchingPosition) {
        return;
      }
      $scope.isGettingPosition = true;
      return supersonic.device.geolocation.getPosition().then(function(position) {
        return $scope.position = position.coords;
      })["finally"](function() {
        return $scope.isGettingPosition = false;
      });
    };
    $scope.startWatchingPosition = function() {
      if ($scope.isWatchingPosition) {
        return;
      }
      $scope.isWatchingPosition = true;
      return supersonic.device.geolocation.watchPosition({
        enableHighAccuracy: true
      }).onValue(function(position) {
        return $timeout(function() {
          return $scope.position = position.coords;
        });
      });
    };
    $scope.stopWatchingPosition = function() {
      return $scope.isWatchingPosition = false;
    };
    $scope.toggleWatch = function() {
      if ($scope.isWatchingPosition) {
        return $scope.stopWatchingPosition();
      } else {
        return $scope.startWatchingPosition();
      }
    };
    supersonic.ui.views.current.whenVisible(function() {
      if (!$scope.isWatchingPosition) {
        return $scope.getPosition();
      }
    });
    if (!$scope.isWatchingPosition) {
      return $scope.getPosition();
    }
  });

}).call(this);

(function() {
  angular.module('sensors').directive('accelerometerVisualization', function($window, supersonic) {
    return {
      restrict: "E",
      template: "<div class=\"accelerometer-visualization-container\"></div>",
      replace: true,
      link: function($scope, element, attr) {
        var canvas, chart, ctx, data, options;
        canvas = document.createElement("canvas");
        canvas.width = element[0].offsetWidth;
        canvas.height = element[0].offsetWidth;
        element.prepend(canvas);
        data = [
          {
            value: 0,
            color: "#F7464A"
          }, {
            value: 0,
            color: "#46BFBD"
          }, {
            value: 0,
            color: "#FDB45C"
          }, {
            value: 0,
            color: "#949FB1"
          }
        ];
        options = {
          animation: false,
          animateRotate: false,
          animateScale: false,
          legendTemplate: "",
          scaleOverride: true,
          scaleStartValue: 0,
          scaleIntegersOnly: true,
          scaleStepWidth: 5,
          scaleSteps: 4,
          scaleShowLabels: false
        };
        ctx = canvas.getContext("2d");
        chart = new Chart(ctx).PolarArea(data, options);
        return supersonic.device.accelerometer.watchAcceleration({
          frequency: 100
        }).onValue(function(acceleration) {
          if (acceleration.y >= 0) {
            chart.segments[0].value = acceleration.y;
            chart.segments[2].value = 0;
          } else {
            chart.segments[0].value = 0;
            chart.segments[2].value = -acceleration.y;
          }
          if (acceleration.x >= 0) {
            chart.segments[1].value = acceleration.x;
            chart.segments[3].value = 0;
          } else {
            chart.segments[1].value = 0;
            chart.segments[3].value = -acceleration.x;
          }
          return chart.update();
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module('sensors').directive('kitchensinkGoogleMaps', function($window, supersonic) {
    return {
      restrict: "E",
      template: "<div class=\"google-maps-container\"></div>",
      replace: true,
      scope: {
        position: "="
      },
      link: function($scope, element, attr) {
        var demoAccuracyCircle, demoMap, demoMarker, el, updateLocation;
        el = document.createElement("div");
        element.prepend(el);
        demoMap = new google.maps.Map(el, {
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          draggable: false
        });
        demoAccuracyCircle = new google.maps.Circle({
          map: demoMap,
          fillColor: "#00B5FF",
          fillOpacity: 0,
          strokeColor: "#00B5FF",
          strokeOpacity: 0.5,
          strokeWeight: 2
        });
        demoMarker = new google.maps.Marker({
          map: demoMap
        });
        updateLocation = function() {
          var newLatLng;
          newLatLng = new google.maps.LatLng($scope.position.latitude, $scope.position.longitude);
          demoMap.setCenter(newLatLng);
          demoMarker.setPosition(newLatLng);
          demoAccuracyCircle.setCenter(newLatLng);
          return demoAccuracyCircle.setRadius($scope.position.accuracy);
        };
        return $scope.$watch("position", function() {
          return updateLocation();
        }, true);
      }
    };
  });

}).call(this);

(function() {
  angular.module('sensors').filter('round', function() {
    return function(input) {
      return Math.round(input);
    };
  });

}).call(this);

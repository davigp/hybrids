(function() {
  angular.module('kitchensink', ['supersonic']);

}).call(this);

(function() {
  angular.module('kitchensink').controller('IndexController', function($scope, supersonic, $timeout) {
    $scope.supersonic = supersonic;

    /*
    Statusbar
     */
    $scope.statusBarEnabled = true;
    $scope.$watch("statusBarEnabled", function(newVal) {
      if (newVal) {
        return supersonic.app.statusBar.show();
      } else {
        return supersonic.app.statusBar.hide();
      }
    });

    /*
    Tabs
     */
    $scope.tabsEnabled = true;
    $scope.$watch("tabsEnabled", function(newVal) {
      if (newVal) {
        return supersonic.ui.tabs.show();
      } else {
        return supersonic.ui.tabs.hide();
      }
    });

    /*
    Splash screen
     */
    return $scope.showSplashScreen = function() {
      return supersonic.app.splashscreen.show().then(function() {
        return $timeout(function() {
          return supersonic.app.splashscreen.hide();
        }, 1000);
      });
    };
  });

}).call(this);

(function() {
  angular.module('kitchensink').controller('LearnMoreController', function($scope, supersonic) {
    return $scope.navbarTitle = "Learn More";
  });

}).call(this);

(function() {
  angular.module('kitchensink').controller('SettingsController', function($scope, supersonic) {
    return $scope.navbarTitle = "Settings";
  });

}).call(this);

(function() {
  angular.module('status', ['common']);

}).call(this);

(function() {
  angular.module('status').controller('NetworkController', function($scope, supersonic) {
    $scope.networkStatus = "online";
    supersonic.device.network.whenOffline(function() {
      return $scope.networkStatus = "offline";
    });
    return supersonic.device.network.whenOnline(function() {
      return $scope.networkStatus = "online";
    });
  });

}).call(this);

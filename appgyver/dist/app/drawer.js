(function() {
  angular.module('drawer', ['common']);

}).call(this);

(function() {
  angular.module('drawer').controller('DrawerController', function($scope, supersonic) {
    return $scope.supersonic = supersonic;
  });

}).call(this);

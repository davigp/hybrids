(function() {
  angular.module('navigation', ['common']);

}).call(this);

(function() {
  angular.module('navigation').controller('TransitionController', function($scope, supersonic) {
    $scope.animationSpeed = 0.6;
    return $scope.performAnimation = function(transitionName) {
      var options;
      options = {
        duration: parseFloat($scope.animationSpeed)
      };
      return supersonic.ui.animate(transitionName, options).perform();
    };
  });

}).call(this);

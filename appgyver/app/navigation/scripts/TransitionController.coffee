angular
  .module('navigation')
  .controller 'TransitionController', ($scope, supersonic) ->

    $scope.animationSpeed = 0.6

    $scope.performAnimation = (transitionName) ->
      # Animation options
      options =
        duration: parseFloat($scope.animationSpeed)

      # Perform the animation
      supersonic.ui.animate(transitionName, options).perform()

angular
  .module('sensors')
  .controller 'AccelerometerController', ($scope, supersonic) ->

    ## Accelerometer reading
    #$scope.acceleration =
    #  x: 0
    #  y: 0
    #  z: 0

    ## Are we watching reading?
    #$scope.isWatching = false

    ## This function listens to compass value changes
    #supersonic.device.accelerometer.watchAcceleration().onValue (acceleration) ->
    #  if $scope.isWatching = true
    #    $scope.$apply ->
    #      $scope.acceleration = acceleration

    ## Start updating the view when view becomes visible
    #supersonic.ui.views.current.whenVisible ->
    #  $scope.isWatching = true

    ## Stop updating the view when view is hidden
    #supersonic.ui.views.current.whenHidden ->
    #  $scope.isWatching = false


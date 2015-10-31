angular
  .module('sensors')
  .controller 'CompassController', ($scope, supersonic) ->

    # Compass reading
    $scope.reading = 0
    $scope.accuracy = 0

    # Are we watching reading?
    $scope.isWatching = false

    # Start updating the view when view becomes visible
    $scope.compassIsInitiated = false
    supersonic.ui.views.current.whenVisible ->
      if not $scope.compassIsInitiated
        $scope.compassIsInitiated = true
        # This function listens to compass value changes
        supersonic.device.compass.watchHeading({ frequency: 100 }).onValue (heading) ->
          if $scope.isWatching
            $scope.$apply () ->
              $scope.reading = heading.magneticHeading
              $scope.accuracy = heading.headingAccuracy
      $scope.isWatching = true

    # Stop updating the view when view is hidden
    supersonic.ui.views.current.whenHidden ->
      $scope.isWatching = false


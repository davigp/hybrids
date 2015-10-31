angular
  .module('sensors')
  .controller 'GeolocationController', ($scope, supersonic, $timeout) ->

    # Initial position at (0,0)
    $scope.position =
      latitude: 0
      longitude: 0
      accuracy: 100

    # Are we currently gettting position?
    $scope.isGettingPosition = false

    # Are we watching for changes in user's position?
    $scope.isWatchingPosition = false

    # Method for getting user's current position now
    $scope.getPosition = ->
      return if $scope.isGettingPosition or $scope.isWatchingPosition
      $scope.isGettingPosition = true
      supersonic.device.geolocation.getPosition()
        .then (position) ->
          $scope.position = position.coords
        .finally ->
          $scope.isGettingPosition = false

    # Method to keep watching for changes in user's current position
    $scope.startWatchingPosition = ->
      return if $scope.isWatchingPosition
      $scope.isWatchingPosition = true
      supersonic.device.geolocation.watchPosition({ enableHighAccuracy: true }).onValue (position) ->
        $timeout () ->
          $scope.position = position.coords

    # Method to stop watching for location
    $scope.stopWatchingPosition = ->
      $scope.isWatchingPosition = false

    # Method toggling watch
    $scope.toggleWatch = ->
      if $scope.isWatchingPosition
        $scope.stopWatchingPosition()
      else
        $scope.startWatchingPosition()

    # Get position on when view is shown
    supersonic.ui.views.current.whenVisible ->
      $scope.getPosition() unless $scope.isWatchingPosition

    # Let's get initial location on when view is created
    # This is just to make the map targeted to current location before the view is opened
    $scope.getPosition() unless $scope.isWatchingPosition


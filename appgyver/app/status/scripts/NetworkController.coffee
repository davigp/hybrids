angular
  .module('status')
  .controller 'NetworkController', ($scope, supersonic) ->

    $scope.networkStatus = "online"

    supersonic.device.network.whenOffline ->
      $scope.networkStatus = "offline"

    supersonic.device.network.whenOnline ->
      $scope.networkStatus = "online"


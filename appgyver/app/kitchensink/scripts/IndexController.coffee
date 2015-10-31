angular
  .module('kitchensink')
  .controller 'IndexController', ($scope, supersonic, $timeout) ->

    $scope.supersonic = supersonic

    ###
    Statusbar
    ###

    $scope.statusBarEnabled = true

    $scope.$watch "statusBarEnabled", (newVal) ->
      if newVal then supersonic.app.statusBar.show()
      else supersonic.app.statusBar.hide()

    ###
    Tabs
    ###

    $scope.tabsEnabled = true

    $scope.$watch "tabsEnabled", (newVal) ->
      if newVal then supersonic.ui.tabs.show()
      else supersonic.ui.tabs.hide()

    ###
    Splash screen
    ###

    $scope.showSplashScreen = ->
      supersonic.app.splashscreen.show().then () ->
        $timeout ->
          supersonic.app.splashscreen.hide()
        , 1000
angular.module 'common', [
  # Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]

angular
  .module 'common'
  .run (supersonic) ->

    supersonic.ui.screen.setAllowedRotations ["portrait", "portraitUpsideDown"]
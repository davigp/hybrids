(function() {
  angular.module('common', ['supersonic']);

  angular.module('common').run(function(supersonic) {
    return supersonic.ui.screen.setAllowedRotations(["portrait", "portraitUpsideDown"]);
  });

}).call(this);

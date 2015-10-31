angular
  .module('sensors')
  .filter 'round', () ->
    (input) ->
      Math.round input
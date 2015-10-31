angular
  .module('sensors')
  .directive 'accelerometerVisualization', ($window, supersonic) ->
    restrict: "E"
    template: """<div class="accelerometer-visualization-container"></div>"""
    replace: true
    #scope:
    #  acceleration: "="
    link: ($scope, element, attr) ->

      # Create map element
      canvas = document.createElement "canvas"
      canvas.width = element[0].offsetWidth
      canvas.height = element[0].offsetWidth
      element.prepend canvas

      # Initial demo data
      data = [
        {
            value: 0
            color:"#F7464A"
        }
        {
            value: 0
            color: "#46BFBD"
        }
        {
            value: 0
            color: "#FDB45C"
        }
        {
            value: 0
            color: "#949FB1"
        }
      ]

      # Chart options
      options =
        animation: false
        animateRotate: false
        animateScale: false
        legendTemplate: ""
        scaleOverride: true
        scaleStartValue: 0
        scaleIntegersOnly: true
        scaleStepWidth: 5
        scaleSteps: 4
        scaleShowLabels: false

      # Create the chart
      ctx = canvas.getContext("2d")
      chart = new Chart(ctx).PolarArea data, options

      # Watch for changes in position
      #$scope.$watch "acceleration", ->
      #  # Vertical values
      #  if $scope.acceleration.y >= 0
      #    chart.segments[0].value = $scope.acceleration.y
      #    chart.segments[2].value = 0
      #  else
      #    chart.segments[0].value = 0
      #    chart.segments[2].value = -$scope.acceleration.y
      #  # Horizontal values
      #  if $scope.acceleration.x >= 0
      #    chart.segments[1].value = $scope.acceleration.x
      #    chart.segments[3].value = 0
      #  else
      #    chart.segments[1].value = 0
      #    chart.segments[3].value = -$scope.acceleration.x
      #  # Finally, update the chart
      #  chart.update()
      #, true

      supersonic.device.accelerometer.watchAcceleration({ frequency: 100 }).onValue (acceleration) ->
        # Vertical values
        if acceleration.y >= 0
          chart.segments[0].value = acceleration.y
          chart.segments[2].value = 0
        else
          chart.segments[0].value = 0
          chart.segments[2].value = -acceleration.y
        # Horizontal values
        if acceleration.x >= 0
          chart.segments[1].value = acceleration.x
          chart.segments[3].value = 0
        else
          chart.segments[1].value = 0
          chart.segments[3].value = -acceleration.x
        # Finally, update the chart
        chart.update()









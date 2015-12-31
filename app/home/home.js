(function () {
    'use strict';
    var controllerId = 'homeController';
    App.controller(controllerId, ["$scope", "$http", "$window",

          function homeController($scope, $http, $window) {

            $scope.init = function() {
              //console.log("hello");
              //Set up dimensions for viz
              $scope.width = 550;
              $scope.height = 550;
              $scope.loaded = false;
              var sites = d3.range(30).map(function(d) {
                return [Math.random() * $scope.width, Math.random() * $scope.height];
              });

              //console.log("sites", sites);

              var dan = new Image;
              dan.src = "home/DA2.jpg";
              

              $scope.canvas = d3.select("#voronoi").append("canvas")
                                .attr("width", $scope.width)
                                .attr("height", $scope.height)
                                .on("mousemove", function() { 
                                  //console.log('1', sites[0])
                                  sites[0] = d3.mouse(this);
                                  //console.log('2', sites[0]) 
                                  $scope.redraw(dan, sites); 
                                });

              $scope.context = $scope.canvas.node().getContext("2d");                  

              //init
                
              setTimeout(function() {
                $scope.redraw(dan, sites); 
                $scope.loaded = true;
                $scope.$apply();
              }, 500);              

              
            };

            //redraw on mousemove
            $scope.redraw = function(pic, sites) {
              var cells = d3.geom.voronoi(sites);
              //console.log('1', cells);
              cells.forEach(function(cell) {
                $scope.context.save();
                $scope.path(cell);
                $scope.context.clip();
                $scope.context.drawImage(pic, cell.point[0] - 100, cell.point[1] - 100);
                $scope.context.stroke();
                $scope.context.restore();
              });
  
            };

            //layout paths
            $scope.path = function(cell) {
              $scope.context.beginPath();
              $scope.context.moveTo(cell[0][0], cell[0][1]);
              for (var i = 1, n = cell.length; i < n; ++i) {
                $scope.context.lineTo(cell[i][0], cell[i][1]);
              } 
              $scope.context.closePath();
            };


            function reloadPage() {
                $window.location.reload();
            }
        }
    ]);
})();
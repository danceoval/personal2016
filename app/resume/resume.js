(function () {
    'use strict';
    var controllerId = 'resumeController';
    App.controller(controllerId, ["$scope", "$http", "$window",

          function resumeController($scope, $http, $window) {

            $scope.init = function() {
              $scope.assembleWork();
              $scope.assembleSchool();

        
              $scope.initializeMap();
              
              
            };

            $scope.HTMLworkStart = "<div class='work-entry'></div>";
            $scope.HTMLworkEmployer = "<h4>%data%";
            $scope.HTMLworkTitle = " - %data%</h4>";
            $scope.HTMLworkDates = "<div class='date-text'>%data%</div>";
            $scope.HTMLworkLocation = "<div class='location-text'>%data%</div>";
            $scope.HTMLworkDescription = "<p><br>%data%</p>";

            $scope.HTMLschoolStart = "<div class='education-entry'></div>";
            $scope.HTMLschoolName = "<h4>%data%";
            $scope.HTMLschoolDegree = " -- %data%</h4>";
            $scope.HTMLschoolDates = "<div class='date-text'>%data%</div>";
            $scope.HTMLschoolLocation = "<div class='location-text'>%data%</div>";
            $scope.HTMLschoolMajor = "<p><br>Major: %data%</p>";


            $scope.work = {
              "jobs": [
                        {
                          "employer" : "EEVO",
                          "title" : "Javascript Developer",
                          "location" : "New York, New York",
                          "datesWorked"    : "March 2014 - Current",
                          "description" : "Lead developer for web-based Content Management system, data visualizations suite and web portal for Virtual Reality film producers."
                        },
                        {
                          "employer" : "AgencyRX",
                          "title" : "Front End Developer",
                          "location" : "New York, New York",
                          "datesWorked"    : "July 2014 - March 2014",
                          "description" : "Web developer with a front-end/UI lean. Projects include Digital Sales Tools, Prescribing Index apps and interactive banner ads for top-ten pharmaceutical companies."
                        },
                        {
                          "employer" : "US Dept. of State",
                          "title" : "Fulbright Fellow",
                          "location" : "Mokpo, S. Korea",
                          "datesWorked"    : "July 2013 - July 2014",
                          "description" : "Researched and reported on media addiction among Korean millennials. Taught 20 classes of English weekly to 750+ Korean students at Deogin Middle School."
                        },  
                        {
                          "employer" : "Vassar College",
                          "title" : "Cognitive Science Assistant",
                          "location" : "Poughkeepsie, New York",
                          "datesWorked"    : "September 2010 - May 2013",
                          "description" : "Assisted students on quantitative assignments and essays for departmental classes. Edited course syllabi and acted as a liaison between professors, administration and students"
                        },
                        {
                          "employer" : "Institute of Intelligent Systems",
                          "title" : "Research Assistant",
                          "location" : "Memphis, Tennessee",
                          "datesWorked"    : "June 2012 - July 2012",
                          "description" : "Scripted and debugged chat-bots in XML and C# designed to tutor middle school biology"
                        },
                        {
                          "employer" : "Laboratory of Applied Linguistics, Texas A&M University",
                          "title" : "Research Assistant",
                          "location" : "Commerce, Texas",
                          "datesWorked"    : "July 2012 - August 2012",
                          "description" : "Designed and conducted studies on prosody in joke telling. Analyzed experimental data in SPSS, research currently in peer review."
                        },
                        {
                          "employer" : "Nature Place Day Camp",
                          "title" : "Activity Leader",
                          "location" : "Chestnut Ridge, NY",
                          "datesWorked"    : "May 2010 - August 2011",
                          "description" : "Led non-competitive, drama and music activities for campers (ages 3 &#45; 15)."
                        }
                      ]
              };

            $scope.education = {
              "schools" : [ {
                "name": "Vassar College",
                "location" : "Poughkeepsie, NY",
                "degree" : "BA",
                "major" : "Cognitive Science and English",
                "datesAttended" : "2009 - 2013",
                "url" : "http://www.vassar.edu"
              }]
            } ; 

            //loop through work obj and append to DOM
            $scope.assembleWork = function() {
              angular.element(document.querySelector('#workExperience')).append($scope.HTMLworkStart);

              for(var n = 0; n < $scope.work.jobs.length; n++){
                var employer = $scope.HTMLworkEmployer.replace('%data%', $scope.work.jobs[n].employer);
                var workTitle = $scope.HTMLworkTitle.replace('%data%', $scope.work.jobs[n].title);
                var employerTitle = employer.concat(workTitle);
                var dates = $scope.HTMLworkDates.replace('%data%', $scope.work.jobs[n].datesWorked);
                var loc = $scope.HTMLworkLocation.replace('%data%', $scope.work.jobs[n].location);
                var description = $scope.HTMLworkDescription.replace('%data%', $scope.work.jobs[n].description);
                //console.log(n, employerTitle, dates, loc, description)
                angular.element(document.querySelector('.work-entry')).append(employerTitle);
                angular.element(document.querySelector('.work-entry')).append(dates);
                angular.element(document.querySelector('.work-entry')).append(loc);
                angular.element(document.querySelector('.work-entry')).append(description); 
              }
            } ;  

          //parse school obj and append to DOM
          $scope.assembleSchool = function() {
            var schoolName = $scope.HTMLschoolName.replace('%data%', $scope.education.schools[0].name);
            var schoolDegree = $scope.HTMLschoolDegree.replace('%data%', $scope.education.schools[0].degree);
            var school = schoolName.concat(schoolDegree);
            var schoolDates = $scope.HTMLschoolDates.replace('%data%', $scope.education.schools[0].datesAttended);
            var schoolLoc = $scope.HTMLschoolLocation.replace('%data%', $scope.education.schools[0].location);
            var major = $scope.HTMLschoolMajor.replace('%data%', $scope.education.schools[0].major);

            angular.element(document.querySelector('#education')).append($scope.HTMLschoolStart);
            angular.element(document.querySelector('.education-entry')).append(school);
            angular.element(document.querySelector('.education-entry')).append(schoolDates);
            angular.element(document.querySelector('.education-entry')).append(schoolLoc);
            angular.element(document.querySelector('.education-entry')).append(major);

          };

          $scope.initializeMap = function() {
              var mapOptions = {
                  zoom: 2,
                  center: new google.maps.LatLng(40.0000, -98.0000)
              }

            $scope.map =  new google.maps.Map(document.getElementById('map'), mapOptions);
            var locations = [];
              
            var service = new google.maps.places.PlacesService($scope.map);
            
            for (var school in $scope.education.schools) {
              locations.push($scope.education.schools[school].location);
            }

            for (var job in $scope.work.jobs) {
              locations.push($scope.work.jobs[job].location);
            }

            $scope.locations = locations;
            //console.log($scope.locations);
            //pin marker
            for (var i = 0; i < $scope.locations.length; ++i) {

              // the search request object
              var request = {
                query: $scope.locations[i]
              }

              // search for data
              service.textSearch(request, $scope.callback);
            }
          };
           
    
           
      
        //map marker for google map
        $scope.createMapMarker = function(placeData) {
        
          var lat = placeData.geometry.location.lat();  // latitude from the place service
          var lon = placeData.geometry.location.lng();  // longitude from the place service
          var location = new google.maps.LatLng(lat, lon);
          var name = placeData.formatted_address;
          var marker = new google.maps.Marker({
             position: location,
             title: name
          });
          marker.setMap($scope.map);

         
        }

        /*
        callback(results, status) makes sure the search returned results for a location.
        If so, it creates a new map marker for that location.
        */
        $scope.callback = function(results, status) {

          if (status == google.maps.places.PlacesServiceStatus.OK) {
            //console.log(results)
            var places = results[0];
            $scope.createMapMarker(places);
          }
            
   
        };

       

         



            function reloadPage() {
                $window.location.reload();
            }
        }
    ]);
})();
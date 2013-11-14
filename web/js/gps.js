var lbd = angular.module('lbd',["google-maps"]);

//routes section
lbd.config(function ($routeProvider) {
        $routeProvider
        .when('/',{
                controller:'gpsCtrl',
                templateUrl: 'views/map.htm'
        })
        .otherwise({redirectTo:'/'});
});


// controlers section
var controllers = {};

controllers.gpsCtrl = function ($scope, $http) {
        $scope.markers=[];
        $scope.people = [
                {id:"1",firstName:"dean",lastName:"shub",city:"rishon le zion"},
                {id:"2",firstName:"lior",lastName:"bentov",city:"tel aviv"},
                {id:"3",firstName:"yotam",lastName:"roth",city:"rehovot"},
                {id:"4",firstName:"shirit",lastName:"vaxman",city:"rishon le zion"},
                {id:"5",firstName:"talya",lastName:"ronen",city:"beer sheva"}];

        $scope.addMarker = function (){
                // $scope.markers.push({
                //         latitude: parseFloat($scope.markerLat),
                //         longitude: parseFloat($scope.markerLng)
                // });
                        
                // $scope.markerLat = null;
                // $scope.markerLng = null;

                //  var marker = new google.maps.Marker({
                //  position: myLatlng,
                //  map: map,
                //  title: 'Hello World!'
                // });

            $http.get('http://localhost:3000/get_reports/').
            success(function(data, status, headers, config) {
                for (var index=0; index<data.length; index++){
                    for (var cord = 0; cord < data[index].coords.length; cord++) {
                        $scope.markers.push({
                            latitude: parseFloat(data[index].coords[cord].lat),
                            longitude: parseFloat(data[index].coords[cord].longt)
                        });
                    }
                }
            });
        }

        // $scope.markers= [{ 
        //         latitude: 3,
        //         longitude: 35
        //          } ,  { 
        //         latitude: 5,
        //         longitude: 52
        //          } ,  { 
        //         latitude: 3,
        //         longitude: 12
        //          } ,  { 
        //         latitude: 3,
        //         longitude: 42
        //          } ,  { 
        //         latitude: 1,
        //         longitude: 42
        //          } ,  { 
        //         latitude: 0,
        //         longitude: 42
        //          } ,  { 
        //         latitude: 5,
        //         longitude: 53
        //          } ,  { 
        //         latitude: 6,
        //         longitude: 24
        //          } ,  { 
        //         latitude: 7,
        //         longitude: 19
        //          } ,  { 
        //         latitude: 4,
        //         longitude: 38
        //          }];

        $scope.center= {
                latitude: 4, // initial map center latitude
                longitude: 23, // initial map center longitude
                };
             // an array of markers,
        $scope.zoom= 4; // the zoom level
};


lbd.controller(controllers);
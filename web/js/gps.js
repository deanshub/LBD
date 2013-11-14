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

        $scope.center= {
                latitude: 4, // initial map center latitude
                longitude: 23, // initial map center longitude
                };
             // an array of markers,
        $scope.zoom= 4; // the zoom level
};


lbd.controller(controllers);
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

controllers.gpsCtrl = function ($scope) {
        $scope.markers=[];
        $scope.people = [
                {id:"1",firstName:"dean",lastName:"shub",city:"rishon le zion"},
                {id:"2",firstName:"lior",lastName:"bentov",city:"tel aviv"},
                {id:"3",firstName:"yotam",lastName:"roth",city:"rehovot"},
                {id:"4",firstName:"shirit",lastName:"vaxman",city:"rishon le zion"},
                {id:"5",firstName:"talya",lastName:"ronen",city:"beer sheva"}];

        $scope.addMarker = function (){
                $scope.markers.push({
                        latitude: parseFloat($scope.markerLat),
                        longitude: parseFloat($scope.markerLng)
                });
                        
                $scope.markerLat = null;
                $scope.markerLng = null;

                 var marker = new google.maps.Marker({
                 position: myLatlng,
                 map: map,
                 title: 'Hello World!'
                });
        }

        angular.extend($scope, {
            center: {
                latitude: 4, // initial map center latitude
                longitude: 23, // initial map center longitude
            },
            markers: [], // an array of markers,
            zoom: 4, // the zoom level
        });
};


lbd.controller(controllers);
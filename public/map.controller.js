(function () {
    'use strict';

    angular.module('app').controller('mapController', ['$http', 

        function ($http) {
            var vm = this;
            vm.title = 'Skylark Drones'; 
            vm.coordinates = [];
            vm.details = '';
            
            /*var map = L.map('map',{
                center: [43.64701, -79.39425],
                zoom: 15
            });*/

            var planes = [
                [1, "New Delhi", 28.70, 77.10],
                [2, "Mumbai", 19.07, 72.87],
                [3, "Chennai", 13.08, 80.27],
                [4, "Kolkata", 22.57, 88.36]
            ];

            var data = [
                {
                    id: 1,
                    description: 'A beautiful city! Amazing winters'
                },
                {
                    id: 2,
                    description: 'City of dreams!'
                },
                {
                    id: 3,
                    description: 'Hot and humid place'
                },
                {
                    id: 4,
                    description: 'City of lazy people'
                }
            ];            

            vm.init = function() {
                $http.get('coordinates/')
                    .success(function(result, status, headers, config){
                        console.log(status);
                        console.log(result);
                        vm.success = result.success;
                        formatData();
                    })
                    .error(function(result, status){
                        console.log(result.error);
                        vm.error = {msg: result.error};
                        console.log(status);
                    })
            }

            vm.show = function(e) {
                console.log(e.latlng.lat);
                $http.get('city/details/' + e.latlng.lat + '/' + e.latlng.lng)
                    .success(function(result, status, headers, config){
                        console.log(status);
                        console.log(result);
                        vm.details = result.success[0];
                    })
                    .error(function(result, status){
                        console.log(result.error);
                        vm.error = {msg: result.error};
                        console.log(status);
                    })
            }

            function formatData() {
                var temp;
                angular.forEach(vm.success, function(value, key){
                    temp = [];
                    temp.push(value.id);
                    temp.push(value.city_name);
                    temp.push(value.lat);
                    temp.push(value.lng);                        
                    vm.coordinates.push(temp);
                });
                plotMap();
            }

            function plotMap() {
                var mymap = L.map('mapid').setView([vm.coordinates[0][2], vm.coordinates[0][3]], 5);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);

                for (var i = 0; i < vm.coordinates.length; i++){
                    L.marker([vm.coordinates[i][2], vm.coordinates[i][3]]).addTo(mymap)
                        .bindPopup('A pretty CSS3 popup.<br> ' + vm.coordinates[i][1])
                        .on('click', vm.show)
                        .openPopup();
                }
            }

            vm.init();
        }
    ])

})();
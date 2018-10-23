var app = angular.module('foodBaby', []);

app.controller('HomeCtrl', ($scope, $http) => {
  $http.get('/api/listings/upcoming/0-3').then((response) => {
    $scope.listings = response.data;
  }, (error) => {
    console.log('Unable to retrieve listings: ', error);
  });

  $http.get('/api/listings/recent/0-1').then((response) => {
    $scope.recent = response.data[0];
  }, (error) => {
    console.log('Unable to retrieve listings: ', error);
  });

  $scope.view = function(id) {
    window.location = `/api/listings/id/${id}`;
  }
});

app.controller('ListingsCtrl', ($scope, $http) => {

});

angular.module('myApp.store', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/store', {
            templateUrl: 'store/store.html',
            controller: 'storeCtrl'
    })
        .when('/store/:storeId', {
            templateUrl: 'store/storeDetail.html',
            controller: 'storeDetailCtrl'
    })
}])

.controller('storeCtrl', function($scope, $http){
    $http.get('json/store.json').success(function(data){
        $scope.stores = data;
    })
    
})
.controller('storeDetailCtrl',['$scope','$routeParams', '$http','$filter', function($scope, $routeParams, $http, $filter){
    var storeId = $routeParams.storeId;
    $http.get('json/store.json').success(function(data) {
        $scope.store = $filter('filter')(data, function(d){
            return d.id == storeId;
        })[0];
        $scope.mainImage = $scope.store.images[0].name;
    });
    $scope.setImage = function(image) {
        $scope.mainImage = image.name;
    }
    
}]);
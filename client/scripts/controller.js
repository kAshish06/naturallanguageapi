angular.module('naturalLanguageApiApp')
    .controller('mainCtrl', function($scope, $http) {
      $scope.test = 'mainCtrl';
      $scope.testString = "";
      //$scope.results= {};
      $scope.getNaturalLanguageAnalytics = function() {
            var data = {'string': $scope.testString};
            $http.post('/detectSentiment', data)
              .then(function(res) {
                $scope.results = res.data;
                console.log(res.data);
              }, function(err) {
                console.log(err);
              });
      };
    });

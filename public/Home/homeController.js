app.controller('homeController', ['$scope', '$state', '$rootScope', 'api', 'toasterror', function(scope, $state, $rootScope, API, toastr) {
   $rootScope.page = 'home';

   // Get courses and available courses
   API.deathEntry.get().then(function(response) {
      scope.deaths = response.data;
      
   })
   .catch(toastr.doErrorMessage(function(err) {}));;
}])

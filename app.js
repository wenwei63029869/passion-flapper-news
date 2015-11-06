var app = angular.module('flapperNews', ['ui.router']);
app.controller('MainCtrl', [
  '$scope', 'posts',
  function($scope, posts){
    $scope.test = "Wei";
    $scope.posts = posts.posts;
    // setter and reader function together
    $scope.addPost=function(){
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        upvotes: 0,
        link: "http://" + $scope.link,
        comments: [
          {author: 'Joe', body: 'it sucks!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes=function(post) {
      post.upvotes += 1;
    };
    $scope.deletepost=function(post) {
      var index = $scope.posts.indexOf(post);
      $scope.posts.splice(index, 1);
    };
    $scope.image = {
        background: 'url(green.jpg)',

    };

}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0,
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes=function(comment) {
      comment.upvotes += 1;
    };
  $scope.image = {
      background: 'url(green.jpg)',

  };
}]);

app.factory('posts', [function(){
  var o = {
    posts:[
      {title: 'post 1', upvotes: 5, comments: []},
      {title: 'post 2', upvotes: 2, comments: []},
      {title: 'post 3', upvotes: 15, comments: []},
      {title: 'post 4', upvotes: 9, comments: []},
      {title: 'post 5', upvotes: 4, comments: []}
    ]
  };
  return o;
}]);

// app.filter('mostComments', function() {
//   // In the return function, we must pass in a single parameter which will be the data we will work on.
//   // We have the ability to support multiple other parameters that can be passed into the filter optionally
//   return function(inputs) {
//     var newOrder = []
//     var times = inputs.length
//     for (var i = 0; i < times; i++){
//       var indexArray=inputs.map(function(input){
//       input.comments.length;
//       });
//       var index = indexArray.indexOf(Math.max(...indexArray));
//       newOrder.push(inputs.splice(index,1))
//     };
//     return newOrder;
//   };
// });

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $stateProvider
    .state('posts', {
      url: '/posts/:id',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

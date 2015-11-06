angular.module('flapperNews')
.controller('MainCtrl', [
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
        link: $scope.link,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes=function(post) {
      post.upvotes += 1;
    };
}]);

//setup angular
var app = angular.module('todomobi', ['ionic', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
  .setPrefix('todomobi');
  .setStorageType('localStorage');
});

app.controller('main', function($scope, $ionicModal, LocalStorageService){ 
//store the entities name in a variable 
  //var taskData = 'task';
    //initialize the tasks scope with empty array
  $scope.tasks = [];

  //initialize the task scope with empty object
  $scope.task = {};

  //configure the ionic modal before use
  $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.newTaskModal = modal;
  });

  $scope.getTasks = function () {
      //fetches task from local storage
      if(LocalStorageService.get(taskData)) {
        $scope.tasks = LocalStorageService.get(taskData);
      } else {
        $scope.tasks = [];
      } 
  }

  $scope.createTask = function () {
      //creates a new task
      $scope.task.push($scope.task);
      LocalStorageService.set(taskData, $scope.tasks);
      $scope.task = {};
      //close new task modal
      $scope.newTaskModal.hide();

  }

  $scope.removeTask = function () {
      //removes a task
      $scope.tasks.splice(index, 1);
      localStorageService.set(taskData, $scope.tasks);
  }

  $scope.completeTask = function (index) {
      //updates a task as completed
    if (index !== -1) {
      $scope.tasks[index].completed = true; 
    } 
    localStorageService.set(taskData, $scope.tasks);
  }

})

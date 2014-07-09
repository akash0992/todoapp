'use strict';

/* App Module */
var todoApp = angular.module('todoApp', [
    'ngRoute',
    'todoControllers'
]);

//todoApp.factory('tasks',function (){return [];})
todoApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $routeProvider.
            when('/todo', {
                templateUrl: '../html/todoList.html',
                controller: 'todoListController'
            }).
            when('/todo/:taskId', {
                templateUrl: '../html/taskDetail.html',
                controller: 'taskController'
            }).
            otherwise({
                redirectTo: '/todo'
            });
//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
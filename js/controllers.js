'use strict';

/* Controllers */
var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('todoListController', ['$scope', '$http',
    function ($scope, $http) {
        console.log(">>>Looking fo the data...")
        $scope.tasks = [];
        $scope.formater = "dd-mm-yyyy";
        $http({method: 'GET', url: 'http://localhost:3000/list/'}).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(">>>got the data..." + data)
                $scope.tasks = data;
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        $scope.delNote = function (task) {
            $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
                method: "GET",
                url: "http://localhost:3000/delete/" + task._id,
                data: {}
            }).success(function (data, status, headers, config) {
                $scope.tasks.splice(task._id, 1);
                console.log(data)
            }).error(function (data, status, headers, config) {
                console.log(data)
            });

//            $http.delete("http://localhost:3000/list/"+task._id).success(function (data, status, headers, config) {
//                //$scope.persons.push(data); // assign  $scope.persons here as promise is resolved here
//                //$scope.tasks.push(data);
//               // $scope.$apply();
//                //dialog.dialog( "close" );
//                console.log(data)
//            }).error(function (data, status, headers, config) {
//                //$scope.status = status;
//                console.log(data)
//            });
//            $scope.tasks.splice(task.task,1);

        }
        var dialog, form,
            title = $("#title"),
            newTask = $("#newTask"),
            state = $("#state"),
            allFields = $([]).add(newTask).add(state);
        $scope.addTask = function () {
            var valid = true;
            allFields.removeClass("ui-state-error");
            if (valid) {
                var data = {title: $("#title").val(), task: $("#newTask").val(), created: new Date().format($scope.formater), status: $("#state").val()}
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
                    method: "POST",
                    url: "http://localhost:3000/list",
                    data: { 'message': data }
                }).success(function (data, status, headers, config) {
                    //$scope.persons.push(data); // assign  $scope.persons here as promise is resolved here
                    $scope.tasks.push(data);
                    $scope.$apply();
                    dialog.dialog("close");
                    console.log(data)
                }).error(function (data, status, headers, config) {
                    //$scope.status = status;
                    console.log(data)
                });

//                $http({method: 'POST', url: 'http://localhost:3000/list/'}).
//                    success(function(data, status, headers, config) {
//                        // this callback will be called asynchronously
//                        // when the response is available
//                        console.log(">>>got the data..."+data)
//                        $scope.tasks = data;
//                    }).
//                    error(function(data, status, headers, config) {
//                        // called asynchronously if an error occurs
//                        // or server returns response with an error status.
//                    });

            }
            return valid;
        }
        dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create a task": $scope.addTask,
                Cancel: function () {
                    dialog.dialog("close");
                }
            },
            close: function () {
                form[ 0 ].reset();
                allFields.removeClass("ui-state-error");
            }
        });
        form = dialog.find("form").on("submit", function (event) {
            event.preventDefault();
            $scope.addTask();
        });
        $scope.addTasks = function () {
            dialog.dialog("open");
        }
//        $( "#create-task" ).button().on( "click", function() {
//            dialog.dialog( "open" );
//        });
    }]);

todoControllers.controller('taskController', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.jsonp('todo/' + $routeParams.taskId).success(function (data) {
            $scope.task = data;
        });
    }]);


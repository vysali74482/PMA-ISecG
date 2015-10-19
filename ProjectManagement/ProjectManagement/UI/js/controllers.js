app.controller("ProjectController", function ($scope, angularService) {
    $scope.divProject = false;
    GetAllProject();
    //To Get All Records  
    function GetAllProject() {
        $http.get('api/project').success(function (result, status, headers) {
           
            
            var getData = angular.copy(result); }).error(function () {
                alert("error");

            });
        getData.then(function (proj) {
            $scope.projects = proj.data;
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.editProject = function (project) {
        var getData = angularService.getProject(project.Id);
        getData.then(function (proj) {
            $scope.project = proj.data;
            $scope.projectId = project.projectId;
            $scope.projectName = project.projectName;
            $scope.projectCode = project.projectCode;
            $scope.Action = "Update";
            $scope.divProject = true;
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdateProject = function () {
        var Project = {
            Name: $scope.projectName,
            Code: $scope.projectCode,

        };
        var getAction = $scope.Action;

        if (getAction == "Update") {
            Project.Id = $scope.projectId;
            var getData = angularService.updateProj(Project);
            getData.then(function (msg) {
                GetAllProject();
                alert(msg.data);
                $scope.divProject = false;
            }, function () {
                alert('Error in updating record');
            });
        } else {
            var getData = angularService.AddProj(Project);
            getData.then(function (msg) {
                GetAllProject();
                alert(msg.data);
                $scope.divProject = false;
            }, function () {
                alert('Error in adding record');
            });
        }
    }

    $scope.AddProjectDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divProject = true;
    }

    $scope.deleteProject = function (project) {
        var getData = angularService.DeleteProj(project.projectId);
        getData.then(function (msg) {
            GetAllProject();
            alert('Project Deleted');
        }, function () {
            alert('Error in Deleting Record');
        });
    }

    function ClearFields() {
        $scope.projectId = "";
        $scope.projectName = "";
        $scope.projectCode = "";
    }
});

app.controller("UserController", function ($scope, angularService) {
    $scope.divUser = false;
    GetAllUser();
    //To Get All Records  
    function GetAllUser() {
        $http.get('api/user').success(function (result, status, headers) {


            var getData = angular.copy(result);
        }).error(function () {
            alert("error");

        });
        getData.then(function (us) {
            $scope.users = us.data;
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.editUser = function (user) {
        var getData = angularService.getUser(user.Id);
        getData.then(function (us) {
            $scope.user = us.data;
            $scope.userId = user.userId;
            $scope.userName = user.userName;
            $scope.userEmail = user.userEmail;
            $scope.Action = "Update";
            $scope.divUser = true;
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdateUser = function () {
        var User = {
            Name: $scope.userName,
            Email: $scope.userEmail,

        };
        var getAction = $scope.Action;

        if (getAction == "Update") {
            User.Id = $scope.userId;
            var getData = angularService.updateUser(User);
            getData.then(function (msg) {
                GetAllUser();
                alert(msg.data);
                $scope.divUser = false;
            }, function () {
                alert('Error in updating record');
            });
        } else {
            var getData = angularService.AddUser(User);
            getData.then(function (msg) {
                GetAllUser();
                alert(msg.data);
                $scope.divUser = false;
            }, function () {
                alert('Error in adding record');
            });
        }
    }

    $scope.AddUserDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divUser = true;
    }

    $scope.deleteUser = function (user) {
        var getData = angularService.DeleteUser(user.userId);
        getData.then(function (msg) {
            GetAllUser();
            alert('User Deleted');
        }, function () {
            alert('Error in Deleting Record');
        });
    }

    function ClearFields() {
        $scope.userId = "";
        $scope.userName = "";
        $scope.userEmail = "";
    }
});
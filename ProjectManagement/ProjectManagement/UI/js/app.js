(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run)
    .controller('LoginController', LoginController)
    .controller('RegisterController', RegisterController)
    .controller('HomeController', HomeController)
    .controller('ProjectController', ProjectController)
    .controller('ProjectIndexController', ProjectIndexController)
    .controller('ProjectAddController', ProjectAddController)
    .controller('ProjectEditController', ProjectEditController)
    .controller('ProjectDetailsController', ProjectDetailsController)
    .controller('UserIndexController', UserIndexController)
    .controller('UserAddController', UserAddController)
    .controller('UserEditController', UserEditController)
    .controller('UserDetailsController', UserDetailsController)
	.controller('LocationIndexController', LocationIndexController)
	.controller('LocationDetailsController', LocationDetailsController)
	.controller('LocationAddController', LocationAddController)
	.controller('ProjectsAtLocationController', ProjectsAtLocationController)
    .filter('propsFilter', propsFilter);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/projects', {
                templateUrl: 'UI/Templates/projects.html',
                controller: 'ProjectIndexController'
            }).
          when('/project-add', {
              templateUrl: 'UI/Templates/add-new-project.html',
              controller: 'ProjectAddController'
          }).
          when('/proj-edit/:id', {
              templateUrl: 'UI/Templates/edit-project.html',
              controller: 'ProjectEditController',
          }).
        when('/project-details/:id', {
            templateUrl: 'UI/Templates/details-project.html',
            controller: 'ProjectDetailsController',

        }).
          when('/users', {
              templateUrl: 'UI/Templates/users.html',
              controller: 'UserIndexController'
          }).
          when('/user-add', {
              templateUrl: 'UI/Templates/add-new-user.html',
              controller: 'UserAddController'
          }).
          when('/user-edit/:id', {
              templateUrl: 'UI/Templates/edit-users.html',
              controller: 'UserEditController'
          }).
        when('/user-details/:id', {
            templateUrl: 'UI/Templates/details-user.html',
            controller: 'UserDetailsController'
        }).
		when('/locations', {
		    templateUrl: 'UI/Templates/locations.html',
		    controller: 'LocationIndexController'
		}).
		when('/location-details/:id', {
		    templateUrl: 'UI/Templates/details-location.html',
		    controller: 'LocationDetailsController',
		}).
        when('/location-add', {
            templateUrl: 'UI/Templates/add-new-location.html',
            controller: 'LocationAddController'
        }).
        when('/addProjectsToLocation', {
            templateUrl: 'UI/Templates/add-new-project-to-location.html',
            controller: 'ProjectsAtLocationController'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'UI/Templates/login.view.html',
            controllerAs: 'vm'
        })
                        .when('/register', {
                            controller: 'RegisterController',
                            templateUrl: 'UI/Templates/register.view.html',
                            controllerAs: 'vm'
                        })
        .when('/home', {
            templateUrl: 'layout.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
          .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', '$rootScope', '$http'];
    function LoginController($location, AuthenticationService, FlashService, UserService, $rootScope, $http) {
        var vm = this;
        vm.login = login;
        vm.user = null;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            $http({
                method: 'POST',
                url: 'api/authenticate',
                data: vm
            }).success(function (result, status, headers) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                initUserController();
                $location.path('/home');

            }).error(function (result, status, headers) {
                vm.dataLoading = false;
                alert("Username or password is incorrect");
            });
        }

        function initUserController() {
            loadCurrentUser();
        }
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
    }

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', '$http', 'AuthenticationService'];
    function RegisterController(UserService, $location, $rootScope, FlashService, $http, AuthenticationService) {
        var vm = this;
        vm.user = null;
        vm.register = register;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function register() {
            vm.dataLoading = true;
            $http({
                method: 'POST',
                url: 'api/register',
                data: vm
            }).success(function (result, status, headers) {
                if(result=='0')
                    alert("Registration successful");
                else if (result == '1')
                    alert("UserName already exist");
                else
                    alert("There is some error in registration. Please try again after sometime.");
                AuthenticationService.SetCredentials(vm.username, vm.password);
                initUserController();
                $location.path('/login');

            }).error(function (result, status, headers) {
                vm.dataLoading = false;
                alert("There is some error in registration. Please try again after sometime.");
            });
        }

        function initUserController() {
            loadCurrentUser();
        }
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
    }

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
    }



    ProjectController.$inject = ['$scope', '$http', '$filter', '$location'];
    function ProjectController($scope, $http, $filter, $location) {

        $http({ method: 'GET', url: '/api/project' }).
		success(function (response, status, headers, config) {
		    $scope.projects = response;
		}).error(function (data, status, headers, config) {
		    alert('error');
		});
    };

    ProjectIndexController.$inject = ['$scope', '$http', '$filter', '$location'];
    function ProjectIndexController($scope, $http, $filter, $location) {
        $scope.OpenClose = function (req) {
            var x;
            if (req.IsActive) {
                var r = confirm("Are you sure you want to Close this project?");
            } else {
                var r = confirm("Are you sure you want to Re-Open this project?");
            }

            if (r == true) {

                req.isOpen = !req.IsActive;

                $scope.urlForDelete = 'api/selectedProject?id=' + req.ProjectId + '&isOpen=' + req.isOpen;

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    if (req.isActive) {
                        alert("Project successfully Closed. However, you can still reactivate it.");
                    } else {
                        alert("Project re-opened");
                    }
                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });

            }
            else {

            }

        }
        $scope.isBusy = true;
        $scope.reverse = false;
        $scope.groupedItems = [];
        $scope.itemsPerPage = 3;
        $scope.currentPage = 0;

        $scope.Edit = function (project) {

            $location.path('/proj-edit/:' + project.ProjectId);

        }
        $scope.Details = function (project) {
            $location.path('/project-details/:' + project.ProjectId);
        }
        $scope.Delete = function (project) {
            var x;
            var r = confirm("Are you sure you want to delete this Project?");
            if (r == true) {
                $scope.urlForDelete = 'api/SelectedProject?id=' + project.ProjectId;

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("Project successfully deleted. However, you can still reactivate it.");
                    project.isActive = false;
                    $location.path('/projects');
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });

            }
            else {

            }
        }
        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };
        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };


        $http.get('api/project').success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.isBusy = false;
            $scope.data = angular.copy(result);
            $scope.filteredItems = angular.copy(result);

            //paging
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }

        }).error(function () {
            $scope.isBusy = false;
            //alert("this is an error");
            $location.path('/home');

        });

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        // init the filtered items
        $scope.search = function () {

            $scope.filteredItems = $filter('filter')($scope.data, function (item) {

                if (searchMatch(item.ProjectName, $scope.query))
                    return true;

                return false;
            });
            /* take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }*/
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };
    }


    ProjectAddController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function ProjectAddController($scope, $http, $filter, $location, $routeParams) {

        $scope.projectLeads = {};
        $http.get('api/user/FetchProjectLeads/0').success(function (result, status, headers) {
            $scope.projectLeads = angular.copy(result);
        }).error(function (result, status, header) {
            alert("unable to fetch projectLeads");
        });
        $scope.isBusy = false;
        $scope.addProject = function () {
            $scope.isBusy = true;
            $http({
                method: 'POST',
                url: 'api/project',
                data: $scope.projectToAddData
            }).success(function (result, status, headers) {
                alert("Project successfully added");
                $scope.projectToAddData = {};

            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });
        }

    }

    ProjectEditController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function ProjectEditController($scope, $http, $filter, $location, $routeParams) {

        $scope.projectLeads = {};
        $http.get('api/user/FetchProjectLeads/0').success(function (result, status, headers) {
            $scope.projectLeads = angular.copy(result);
        }).error(function (result, status, header) {
            alert("unable to fetch projectLeads");
        });

        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/SelectedProject?id=' + $scope.detailsId;

        $scope.projectToEditData = {};


        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.projectToEditData = angular.copy(result);
            $scope.backupProjectToEdit = angular.copy(result);

        }).error(function () {


        });

        //all data
        $scope.resetEditProjectForm = function () {
            $scope.projectToEditData = angular.copy($scope.backupProjectToEdit);

        }

        $scope.back = function () {
            $location.url('/projects');
        };

        $scope.editProject = function () {
            $scope.isBusy = true;
            $http({
                method: 'POST',
                url: 'api/Selectedproject',
                data: $scope.projectToEditData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                alert("Project information successfully edited");
                $location.path('/projects');


            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });
        }
    }


    ProjectDetailsController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function ProjectDetailsController($scope, $http, $filter, $location, $routeParams) {


        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/SelectedProject?id=' + $scope.detailsId;
        $scope.projectDetailsData = {};


        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.projectDetailsData = angular.copy(result);

        }).error(function () {
        });
        $scope.back = function () {
            $location.url('/projects');
        };
    }


    UserIndexController.$inject = ['$scope', '$http', '$filter', '$location'];
    function UserIndexController($scope, $http, $filter, $location) {

        $scope.OpenClose = function (req) {
            //alert('hit');
            var x;
            var r = confirm("Are you sure you want to Close this project?");
            if (r == true) {

                req.isOpen = !req.IsActive;

                $scope.urlForDelete = 'api/selectedUser?id=' + req.UserId + '&isOpen=' + req.isOpen;


                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("User successfully Closed. However, you can still reactivate the user.");
                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });

            }
            else {

            }

        }


        $scope.isBusy = true;
        $scope.reverse = false;
        $scope.groupedItems = [];
        $scope.itemsPerPage = 3;
        $scope.currentPage = 0;

        $scope.Edit = function (user) {

            $location.path('/user-edit/:' + user.UserId);

        }
        $scope.Details = function (user) {
            $location.path('/user-details/:' + user.UserId);
        }
        $scope.Delete = function (user) {
            var x;
            var r = confirm("Are you sure you want to delete this User?");
            if (r == true) {
                $scope.urlForDelete = 'api/SelectedUser?id=' + user.UserId;

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("User successfully deleted. However, you can still reactivate the user.");
                    user.isActive = false;
                    $location.path('/users');
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });

            }
            else {

            }
        }
        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };
        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };


        $http.get('api/user').success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.isBusy = false;
            $scope.data = angular.copy(result);
            $scope.filteredItems = angular.copy(result);

            //paging
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }

        }).error(function () {
            $scope.isBusy = false;
            //alert("this is an error");
            $location.path('/home');

        });

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        // init the filtered items
        $scope.search = function () {

            $scope.filteredItems = $filter('filter')($scope.data, function (item) {

                if (searchMatch(item.UserName, $scope.query))
                    return true;

                return false;
            });
            /* take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }*/
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

    }

    UserAddController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function UserAddController($scope, $http, $filter, $location, $routeParams) {

        $scope.isBusy = false;
        $scope.addUser = function () {
            $scope.isBusy = true;
            $http({
                method: 'POST',
                url: 'api/user',
                data: $scope.userToAddData
            }).success(function (result, status, headers) {
                alert("User successfully added");
                $scope.userToAddData = {};

            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });
        }

    }

    UserEditController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function UserEditController($scope, $http, $filter, $location, $routeParams) {


        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/SelectedUser?id=' + $scope.detailsId;

        $scope.userToEditData = {};


        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.userToEditData = angular.copy(result);
            $scope.backupUserToEdit = angular.copy(result);

        }).error(function () {


        });

        //all data

        $scope.resetEditUserForm = function () {
            $scope.userToEditData = angular.copy($scope.backupUserToEdit);

        }

        $scope.editUser = function () {
            $scope.isBusy = true;
            $http({
                method: 'POST',
                url: 'api/Selecteduser',
                data: $scope.userToEditData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                alert("User information successfully edited");
                $location.path('/users');


            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });
        }
    }


    UserDetailsController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function UserDetailsController($scope, $http, $filter, $location, $routeParams) {


        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/SelectedUser?id=' + $scope.detailsId;
        $scope.userDetailsData = {};


        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.userDetailsData = angular.copy(result);

        }).error(function () {


        });


    }
    LocationController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function LocationController($scope, $http, $filter, $location) {

        $http({ method: 'GET', url: '/api/location' }).
         success(function (response, status, headers, config) {
             $scope.locations = response;
         }).
         error(function (data, status, headers, config) {
             alert('error');
         });
    }

    LocationIndexController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function LocationIndexController($scope, $http, $filter, $location) {

        alert("hit locationIndex Controller!");
        $scope.isBusy = true;
        $scope.reverse = false;
        $scope.groupedItems = [];
        $scope.itemsPerPage = 3;
        $scope.currentPage = 0;

        $scope.Edit = function (location) {
            $location.path('/loc-edit/:' + location.LocationId);

        }
        $scope.Details = function (location) {
            $location.path('/location-details/:' + location.LocationId);
        }
        $scope.Delete = function (location) {
            var x;
            var r = confirm("Are you sure you want to delete this Location?");
            if (r == true) {
                $scope.urlForDelete = 'api/SelectedLocation?id=' + location.LocationId;

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("Location successfully deleted. However, you can still reactivate it.");
                    location.isActive = false;
                    $location.path('/locations');
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });

            }
            else {

            }
        }
        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };
        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };


        $http.get('api/location').success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.isBusy = false;
            $scope.data = angular.copy(result);
            $scope.filteredItems = angular.copy(result);

            //paging
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }

        }).error(function () {
            $scope.isBusy = false;
            //alert("this is an error");
            $location.path('/home');

        });

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        // init the filtered items
        $scope.search = function () {

            $scope.filteredItems = $filter('filter')($scope.data, function (item) {

                if (searchMatch(item.LocationName, $scope.query))
                    return true;

                return false;
            });
            /* take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }*/
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

    }

    LocationDetailsController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function LocationDetailsController($scope, $http, $filter, $location, $routeParams) {
        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 

        $scope.getQueryForDetails = 'api/SelectedLocation?id=' + $scope.detailsId;
        $scope.locationDetailsData = {};

        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            $scope.locationDetailsData = angular.copy(result);

        }).error(function () {
        });

        $scope.getQueryForProjectDetails = 'api/location/FetchProjectsAtLocation/' + $scope.detailsId;
        $scope.ProjectLocationDetailsData = {};

        //Pagination Code 

        $scope.isBusy = true;
        $scope.reverse = false;
        $scope.groupedItems = [];
        $scope.itemsPerPage = 3;
        $scope.currentPage = 0;

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };
        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        $http.get($scope.getQueryForProjectDetails).success(function (result, status, headers) {

            $scope.isBusy = false;
            $scope.data = angular.copy(result);
            $scope.filteredItems = angular.copy(result);

            //paging
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
            // $scope.ProjectLocationDetailsData = angular.copy(result);
        }).error(function () {
        });
        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        // init the filtered items
        $scope.search = function () {

            $scope.filteredItems = $filter('filter')($scope.data, function (item) {

                if (searchMatch(item.ProjectName, $scope.query))
                    return true;

                return false;
            });
            /* take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }*/
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        $scope.OpenClose = function (req) {
            var x;
            if (req.IsActive == 1) {
                var r = confirm("Are you sure you want to Close this project at this location?");
            } else {
                var r = confirm("Re-enable project at this location?");
            }
            if (r == true) {

                req.isOpen = !req.IsActive;
                $scope.urlForDelete = 'api/projatloc/DisableProjectAtLocation?id=' + req.ProjectLocationId + '&isOpen=' + req.isOpen;

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;

                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    alert("error");
                });

            }
            else {
                alert("some error !");
            }

        }

    }
    LocationAddController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function LocationAddController($scope, $http, $filter, $location, $routeParams) {
        $scope.isBusy = false;
        $scope.addLocation = function () {
            $scope.isBusy = true;
            $http({
                method: 'POST',
                url: 'api/location',
                data: $scope.locationToAddData
            }).success(function (result, status, headers) {
                alert("Location successfully added");
                $scope.locationToAddData = {};
            }).error(function (result, status, headers) {
                $scope.isBusy = false;
                alert("error");
            });
        }
    }

    ProjectsAtLocationController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function ProjectsAtLocationController($scope, $http, $filter, $location) {

        $scope.location = {};
        $scope.multiselect = {};
        $http.get('api/location').success(function (result, status, headers) {
            $scope.Locations = angular.copy(result);
        }).error(function (result, status, header) {
            alert("unable to fetch locations");
        });

        $scope.fetchProjects = function (Location) {
            $http.get('api/projatloc/fetchinactiveprojectsatlocation/' + Location.LocationId).success(function (result, status, headers) {
                $scope.Projects = angular.copy(result);
            }).error(function (result, status, header) {
                alert("unable to fetch Inactive projects");
            });
        }
        $scope.AddProjects = function (Projects) {
            angular.forEach(Projects, function (value, key) {
                //alert(value.ProjectId);
                //post goes here !
            });
        }
    }


    function propsFilter() {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
    }

})();


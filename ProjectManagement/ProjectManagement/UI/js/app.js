(function () {
    'use strict';

    angular
        .module('app', [])
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
    .controller('FundIndexController', FundIndexController)
    .controller('FundAddController', FundAddController)
    .controller('FundEditController', FundEditController)
    .controller('FundDetailsController', FundDetailsController)
	.controller('BeneficiaryIndexController', BeneficiaryIndexController)
	.controller('BeneficiaryAddController', BeneficiaryAddController)
	.controller('BeneficiaryEditController', BeneficiaryEditController)
	.controller('BeneficiaryDetailsController', BeneficiaryDetailsController)
	.controller('ProjectsReportController', ProjectsReportController)
	.controller('ProjectsLocationFundsReportController', ProjectsLocationFundsReportController)
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
        }).
        when('/funds', {
            templateUrl: 'UI/Templates/funds.html',
            controller: 'FundIndexController'
        }).
          when('/fund-add', {
              templateUrl: 'UI/Templates/add-new-fund.html',
              controller: 'FundAddController'
          }).
          when('/fund-edit/:id', {
              templateUrl: 'UI/Templates/edit-funds.html',
              controller: 'FundEditController',
          }).
        when('/fund-details/:id', {
            templateUrl: 'UI/Templates/details-fund.html',
            controller: 'FundDetailsController',
        }).
          when('/beneficiaries', {
              templateUrl: 'UI/Templates/beneficiaries.html',
              controller: 'BeneficiaryIndexController'
          }).
          when('/beneficiary-add', {
              templateUrl: 'UI/Templates/add-new-beneficiary.html',
              controller: 'BeneficiaryAddController'
          }).
          when('/beneficiary-edit/:id', {
              templateUrl: 'UI/Templates/edit-beneficiary.html',
              controller: 'BeneficiaryEditController',
          }).
        when('/beneficiary-details/:id', {
            templateUrl: 'UI/Templates/details-beneficiary.html',
            controller: 'BeneficiaryDetailsController',
        }).
		when('/projects-report', {
		    templateUrl: 'UI/Templates/projects-reports.html',
		    controller: 'ProjectsReportController'
		}).
        when('/projects-location-funds-report', {
            templateUrl: 'UI/Templates/projects-locations-reports.html',
            controller: 'ProjectsLocationFundsReportController'
        }).
        when('/login', {
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

    LoginController.$inject = ['$location', '$rootScope', '$http'];
    function LoginController($location, $rootScope, $http) {
        var vm = this;
        vm.login = login;
        // vm.user = $rootScope.globals.currentUser.username;

        function login() {
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/authenticate',
                data: vm
            }).success(function (result, status, headers) {
                HideLoading();
                $location.path('/home');

            }).error(function (result, status, headers) {
                HideLoading();
                bootbox.alert("Username or password is incorrect");
            });
        }
    }

    RegisterController.$inject = ['$location', '$rootScope', '$http'];
    function RegisterController($location, $rootScope, $http) {
        var vm = this;
        //vm.user = $rootScope.globals.currentUser.username;
        vm.register = register;

        function register() {
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/register',
                data: vm
            }).success(function (result, status, headers) {
                HideLoading();
                if (result == '0') {
                    bootbox.alert("Registration successful. Please login now.");
                    $location.path('/login');
                }
                else if (result == '1')
                    bootbox.alert("UserName already exist");
                else
                    bootbox.alert("There is some error in registration. Please try again after sometime.");

            }).error(function (result, status, headers) {
                HideLoading();
                bootbox.alert("There is some error in registration. Please try again after sometime.");
            });
        }
    }

    HomeController.$inject = ['$rootScope'];
    function HomeController($rootScope) {
        var vm = this;
    }



    ProjectController.$inject = ['$scope', '$http', '$filter', '$location'];
    function ProjectController($scope, $http, $filter, $location) {
        ShowLoading();
        $http({ method: 'GET', url: '/api/project' }).
		success(function (response, status, headers, config) {
		    HideLoading();
		    $scope.projects = response;
		}).error(function (data, status, headers, config) {
		    HideLoading();
		    bootbox.alert('error');
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

                ShowLoading();

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    if (req.isActive) {
                        albootbox.alertert("Project successfully Closed. However, you can still reactivate it.");
                    } else {
                        bootbox.alert("Project re-opened");
                    }
                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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

                ShowLoading();

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("Project successfully deleted. However, you can still reactivate it.");
                    project.isActive = false;
                    $location.path('/projects');
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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
            bootbox.alert("unable to fetch projectLeads");
        });
        $scope.isBusy = false;
        $scope.addProject = function () {
            $scope.isBusy = true;
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/project',
                data: $scope.projectToAddData
            }).success(function (result, status, headers) {
                HideLoading();
                bootbox.alert("Project successfully added");
                $scope.projectToAddData = {};

            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
                });
        }

    }

    ProjectEditController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function ProjectEditController($scope, $http, $filter, $location, $routeParams) {

        $scope.projectLeads = {};
        $http.get('api/user/FetchProjectLeads/0').success(function (result, status, headers) {
            $scope.projectLeads = angular.copy(result);
        }).error(function (result, status, header) {
            bootbox.alert("unable to fetch projectLeads");
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
            bootbox.alert("error");

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
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/Selectedproject',
                data: $scope.projectToEditData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("Project information edited successfully.");
                $location.path('/projects');


            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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

                ShowLoading();
                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("User successfully Closed. However, you can still reactivate the user.");
                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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

                ShowLoading();
                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("User successfully deleted. However, you can still reactivate the user.");
                    user.isActive = false;
                    $location.path('/users');
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/user',
                data: $scope.userToAddData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("User successfully added");
                $scope.userToAddData = {};

            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/Selecteduser',
                data: $scope.userToEditData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("User information successfully edited");
                $location.path('/users');


            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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
             bootbox.alert('error');
         });
    }

    LocationIndexController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function LocationIndexController($scope, $http, $filter, $location) {

        //bootbox.alert("hit locationIndex Controller!");
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

                ShowLoading();

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("Location successfully deleted. However, you can still reactivate it.");
                    location.isActive = false;
                    $location.path('/locations');
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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

                ShowLoading();

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();

                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
                });

            }
            else {
                bootbox.alert("some error !");
            }

        }

    }
    LocationAddController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function LocationAddController($scope, $http, $filter, $location, $routeParams) {
        $scope.isBusy = false;
        $scope.addLocation = function () {
            $scope.isBusy = true;
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/location',
                data: $scope.locationToAddData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("Location successfully added");
                $scope.locationToAddData = {};
            }).error(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("error");
            });
        }
    }

    ProjectsAtLocationController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function ProjectsAtLocationController($scope, $http, $filter, $location) {

        $scope.Locations = {};
        $scope.multiselect = {};
        $http.get('api/location').success(function (result, status, headers) {
            $scope.Locations = angular.copy(result);
        }).error(function (result, status, header) {
            bootbox.alert("unable to fetch locations");
        });

        $scope.fetchProjects = function (LocationId) {
            $scope.Projects = {};
            $http.get('api/projatloc/fetchinactiveprojectsatlocation/' + LocationId).success(function (result, status, headers) {
                $scope.Projects = angular.copy(result);
            }).error(function (result, status, header) {
                bootbox.alert("unable to fetch Inactive projects");
            });
        }

        $scope.AddProject = function () {
            $scope.isBusy = true;
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/projatloc',
                data: $scope.ToAddData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("Project successfully added for Location");
                $scope.projectToAddData = {};

            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
                });
        }
    }
    FundIndexController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function FundIndexController($scope, $http, $filter, $location) {
        $scope.OpenClose = function (req) {

            var x;
            var r = confirm("Are you sure you want to Close this project?");
            if (r == true) {

                req.isOpen = !req.IsActive;

                $scope.urlForDelete = 'api/SelectedFund?id=' + req.FundId + '&isOpen=' + req.isOpen;
                ShowLoading();

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("Transaction successfully Deleted.");
                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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

        $scope.Edit = function (fund) {

            $location.path('/fund-edit/:' + fund.FundId);

        }
        $scope.Details = function (fund) {
            $location.path('/fund-details/:' + fund.FundId);
        }
        $scope.Delete = function (fund) {
            var x;
            var r = confirm("Are you sure you want to delete this transaction");
            if (r == true) {
                $scope.urlForDelete = 'api/SelectedFund?id=' + fund.FundId;
                ShowLoading();
                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("Transaction successfully deleted.");
                    fund.isActive = false;
                    $location.path('/funds');
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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

        $http.get('api/fund').success(function (result, status, headers) {
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

                if (searchMatch(item.FundDesc, $scope.query))
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

    FundAddController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function FundAddController($scope, $http, $filter, $location, $routeParams) {

        $scope.isBusy = false;
        $scope.addFund = function () {
            $scope.isBusy = true;
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/fund',
                data: $scope.fundToAddFund
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("Transaction successfully added");
                $scope.fundToAddFund = {};

            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
                });
        }

    }
    FundEditController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function FundEditController($scope, $http, $filter, $location, $routeParams) {


        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/SelectedFund?id=' + $scope.detailsId;

        $scope.fundToEditFund = {};


        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            $scope.fundToEditFund = angular.copy(result);
            $scope.backupFundToEdit = angular.copy(result);

        }).error(function () {


        });

        //all data

        $scope.resetEditFundForm = function () {
            $scope.fundToEditFund = angular.copy($scope.backupFundToEdit);

        }

        $scope.editFund = function () {
            $scope.isBusy = true;
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/SelectedFund',
                data: $scope.fundToEditFund
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("Fund information successfully edited");
                $location.path('/funds');


            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
                });
        }
    }

    FundDetailsController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function FundDetailsController($scope, $http, $filter, $location, $routeParams) {


        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/SelectedFund?id=' + $scope.detailsId;
        $scope.fundDetailsData = {};


        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            $scope.fundDetailsData = angular.copy(result);

        }).error(function () {

        });

    }

    BeneficiaryIndexController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function BeneficiaryIndexController($scope, $http, $filter, $location) {


        $scope.OpenClose = function (req) {
            //alert('hit');
            var x;
            var r = confirm("Are you sure you want to remove  this beneficiary?");
            if (r == true) {

                req.isOpen = !req.IsActive;

                $scope.urlForDelete = 'api/BeneficiaryAtProjectLocation?id=' + req.BeneficiaryId + '&isOpen=' + req.isOpen;
                ShowLoading();

                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("Beneficiary successfully removed. However, you can still reactivate the beneficiary.");
                    req.isActive = false;
                    window.location.reload();
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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

        $scope.Edit = function (beneficiary) {

            $location.path('/beneficiary-edit/:' + beneficiary.BeneficiaryId);

        }
        $scope.Details = function (beneficiary) {
            $location.path('/beneficiary-details/:' + beneficiary.BeneficiaryId);
        }
        $scope.Delete = function (beneficiary) {
            var x;
            var r = confirm("Are you sure you want to remove this Beneficiary?");
            if (r == true) {

                beneficiary.isOpen = !beneficiary.IsActive;

                $scope.urlForDelete = 'api/BeneficiaryAtProjectLocation?id=' + beneficiary.BeneficiaryId + '&isOpen=' + beneficiary.isOpen;
                ShowLoading();
                $http({
                    method: 'DELETE',
                    url: $scope.urlForDelete,

                }).success(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("Beneficiary successfully removed. However, you can still reactivate the beneficiary.");
                    user.isActive = false;
                    $location.path('/beneficiaries');
                    //$scope.reqToAddData = {};

                })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
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


        $http.get('api/beneficiary').success(function (result, status, headers) {
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

    BeneficiaryAddController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function BeneficiaryAddController($scope, $http, $filter, $location, $routeParams) {


        $http.get('api/location').success(function (result, status, headers) {
            $scope.Locations = angular.copy(result);
        }).error(function (result, status, header) {
            bootbox.alert("unable to fetch locations");
        });

        $scope.fetchProjects = function (LocationId) {
           // alert(LocationId);
            $http.get('api/projatloc/FetchActiveProjectsAtLocation/' + LocationId).success(function (result, status, headers) {
                $scope.Projects = angular.copy(result);
               // alert(Projects);
            }).error(function (result, status, header) {
                bootbox.alert("unable to fetch projects");
            });

        }
        $scope.isBusy = false;
        $scope.addBeneficiary = function () {
            $scope.isBusy = true;
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/beneficiary',
                data: $scope.beneficiaryToAddData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("Beneficiary successfully added");
                $scope.beneficiaryToAddData = {};

            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
                });
        }

    }
    BeneficiaryEditController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function BeneficiaryEditController($scope, $http, $filter, $location, $routeParams) {
        $scope.detailsId = $routeParams.id;
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/BeneficiaryAtProjectlocation?id=' + $scope.detailsId;
       // alert($scope.getQueryForDetails);

        $scope.beneficiaryToEditData = {};

        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.beneficiaryToEditData = angular.copy(result);
           // alert($scope.beneficiaryToEditData[0].BeneficiaryName);
            $scope.backupBeneficiaryToEdit = angular.copy(result);

        }).error(function () {


        });

        $scope.resetEditBeneficiaryForm = function () {
            $scope.beneficiaryToEditData = angular.copy($scope.backupBeneficiaryToEdit);

        }

        $scope.editBeneficiary = function () {
            $scope.isBusy = true;
            ShowLoading();
            $http({
                method: 'POST',
                url: 'api/BeneficiaryAtProjectLocation',
                data: $scope.beneficiaryToEditData
            }).success(function (result, status, headers) {
                $scope.isBusy = false;
                HideLoading();
                bootbox.alert("Beneficiary information successfully edited");
                $location.path('/beneficiaries');


            })
                .error(function (result, status, headers) {
                    $scope.isBusy = false;
                    HideLoading();
                    bootbox.alert("error");
                });
        }
    }

    BeneficiaryDetailsController.$inject = ['$scope', '$http', '$filter', '$location', '$routeParams'];
    function BeneficiaryDetailsController($scope, $http, $filter, $location, $routeParams) {


        $scope.detailsId = $routeParams.id;
        //documemt.write ($scope.detailsId);
        $scope.detailsId = $scope.detailsId.replace(':', ''); //FIX ERROR 
        $scope.getQueryForDetails = 'api/BeneficiaryAtProjectLocation?id=' + $scope.detailsId;
        //$scope.beneficiaryDetailsData = {};


        $http.get($scope.getQueryForDetails).success(function (result, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            //alert(JSON.stringify(result));
            $scope.beneficiaryDetailsData = angular.copy(result);
           // alert(JSON.stringify($scope.beneficiaryDetailsData));
        }).error(function () {

        });
    }

    ProjectsReportController.$inject = ['$scope', '$http', '$filter', '$location'];
    function ProjectsReportController($scope, $http, $filter, $location) {

        $http.get('api/projectreports').success(function (response, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.chartSeries = response;


            $(function () {
                $('#container').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Projects Funds'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },

                    series: [{
                        name: 'Projects',
                        colorByPoint: true,
                        data: $scope.chartSeries
                    }]
                });
            });



        }).error(function () {
            $scope.isBusy = false;
            //alert("this is an error");
            $location.path('/home');

        });

    }
    ProjectsLocationFundsReportController.$inject = ['$scope', '$http', '$filter', '$location'];
    function ProjectsLocationFundsReportController($scope, $http, $filter, $location) {

        $http.get('api/ProjectsFundsAtLocationReport').success(function (response, status, headers) {
            // this callback will be called asynchronously
            // when the response is available
            //alert("success");
            $scope.chartSeries = response;
            $scope.flag = true;

            $scope.getReport();

        }).error(function () {
            $scope.isBusy = false;
            //alert("this is an error");
            $location.path('/home');

        });

        $scope.getReport = function () {

            if ($scope.flag == true) {
                $scope.flag = false;
                $(function () {
                    $('#container').highcharts({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Funds Allocated for Projects At Locations'
                        },
                        xAxis: {
                            categories: $scope.chartSeries.categories
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Funds Allocated for Projects By Location'
                            }
                        },
                        legend: {
                            reversed: true
                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal'
                            }
                        },
                        series: $scope.chartSeries.series
                    });

                });

            }
            else if ($scope.flag == false) {
                $(function () {
                    $('#container').highcharts({
                        title: {
                            text: 'Funds Instances',
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'Funds Allocated for Projects By Location',
                            x: -20
                        },
                        xAxis: {
                            categories: $scope.chartSeries.categories
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature (°C)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '°C'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: $scope.chartSeries.series
                    });

                });
                $scope.flag = true;
            }
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

    function ShowLoading() {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
    }

    function HideLoading() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('fade').style.display = 'none';
    }

})();


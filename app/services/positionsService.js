angular.module('posicoesApp', [])
    .service('PositionsService', ['$http', function($http) {
        const API_URL = "http://localhost:3001/api/posicoes"; // localhost do proxy
        this.getPositions = function() {
            return $http.get(API_URL);
        };
    }])
    .filter('ignitionStatus', function() {
        return function(input) {
            return input ? 'Sim' : 'Não';
        };
    })
    .filter('brDateTime', function() {
        return function(input) {
            if (!input) return '';
            const date = new Date(input);
            return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        };
    })
    .controller('MainController', ['$scope', 'PositionsService', function($scope, PositionsService) {
        $scope.allPositions = [];
        $scope.filteredPositions = [];
        $scope.isLoading = false;
        $scope.isError = false;

        $scope.sortColumn = 'identificador';
        $scope.sortDirection = false;

        $scope.filters = { tipo: '', ignicao: '' };
        $scope.searchQuery = '';

        $scope.loadData = function() {
            $scope.isLoading = true;
            $scope.isError = false;
            PositionsService.getPositions()
                .then(function(response) {
                    $scope.allPositions = response.data;
                    $scope.uniqueTypes = [...new Set($scope.allPositions.map(p => p.tipo))];
                    $scope.applyFiltersAndSearch();
                })
                .catch(function(error) {
                    console.error('API Error:', error);
                    $scope.isError = true;
                    $scope.allPositions = [];
                    $scope.filteredPositions = [];
                })
                .finally(function() {
                    $scope.isLoading = false;
                });
        };

        $scope.applyFiltersAndSearch = function() {
            let filtered = $scope.allPositions;

            if ($scope.filters.tipo) {
                filtered = filtered.filter(pos => pos.tipo === $scope.filters.tipo);
            }

            if ($scope.filters.ignicao !== '') {
                const ignitionValue = $scope.filters.ignicao === 'true';
                filtered = filtered.filter(pos => pos.ignicao === ignitionValue);
            }

            if ($scope.searchQuery) {
                const query = $scope.searchQuery.toLowerCase();
                filtered = filtered.filter(pos => String(pos.identificador).toLowerCase().includes(query));
            }

            $scope.filteredPositions = filtered;
        };

        $scope.$watchGroup(['filters.tipo', 'filters.ignicao', 'searchQuery'], function() {
            $scope.applyFiltersAndSearch();
        });

        $scope.sortBy = function(column) {
            if ($scope.sortColumn === column) {
                $scope.sortDirection = !$scope.sortDirection;
            } else {
                $scope.sortColumn = column;
                $scope.sortDirection = false;
            }
        };

        $scope.getAverageSpeed = function() {
            if ($scope.filteredPositions.length === 0) return 0;
            const totalSpeed = $scope.filteredPositions.reduce((sum, pos) => sum + pos.velocidade, 0);
            return totalSpeed / $scope.filteredPositions.length;
        };

        $scope.loadData();
    }]);
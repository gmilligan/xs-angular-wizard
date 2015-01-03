(function (window, angular, undefined) {  'use strict';

  angular
    .module('xs.ui.wizard', [])
    .value('XS_WIZARD_TEMPLATE_DIR', './../src') // user configurable

    .controller('XSSampleCtrl',[function(){

      var vm = this;
      vm.show = function(key, state) {
        console.log(key); console.log(state);
      };
      vm.save = function() {
        console.log('Got Save');
      };
      vm.cancel = function() {
        console.log('Got Cancel');
      };
    }])

    .directive('xsWizard', ['XS_WIZARD_TEMPLATE_DIR', function(XS_WIZARD_TEMPLATE_DIR) {

      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: XS_WIZARD_TEMPLATE_DIR + '/xs-wizard-main.html',

        scope: {
          subTitle: '@',
          saveText: '@',
          onPageChange: '&',
          onCancel: '&',
          onSave: '&',
          hideNavButtons: '=',
          hasBreadcrumbs: '=',
          controlsOnTop: '=',
          hasCancel: '=',
          hasSave: '='
        },

        controller: function($scope) {
          $scope.pages = [];

          // underlying page turner
          var changePage = function(nextIndex) {
            // #TODO: Validation callback to check and allow page change
            $scope.state = {state: { previousPage: $scope.curPageIdx, currentPage: nextIndex }};
            $scope.pages[$scope.curPageIdx].activePage = false;
            setCurrentPage(nextIndex);
            if($scope.onPageChange) $scope.onPageChange($scope.state);
          };
          // pass save to outside controller
          $scope.save = function () {
            if($scope.onSave) $scope.onSave();
          };
          $scope.cancel = function () {
            if($scope.onCancel) $scope.onCancel();
          };
          var setCurrentPage = function(index) {
            $scope.curPageIdx = index;
            $scope.pages[$scope.curPageIdx].activePage = true;
          };
          // **************************************
          // controller interface
          //
          this.addPage = function(page) {
            $scope.pages.push(page);
            if($scope.pages.length===1) setCurrentPage(0);
          };
          // **************************************
          // $scope interface
          //
          $scope.goToPage = function(index) {
            changePage(index);
          };
          $scope.nextPage = function() {
            changePage($scope.curPageIdx + 1);
          };
          $scope.prevPage = function () {
            changePage($scope.curPageIdx - 1);
          };
          $scope.isLast = function() {
            return $scope.curPageIdx === ($scope.pages.length - 1);
          };
          $scope.isFirst = function() {
            return $scope.curPageIdx === 0;
          };
          $scope.hasNext = function() {
            return ! $scope.isLast();
          };
          $scope.hasPrev = function() {
            return ! $scope.isFirst();
          };
        } // end controller
      }; // end return
    }])

    .directive('xsWizardPage', ['XS_WIZARD_TEMPLATE_DIR', function(XS_WIZARD_TEMPLATE_DIR) {

      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: XS_WIZARD_TEMPLATE_DIR + '/xs-wizard-page.html',

        scope: {
          pageTitle: '@',
          pageTag: '@'
        },

        require: '^xsWizard',
        link: function(scope, element, attr, xsWizard) {
          xsWizard.addPage(scope);
        }
      }; // end return

    }])

    .directive('xsWizardControls', ['XS_WIZARD_TEMPLATE_DIR', function(XS_WIZARD_TEMPLATE_DIR) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: XS_WIZARD_TEMPLATE_DIR + '/xs-wizard-controls.html'
      }; // end return

    }]);

})(window, window.angular);

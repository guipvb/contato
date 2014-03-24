'use strict';

contatoApp.directive('escape', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('keydown', function(event) {
        console.log(event);
        if (event.keyCode === 27) {
          console.log('chegou aqui');
          console.log(attrs);
          scope.$apply(attrs.escape);
        }
      });
    }
  };
});

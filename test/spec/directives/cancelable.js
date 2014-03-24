'use strict';

describe('Directive: cancelable', function () {

  // load the directive's module
  beforeEach(module('contatoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cancelable></cancelable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cancelable directive');
  }));
});

/* jshint unused:false */
'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('contatoApp'));

  var MainCtrl, scope;
  var storage = {
    contacts: {},
    get: function () {
      return this.storage;
    },
    put: function (value) {
      this.storage = value;
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should not add a contact without a name', function () {
    scope.newContact = { name: '', phone: '+55 31 84476187', address: '' };
    scope.addContact();
    scope.$digest();
    expect(scope.contacts.length).toBe(0);
  });

  it('should edit a contact', function() {
    var contact = { name: 'Guilherme', phone: '', address: '' };
    scope.newContact = contact;
    scope.addContact();
    contact.name = 'Guilherme Barbosa';
    scope.editContact(contact);
    scope.doneEditing();
    scope.$digest();
    expect(scope.contacts[0].name).toBe('Guilherme Barbosa');
  });

  describe('having existing contacts', function() {
    var ctrl;
    beforeEach(inject(function($controller) {
      var contacts = [
        { name: 'Guilherme Barbosa', phone: '+55 31 8446187', address: 'Belo Horizonte/MG' },
        { name: 'Dad', phone: '+55 31 99210932', address: 'Belo Horizonte/MG' },
        { name: 'Angelina Jolie', phone: '', address: 'Los Angeles/CA' },
        { name: 'Brad Pitt', phone: '', address: 'Los Angeles/CA' }
      ];

      storage.contacts = contacts;
      ctrl = $controller('MainCtrl', {
        $scope: scope,
        storage: storage
      });
      scope.$digest();
    }));

    it('should have saved contacts', function() {
      expect(storage.contacts.length).toBe(4);
    });

    it('should remove a contact', function() {
      scope.contacts = storage.contacts;
      var contact = scope.contacts[0];
      scope.removeContact(contact);
      scope.$digest();
      expect(scope.contacts.length).toBe(3);
    });

  });
});

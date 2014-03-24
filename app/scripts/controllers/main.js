'use strict';

contatoApp.controller('MainCtrl', function ($scope, Storage) {
  var contacts = $scope.contacts = Storage.get();

  $scope.newContact = { name: '', address: '', phone: '' };

  $scope.addContact = function() {
    var contact = $scope.newContact;
    if (!contact.name.length) {
      return;
    }
    contacts.push(contact);
    Storage.put(contacts);
    $scope.newContact = { name: '', address: '', phone: '' };
  };

  $scope.editContact = function(contact) {
    $scope.editingContact = contact;
    $scope.oldValue = angular.copy(contact);
  };

  $scope.doneEditing = function() {
    var contact = $scope.editingContact;
    if (!contact.name.length) {
      return;
    }
    Storage.put(contacts);
    $scope.editingContact = null;
  };

  $scope.cancelEditing = function() {
    contacts[contacts.indexOf($scope.editingContact)] = $scope.oldValue;
    $scope.editingContact = null;
  };

  $scope.removeContact = function(contact) {
    $scope.contacts.splice(contacts.indexOf(contact), 1);
    Storage.put(contacts);
  };
});

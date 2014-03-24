'use strict';

contatoApp.factory('Storage', function Storage() {
  return {
    get: function () {
      return JSON.parse(localStorage.getItem('contato-app') || '[]');
    },

    put: function (contacts) {
      localStorage.setItem('contato-app', JSON.stringify(contacts));
    }
  };
});

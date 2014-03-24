var util = require('util');

describe('contact list', function() {
  beforeEach(function() {
    browser.get('http://localhost:9000');
    modal = element(by.css('.add-new.modal'));
  });

  it('should create a new user', function() {
    element(by.css('.new-contact')).click();

    expect(modal.isDisplayed()).toBeTruthy();
    
    element(by.model('newContact.name')).sendKeys('John Doe');
    element(by.model('newContact.phone')).sendKeys('+55 31 84476187');
    modal.submit();
    
    element.all(by.css('.item')).then(function(items) {
      expect(items.length).toBe(1);
    });
  });

  describe('having contacts', function() {
    beforeEach(function(){
      element(by.css('.new-contact')).click();
      element(by.model('newContact.name')).sendKeys('Jane Doe');
      element(by.model('newContact.phone')).sendKeys('+55 31 84476187');
      element(by.css('.add-new.modal')).submit();
    });

    it('should edit an user', function() {
      var modal = element(by.css('.edit.modal'));
      var item = element(by.css('.item'))
      var nameInput = element(by.model('editingContact.name'));
      var name = item.findElement(by.binding('{{ contact.name }}'));
      item.findElement(by.css('.edit-btn')).click();
      
      expect(modal.isDisplayed()).toBeTruthy();

      nameInput.clear();
      nameInput.sendKeys('John');
      modal.submit();

      expect(name.getText()).toBe('John');

    });

    it('should remove an user', function() {
      var item = element(by.css('.item'))
      item.findElement(by.css('.remove-btn')).click();

      element.all(by.css('.item')).then(function(items) {
        console.log(items);
        expect(items.length).toBe(2);
      });
    });
  });
});
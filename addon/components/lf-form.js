import Ember from 'ember';
import layout from '../templates/components/lf-form';
import formValidator from '../utils/form-validator';
import getOwner from 'ember-getowner-polyfill';

const {
  Component,
  computed,
  observer
} = Ember;

export default Component.extend({
  layout,
  tagName: 'form',
  formValidator: null,
  rules: null, //passed in
  data: null, //passed in
  formValid: computed('formValidator.isFormValid', function() {
    if (this.get('formValidator')) {
      return this.get('formValidator.isFormValid');
    }

    return false;
  }),

  init() {
    this._super(...arguments);
    this.set('formValidator', formValidator.create({
      container: getOwner(this),
      rules: this.get('rules'),
      data: this.get('data')
    }));
  },

  dataChanged: observer('data', function() {
    this.get('formValidator').set('data', this.get('data'));
  }),

  submit(e) {
    e.preventDefault();
    if (this.get('onSubmit')) {
      this.get('onSubmit')(this.get('formValid'));
    }
  },

  actions: {
    validateChange(name, value) {
      let validityData = this.get('formValidator').getValidateFunction(name, value);
      this.sendAction('validityChanged', this.get('formValid'));
      return validityData;
    }
  }
});

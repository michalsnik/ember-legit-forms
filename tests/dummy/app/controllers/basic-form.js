import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  model: {
    email: 'asd@home.co',
    name: null,
    interests: null,
    number: null
  },

  rules: {
    sharedValidations: {
      required: ['name', 'email', 'number']
    },
    email: 'email',
    number: 'numeric'
  },

  actions: {
    clear() {
      this.set('model', { email: null, name: null, interests: null, number: null});
    }
  }
});
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import { fillInBlurIntegration as fillInBlur } from '../../helpers/ember-legit-forms';

moduleForComponent('lf-input', 'Integration | Component | lf-input', {
  integration: true
});

function setupInput(context, isValid = true, updateAction = null) {
  const onUpdate = updateAction || function() {};
  context.set('onUpdate', onUpdate);
  context.set('validateAction', function() { return { isValid }; });
  context.set('name', 'Test');
  context.render(hbs`{{lf-input
    label="Name"
    property=name
    name="name"
    validate=(action validateAction)
    on-update=(action onUpdate)
  }}`);
}

test('it renders the input with all markup',function(assert) {
  setupInput(this);

  assert.equal(this.$('.control-label').text().trim(), 'Name', 'it has proper label');
  assert.equal(this.$('.form-group').length, 1, 'it has a form-group div');
});

test('it has no validation state when rendered', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');
  assert.equal($form.attr('class'), 'ember-view form-group', 'it has no validation state when rendered');
});

test('it shows error validation state', function(assert) {
  setupInput(this, false);

  let $form = this.$('.form-group');

  fillInBlur(this, '.form-group', null);
  assert.equal($form.attr('class'), 'ember-view form-group has-error');
});

test('it shows success validation state', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');

  fillInBlur(this, '.form-group', 'asd');
  assert.equal($form.attr('class'), 'ember-view form-group has-success');
});

test('it resets validation state when property set to null', function(assert) {
  setupInput(this);
  this.set('name', null);
  let $form = this.$('.form-group');

  assert.equal($form.attr('class'), 'ember-view form-group');
});

test('it validates only after first focusOut', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');
  let $formControl = this.$('.form-control');

  $formControl.val('foo');

  assert.equal(
    $form.attr('class'),
   'ember-view form-group',
   'it shouldn\'t validate without focusOut'
 );

 $formControl.trigger('blur');

  assert.equal(
    $form.attr('class'),
   'ember-view form-group has-success',
   'it should validate after focusOut'
 );
});

test('it triggers the on-update action', function(assert){
  assert.expect(1);
  setupInput(this, true, (val) => {
    assert.equal(val, 'value', 'it triggers the action with proper argument');
  });

  fillInBlur(this, '.form-group', 'value');
});

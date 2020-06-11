const ObservableObject = require("../src/can-observable-object");
const QUnit = require("steal-qunit");

QUnit.module('can-observable-object-class-fields');

QUnit.test("Class properties default value", function(assert) {
	const done = assert.async();
	class Person extends ObservableObject {
		/* jshint ignore:start */
		age = 35;
		/* jshint ignore:end */
	}

	const cherif = new Person();
	assert.equal(cherif.age, 35, 'Default value works');
	cherif.on('age', function(ev, newVal, oldVal) {
		assert.equal(oldVal, 35, 'Old value is correct');
		assert.equal(newVal, 38, 'Value is updated');
		assert.ok(ev, 'Age is observable');
		done();
	})
	cherif.age = 38;
});


QUnit.test('Class fields should not overwrite static props', function (assert) {
	const done = assert.async();
	assert.expect(5);

	class Person extends ObservableObject{
		/* jshint ignore:start */
		greetings = 'Hello';
		/* jshint ignore:end */
		static get props() {
			return {
				greetings: 'Bonjour'
			};
		}
	}

	const cherif = new Person();

	assert.equal(cherif.greetings, 'Hello', 'Default valus is correct');
	cherif.on('greetings', function (ev, newVal, oldVal) {
		assert.equal(oldVal, 'Hello', 'Old value is correct');
		assert.equal(newVal, 'Hola', 'Value is updated');
		assert.ok(ev, 'The class field is observable');
		done();
	});

	cherif.greetings = 'Hola';

	try {
		cherif.greetings = {foo: 'bar'};
	} catch (error) {
		assert.ok(error, 'Error thrown on the wrong type');
	}
});

QUnit.test('handle descriptor getter', function(assert) {
	const foo = new ObservableObject();

	let _bar = "Hello";
	Object.defineProperty(foo, "bar", {
		get() {
			return _bar;
		},
		set(val) {
			_bar = val;
		}
	});
	
	assert.equal(foo.bar, 'Hello');

	foo.on('greetings', function (ev, newVal, oldVal) {
		assert.equal(oldVal, 'Hello', 'Old value is correct');
		assert.equal(newVal, 'Hola', 'Value is updated');
		assert.ok(ev, 'The class field is observable');
		done();
	});

	foo.bar = 'Hola';
});
const ObservableObject = require("../src/can-observable-object");
const type = require('can-type');
const QUnit = require("steal-qunit");
const canReflect = require('can-reflect');

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

QUnit.test('Expando properties set should work', function(assert) {
	class Foo extends ObservableObject{}
	const foo = new Foo();
	foo.set("action", 10);
	assert.equal(foo.action, 10);
});

QUnit.test('Coerced properties', function(assert) {
	assert.expect(2);
	class MyType extends ObservableObject {
		static propertyDefaults = {
			type: type.maybeConvert(String)
		};
	}

	const vm = new MyType();
	

	vm.on("action", function(ev, newVal) {
		assert.strictEqual(newVal, "10");
		assert.ok(ev);
	});

	vm.set("action", 10);

});

QUnit.test('Coerced properties for class fields', function(assert) {
	assert.expect(3);

	class MyType extends ObservableObject {
		foo = 5;

		static propertyDefaults = {
			type: type.maybeConvert(String)
		};
	}

	const vm = new MyType();

	assert.strictEqual(vm.foo, "5");

	vm.on("foo", function(ev, newVal) {
		assert.strictEqual(newVal, "10");
		assert.ok(ev);
	});

	vm.set("foo", 10);

});

QUnit.test('setKeyValue should event should be dispatched once', function(assert) {
	assert.expect(1);

	const done = assert.async();

	class MyType extends ObservableObject {
	}

	const myType = new MyType();

	canReflect.onKeyValue(myType, 'foo', (newVal) => {
		assert.equal(newVal, 4);
		done();
	});

	canReflect.setKeyValue(myType, 'foo', 4);
});

QUnit.test('observable mixin instances should have the proxied instance', function(assert) {
	class MyType extends ObservableObject {
	}

	const myType = new MyType();

	assert.ok(MyType.instances.has(myType));
});

// if(process.env.NODE_ENV === 'production') {
// 	QUnit.test("Do not create expando properties for special keys set by can-observable-mixin", function(assert) {
// 		let obj = new ObservableObject();
// 		assert.ok(canReflect.getKeyValue(obj, '_data'));
// 		assert.ok(canReflect.getKeyValue(obj, '_computed'));
// 	});
// }
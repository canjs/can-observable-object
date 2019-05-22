const DefineObject = require("./can-define-object");
const QUnit = require("steal-qunit");

QUnit.module('can-define-object');

QUnit.test("Basics", function(assert){
	class Faves extends DefineObject {
		static get define() {
			return {
				color: "red"
			}
		}
	}

	let faves = new Faves();
	assert.equal(faves.color, "red", "yup");
});

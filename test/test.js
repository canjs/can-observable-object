require("./can-observable-object-test");
require("./import-steal-test");

let supportsClassFields;

try {
	eval(`class Foo {
		field = "value"
	}`);
	supportsClassFields = true;
} catch(e) {
	supportsClassFields = false;
}

if (supportsClassFields) {
	require('./class-fields-test');
}
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
	//It doesn't work with require
	//Even when change the above imports to require
	steal.import('~/test/class-fields-test');
}
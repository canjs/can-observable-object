const {
	makeDefineInstanceKey,
	mixins,
	mixinMapProps,
	mixinProxy,
	mixinTypeEvents
} = require("can-observable-mixin");

let ObservableObject = class extends mixinProxy(Object) {
	constructor(props) {
		super();
		mixins.finalizeClass(this.constructor);
		mixins.initialize(this, props);
	}
};

ObservableObject = mixinTypeEvents(mixinMapProps(ObservableObject));
makeDefineInstanceKey(ObservableObject);

// Export a constructor function to workaround an issue where ES2015 classes
// cannot be extended in code that's transpiled by Babel.
function ObservableObjectConstructor() {
	return Reflect.construct(ObservableObject, arguments, this.constructor);
}
ObservableObjectConstructor.prototype = Object.create(ObservableObject.prototype);
ObservableObjectConstructor.prototype.constructor = ObservableObjectConstructor;

module.exports = ObservableObjectConstructor;

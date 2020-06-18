const namespace = require("can-namespace");
const {
	createConstructorFunction,
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
		const obj = this;
		// Define class fields observables 
		//and return the proxy
		return new Proxy(this, {
			defineProperty(target, prop, descriptor) {
				const props = target.constructor.props;
				let value = descriptor.value;

				// do not create expando properties for special keys set by can-observable-mixin
				if (prop === '_instanceDefinitions') {
					return Reflect.defineProperty(target, prop, descriptor);
				}

				// do not create expando properties for properties that are described
				// by `static props` or `static propertyDefaults`
				if (props && props[prop] || target.constructor.propertyDefaults) {
					if (value) {
						target.set(prop, value);
						return true;
					}
					return Reflect.defineProperty(target, prop, descriptor);
				}

				// create expandos to make all other properties observable
				return mixins.expando(target, prop, value);
			}
		});
	}

};

ObservableObject = mixinTypeEvents(mixinMapProps(ObservableObject));
makeDefineInstanceKey(ObservableObject);

// Export a constructor function to workaround an issue where ES2015 classes
// cannot be extended in code that's transpiled by Babel.
module.exports = namespace.ObservableObject = createConstructorFunction(
	ObservableObject
);

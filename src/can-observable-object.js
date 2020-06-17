const namespace = require("can-namespace");
const {
	createConstructorFunction,
	makeDefineInstanceKey,
	mixins,
	mixinMapProps,
	mixinProxy,
	mixinTypeEvents
} = require("can-observable-mixin");

const inSetupSymbol = Symbol.for("can.initializing");


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

				if (target.constructor.propertyDefaults) {
					if (value && prop !== '_instanceDefinitions') {
						target.set(prop, value);
						return true;
					}
					return Reflect.defineProperty(target, prop, descriptor);
				}

				// Don't overwrite static props
				// that share the same name with a class field
				if (props && props[prop]) {
					obj[prop] = value;
					return true;
				}

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

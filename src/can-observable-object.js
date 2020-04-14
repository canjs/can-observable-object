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

				if (!value && typeof descriptor.get === 'function') {
					value = descriptor.get();
				}

				if (value) {
					if (props && props[prop]) {
						obj[prop] = value;
						return true;
					}
					// Make the property observable
					return mixins.expando(target, prop, value);
				}
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

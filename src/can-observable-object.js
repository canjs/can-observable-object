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

module.exports = ObservableObject;

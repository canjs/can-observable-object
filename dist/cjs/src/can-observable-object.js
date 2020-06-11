/*can-observable-object@1.0.1#src/can-observable-object*/
const namespace = require('can-namespace');
const {createConstructorFunction, makeDefineInstanceKey, mixins, mixinMapProps, mixinProxy, mixinTypeEvents} = require('can-observable-mixin');
let ObservableObject = class extends mixinProxy(Object) {
    constructor(props) {
        super();
        mixins.finalizeClass(this.constructor);
        mixins.initialize(this, props);
        const obj = this;
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
                    return mixins.expando(target, prop, value);
                }
            }
        });
    }
};
ObservableObject = mixinTypeEvents(mixinMapProps(ObservableObject));
makeDefineInstanceKey(ObservableObject);
module.exports = namespace.ObservableObject = createConstructorFunction(ObservableObject);
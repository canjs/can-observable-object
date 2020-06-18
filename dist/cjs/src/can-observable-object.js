/*can-observable-object@1.1.0#src/can-observable-object*/
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
                if (prop === '_instanceDefinitions') {
                    return Reflect.defineProperty(target, prop, descriptor);
                }
                if (props && props[prop] || target.constructor.propertyDefaults) {
                    if (value) {
                        target.set(prop, value);
                        return true;
                    }
                    return Reflect.defineProperty(target, prop, descriptor);
                }
                return mixins.expando(target, prop, value);
            }
        });
    }
};
ObservableObject = mixinTypeEvents(mixinMapProps(ObservableObject));
makeDefineInstanceKey(ObservableObject);
module.exports = namespace.ObservableObject = createConstructorFunction(ObservableObject);
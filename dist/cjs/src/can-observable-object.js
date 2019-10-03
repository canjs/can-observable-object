/*can-observable-object@1.0.0-pre.3#src/can-observable-object*/
define('can-observable-object', [
    'require',
    'exports',
    'module',
    'can-observable-mixin'
], function (require, exports, module) {
    const {createConstructorFunction, makeDefineInstanceKey, mixins, mixinMapProps, mixinProxy, mixinTypeEvents} = require('can-observable-mixin');
    let ObservableObject = class extends mixinProxy(Object) {
        constructor(props) {
            super();
            mixins.finalizeClass(this.constructor);
            mixins.initialize(this, props);
        }
    };
    ObservableObject = mixinTypeEvents(mixinMapProps(ObservableObject));
    makeDefineInstanceKey(ObservableObject);
    module.exports = createConstructorFunction(ObservableObject);
});
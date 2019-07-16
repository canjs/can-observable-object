/*can-define-object@0.1.5#src/can-define-object*/
define('can-define-object', [
    'require',
    'exports',
    'module',
    'can-define-mixin'
], function (require, exports, module) {
    const {makeDefineInstanceKey, mixins, mixinMapProps, mixinProxy, mixinTypeEvents} = require('can-define-mixin');
    let DefineObject = class extends mixinProxy(Object) {
        constructor(props) {
            super();
            mixins.finalizeClass(this.constructor);
            mixins.initialize(this, props);
        }
    };
    DefineObject = mixinTypeEvents(mixinMapProps(DefineObject));
    makeDefineInstanceKey(DefineObject);
    module.exports = DefineObject;
});
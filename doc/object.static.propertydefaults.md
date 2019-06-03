@property can-define-object/object.static.propertyDefaults propertyDefaults
@parent can-define-object/object.static

@description Specify default behaviors for properties.

@signature `static propertyDefaults = PROPDEFINITION`

Specify default values using a [can-define-object/object.types.propDefinition] object.

```js
import { DefineObject } from "can/ecosystem";

class RouteData extends DefineObject {
  static propertyDefaults = {
    type: String,
    enumerable: false
  };
}

let rd = new RouteData({ foo: 'bar' });

// `foo` will not be listed as an enumerated property
for(let prop in rd) {
  console.log(prop);
}
```

The above specifies a RouteData type whose properties default to a strictly typed `String` and are [can-define-object/define/enumerable non-enumerable].

@signature `static propertyDefaults = PROPERTY`

propertyDefaults can be specified using any of the methods specified by the [can-define-object/object.types.property property type].

```js
import { DefineObject } from "can/ecosystem";

class Person extends DefineObject {
  static propertyDefaults = String;
}
```

The above specifies all properties to default to being a strictly defined `String`. See [can-define-object/object.types.property] for other possible values.

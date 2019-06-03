@property can-define-object/define/required required
@parent can-define-object/object.behaviors
@description

Defines whether the property is required.

@signature `Boolean`

  Specifies if the property is required. By default all properties are *not* required. Setting a property required will result in instantiation throwing if the property is omitted.

  ```js
  import { DefineObject } from "can/everything";

  class MyMap extends DefineObject {
    static define = {
      propertyName: {
        type: String,
        required: true
      }
    };
  }

  const firstMap = new MyMap({ propertyName: "a value" }); // does not throw

  const secondMap = new MyMap({}); // throws
  ```
  @codepen

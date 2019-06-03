@property can-define-object/define/get-default get default()
@parent can-define-object/object.behaviors
@description

Returns the default value for instances of the defined type.  The default value is defined on demand, when the property is read for the first time.

@signature `get default()`

  A getter that returns the default value used for this property, like:

  ```js
  import { DefineObject } from "can/everything";

  class Example extends DefineObject {
    static define = {
      prop: {
        get default() {
          return [];
        }
      }
    };
  }

  const ex = new Example();
  console.log( ex.prop.serialize() ); //-> []
  ```
  @codepen

  If the default value should be an object of some type, it should be specified as the return value of a getter function (the above call signature) so that all instances of this map don't point to the same object.  For example, if the property `value` above had not returned an empty array but instead just specified an array using the next call signature below, all instances of that map would point to the same array (because JavaScript passes objects by reference).

  @return {*} The default value.  This will be passed through setter and type.

@body

## Use

The following defaults `age` to `0` and `address` to an object using the two default signatures:

```js
import { DefineObject } from "can/everything";

class Person extends DefineObject {
  static define = {
    age: {
      default: 0
    },
    address: {
      get default() {
        return { city: "Chicago", state: "IL" };
      }
    }
  };
}

const person = new Person();
console.log( person.age ); //-> 0
console.log( person.address.serialize() ); //-> { city: "Chicago", state: "IL" }
```
@codepen

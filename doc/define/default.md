@property can-define-object/define/default default
@parent can-define-object/object.behaviors
@description

Specifies the default value for instances of the defined type.

@signature `default`

  Any value can be provided as the default value used for this property, like:

  ```js
  import { DefineObject } from "can/everything"

  class Example extends DefineObject {
    static define = {
      prop: {
        default: "foo"
      }
    };
  }

  const ex = new Example();
  console.log( ex.prop ); //-> "foo"

  ```
  @codepen

  @param {*} defaultVal The default value, which will be passed through setter and type.

@body

## Use

The following defaults `age` to `0` and `address` to an object:

```js
import { DefineObject } from "can/everything";

class Person extends DefineObject {
  static define = {
    // A default age of `0`:
    age: {
      default: 0
    }
  };
}

const person = new Person();
console.log( person.age ); //-> 0
```
@codepen

## Alternates

There is a second way to provide a default value, which is explained in [can-define-object/define/get-default ] and is useful when defining an object as a default.

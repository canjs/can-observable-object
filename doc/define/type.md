@property can-define-object/define/type type
@parent can-define-object/object.behaviors

@description

Specify a type for the property.

@signature `PrimitiveFunction`

  Sets the type to a primitive constructor function. Valid primitive constructors includes `String`, `Number`, and `Boolean`.

  If the value provided for this property is of another type, or is `null` or `undefined`, it will throw.

  ```js
  import { DefineObject } from "can/everything";

  class Person extends DefineObject {
    static define = {
      age: {
        type: Number
      }
    };
  }

  const p = new Person({ age: 5 });

  console.log( p.age ) //-> 5

  const p2 = new Person({ age: "5" }); //throws
  ```
  @codepen

  @param {Function} PrimitiveFunction A primitive constructor function.

@signature `ConstructorFunction`

  Sets the type to a constructor function.

  If the value provided for this property is of another type, or is `null` or `undefined`, it will throw.

  ```js
  import { DefineObject } from "can/everything";

  class Person extends DefineObject {
    static define = {
      birthday: {
        type: Date
      }
    };
  }

  const p = new Person({ birthday: new Date(1970, 2, 3) });

  console.log( p.age ) //-> 5

  const p2 = new Person({ birthday: "2/3/1970" }); //throws
  ```
  @codepen

  @param {Function} ConstructorFunction Any constructor function.

@signature `TypeObject`

  Defines a type that conforms to the TypeObject API: an object with a `can.new` and `can.isMember` symbol.

  instances. For example here is an inline TypeObject:

  ```js
  import { DefineObject } from "can/everything";

  class Person extends DefineObject {
    static define = {
      birthday: {
        type: {
          [Symbol.for("can.new")](value) {
            return new Date(value);
          },
          [Symbol.for("can.isMember")](value) {
            return (value instanceof Date);
          }
        }
      }
    };
  }
  ```
  @codepen

@body

## Use

The `type` property specifies the type of the attribute.  The type can be specified
as either:

- A primitive constructor function.
- A built-in constructor function like `Date`.
- A constructor function such as another [can-define-object DefineObject].
- A TypeObject.

### Basic Example

The following example converts the `count` property to a number and the `items` property to an array.

```js
import { DefineObject, type } from "can";

const ArrayType = {
  [Symbol.for("can.new")]( newValue ) {
    if ( typeof newValue === "string" ) {
      return newValue.split( "," );
    } else if ( Array.isArray( newValue ) ) {
      return newValue;
    }
  },
  [Symbol.for("can.isMember")]( value ) {
    return Array.isArray(value);
  }
};

class Map extends DefineObject {
  static define = {
    count: {
      type: Number
    },
    items: {
      type: ArrayType
    }
  };
}

const map = new Map({ count: "4", items: "1,2,3" });

console.log(map.count, map.items); //-> 4 ["1", "2", "3"]
```
@codepen

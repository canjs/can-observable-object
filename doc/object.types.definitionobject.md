@typedef {Object|String|Constructor|Array|GETTER|SETTER} can-define-object/object.types.definitionObject DefinitionObject
@parent can-define-object/object.types

Defines the type, initial value, and get, set, and serialize behavior for an
observable property.  These behaviors can be specified with as an `Object`, `String`,
`Constructor` function, `Array`, a `getter expression`, or `setter expression`.

@type {Object} Defines multiple behaviors for a single property.


```js
{
  propertyName: {
    default: primitiveValue,
    get default() { /* ... */ },
    type: Constructor,
    get() { /* ... */ },
    value() { /* ... */ },
    async() { /* ... */ }
    set() { /* ... */ },
    serialize() { /* ... */ },
    required: Boolean,
    identity: Boolean
  }
}
```

@option {can-define-object/define/default} default Specifies the initial value of the property.

  ```js
  import { DefineObject } from "can/everything";

  class ViewModel extends DefineObject {
    static define = {
      count: {
        default: 0
      },
      template: function() {
        return `<div>Hello world</div>`
      }
    };
  }

  const vm = new ViewModel();
  console.log( person.count ); //->  0
  console.log( person.template() ); // -> "<div>Hello world</div>"
  ```
  @codepen

@option {can-define-object/define/get-default} default Specifies the initial value of the property by defining a function.

  ```js
  import { DefineObject } from "can/everything";

  class Person extends DefineObject {
    static define = {
      address: {
        get default() {
          return { city: "Chicago", state: "IL" };
        }
      }
    };
  }

  const person = new Person();
  console.log( person.address ); //->  { city: "Chicago", state: "IL" }
  ```
  @codepen

@option {can-define-object/define/type} type Specifies the type of the property. The type can be specified as either a constructor function or a [can-type.typeobject] like those created with [can-type].

  ```js
  import { DefineObject, DefineArray, type } from "can/everything";

  class Person extends DefineObject {
    static define = {
      age: Number,
      hobbies: type.convert(DefineArray)
    };
  }

  const person = new Person({ age: "20", hobbies: ["basketball", "billiards", "dancing"] });
  console.log( person.age, person.hobbies ); //-> 20, ["basketball", "billiards", "dancing"]
  ```
  @codepen

@option {can-define-object/define/get} get A function that specifies how the value is retrieved.  The get function is converted to an [can-observation].  It should derive its value from other values on the object. The following defines a `page` getter that reads from an object's offset and limit:

  ```js
  import { DefineObject } from "can/everything";

  class Book extends DefineObject {
    static define = {
      offset: Number,
      limit: Number,
      page: {
        get( newVal ) {
          return Math.floor( this.offset / this.limit ) + 1;
        }
      }
    };
  }

  const book = new Book( {offset: 10, limit: 5} );

  console.log( book.page ) //-> 3
  ```
  @codepen

  A `get` definition makes the property __computed__ which means it will not be enumerable by default.

@option {can-define-object/define/value} value A function that listens to events and resolves the value of the property.  This should be used when [can-define-object/define/value] is unable to model the right behavior. The following counts the number of times the `page` property changes:

  ```js
  import { DefineObject } from "can/everything";

  class Book extends DefineObject {
    static define = {
      page: Number,
      pageChangeCount: {
        value({ listenTo, resolve }) {
          let count = 0;

          // When page changes, update the count.
          listenTo( "page", () => {
            resolve( ++count );
          } );

          // Set initial count.
          resolve( count );
        }
      }
    };
  }

  const book = new Book();
  book.on("pageChangeCount", () => {});
  book.page = 1;
  book.page += 1;
  console.log( book.pageChangeCount ); //-> 2
  ```
  @codepen

  A `value` definition makes the property __computed__ which means it will not be enumerable by default.

@option {can-define-object/define/set} set A set function that specifies what should happen when a property is set. `set` is called with the result of `type`. The following defines a `page` setter that updates the map's offset:

  ```js
  import { DefineObject } from "can/everything";

  class Book extends DefineObject {
    static define = {
      offset: Number,
      limit: Number,
      page: {
        set( newVal ) {
          this.offset = ( parseInt( newVal ) - 1 ) * this.limit;
        }
      }
    };
  }

  const book = new Book({ limit: 5 });
  book.page = 10;
  console.log( book.offset ); //-> 45
  ```
  @codepen

@option {can-define-object/define/serialize} serialize Specifies the behavior of the property when serialize is called.

  By default, serialize does not include computed values. Properties with a `get` definition
  are computed and therefore are not added to the result.  Non-computed properties values are
  serialized if possible and added to the result.

  ```js
  import { DefineObject } from "can/everything";

  class Todo extends DefineObject {
    static define = {
      date: {
        type: Date,
        serialize( value ) {
          return value.getTime();
        }
      }
    }
  }

  const todo = new Todo( {date: Date.now()} );
  console.log( todo.serialize() ); //-> {date: 1535751516915}
  ```
  @codepen

@option {can-define-object/define/identity} identity Specifies the property that uniquely identifies instances of the type.

  ```js
  import { DefineObject , Reflect } from "can";

  class Grade extends DefineObject {
    static define = {
      classId: {
        type: Number,
        identity: true
      },
      studentId: {
        type: Number,
        identity: true
      },
      grade: String
    }
  }

  const myGrade = new Grade( {classId: 12345, studentId: 54321, grade: "A+"} )
  console.log(Reflect.getIdentity(myGrade)); //-> "{'classId':12345,'studentId':54321}"
  ```
  @codepen

@type {Constructor} Defines the property to be strictly checked to match the provided type.

  ```js
  {
    propertyName: TypeConstructor
  }
  ```

@type {can-type.typeobject} Define the property using a [can-type.typeobject] as provided by [can-type].

  ```js
  import { DefineObject, type } from "can/everything";

  class Person extends DefineObject {
    static define = {
      age: type.convert(Number)
    };
  }

  const me = new Person({ age: "12" });
  console.log(me.age); // -> 12
  ```

@body

## Use

A property definition can be defined in several ways.  The `Object` form is the most literal
and directly represents a `DefinitionObject` object.  The other forms
get converted to a `DefinitionObject` as follows:


```js
class extends DefineObject {
  propertyA: {},                   // -> DefinitionObject
  propertyB: String,               // -> {type: String}
  propertyC: type.check(Number)    // -> TypeObject
}
```

Within a definition object, the available properties and their signatures look like:

```js
DefineMap.extend({
  property: {
    get(lastSetValue, resolve){...},
    set(newValue, resolve){...},

    type: Constructor | TypeObject,

    default: value,
    get default() {...},

    enumerable: Boolean,
    serialize(){...},
    required: Boolean,
    identity: Boolean
  }
})
```
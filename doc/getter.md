@function can-define-object/getter get property()
@parent can-define-object/object.prototype

@description Specify a property's [can-define-object/define/get] behavior with the [get syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).

```js
import { DefineObject } from "can/everything";

class Example extends DefineObject {
  get propertyName() {
    return true;
  }
}

const e = new Example();
console.log( e.propertyName ); //-> true
```
@codepen

For example:

```js
import { DefineObject } from "can/everything";

class Person extends DefineObject {
  static define = {
    first: String,
    last: String
  };

  get fullName() {
    return this.first + " " + this.last;
  }
}

const person = new Person( {first: "Justin", last: "Meyer"} );
console.log( person.fullName ); //-> "Justin Meyer"
```
@codepen

This is a shorthand for providing an object with a `get` property like:

```js
import { DefineObject } from "can/everything";

class Person extends DefineObject {
  static define = {
    first: String,
    last: String,
    fullName: {
      get() {
        return this.first + " " + this.last;
      }
    }
  }
}

const person = new Person( {first: "Justin", last: "Meyer"} );
console.log( person.fullName ); //-> "Justin Meyer"
```
@codepen

You must use an object with a [can-define-object/define/get] property if you want your get to take the `lastSetValue` or `resolve` arguments.

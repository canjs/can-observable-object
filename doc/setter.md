@function can-define-object/setter set property()
@parent can-define-object/object.prototype

@description Specify a property's [can-define-object/define/set] behavior with the [set syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set).

```js
{
  set propertyName( newValue ) { /* ... */ }
}
```

For example:

```js
import { DefineObject } from "can/everything";

class Person extends DefineObject {
  set fullName(newValue) {
    const parts = newValue.split(" ");
    this.first = parts[0];
    this.last = parts[1];
  }
}

const person = new Person( {fullName: "Justin Meyer"} );
console.log( person.first ); //-> "Justin"
console.log( person.last ); //-> "Meyer"
```
@codepen

This is a shorthand for providing an object with a `set` property like:

```js
import { DefineObject } from "can/everything";

class Person extends DefineObject {
  static define = {
    fullName: {
      set(newValue) {
        const parts = newValue.split(" ");
        this.first = parts[0];
        this.last = parts[1];
      }
    }
  };
}

const person = new Person( {fullName: "Justin Meyer"} );
console.log( person.first ); //-> "Justin"
console.log( person.last ); //-> "Meyer"
```
@codepen

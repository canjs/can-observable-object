@property can-define-object/define/get get
@parent can-define-object/object.behaviors

@description

Specify what happens when a certain property is read on a map. `get` functions
are computed and automatically update themselves when a dependent
observable value is changed.


@signature `get( [lastSetValue] )`

Defines the behavior when a property value is read on a instance. Used to provide properties that derive their value from other properties on the object, or the property value that was set on the object.

Specify `get` like:

```js
define = {
  propertyName: {
    get() { /* ... */ }
  },
  propertyName: {
    get( lastSetValue ) { /* ... */ }
  }
}

get propertyName() {

}
```

  @param {*} [lastSetValue] The value last set by `instance.propertyName = value`.  Typically, _lastSetValue_
  should be an observable value, like a [can-simple-observable] or promise. If it's not, it's likely
  that a [can-define-object/define/set] should be used instead.

  @return {*} The value of the property.

@body

## Use

Getter methods are useful for:

 - Defining virtual properties on a map.
 - Defining property values that change with their _internal_ set value.

## Virtual properties


Virtual properties are properties that don't actually store any value, but derive their value
from some other properties on the map.

Whenever a getter is provided, it is wrapped in a [can-compute], which ensures
that whenever its dependent properties change, a change event will fire for this property also.

```js
import { DefineObject } from "can";

class Person extends DefineObject {
  static define = {
    first: String,
    last: String
  };

  get fullName() {
    return this.first + " " + this.last;
  }
}

const p = new Person( { first: "Justin", last: "Meyer" } );

console.log(p.fullName); //-> "Justin Meyer"

p.on( "fullName", function( ev, newVal ) {
	console.log(newVal); //-> "Lincoln Meyer";
} );

p.first = "Lincoln";
```
@codepen

## Properties values that change with their _internal_ set value

A getter can be used to derive a value from a set value. A getter's
`lastSetValue` argument is the last value set by `instance.propertyName = value`.

For example, a property might be set to a compute, but when read, provides the value
of the compute.

```js
import { DefineObject, SimpleObservable, Reflect } from "can";

class MyMap extends DefineObject {
  static define = {
    value: {
      get( lastSetValue ) {
        return lastSetValue.value;
      }
    }
  };
}

const map = new MyMap();
const observable = new SimpleObservable( 1 );
map.value = observable;

console.log(map.value); //-> 1
Reflect.setValue(observable, 2);
console.log(map.value); //-> 2
```
@codepen

This technique should only be used when the `lastSetValue` is some form of
observable, that when it changes, can update the `getter` value.

For simple conversions, [can-define-object/define/set] or [can-define-object/define/type] should be used.

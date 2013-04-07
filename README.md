# Typecheck

Typecheck is a very small Javascript library designed to easily validate HTML form inputs against a variety of different types. Those included in the first version of the script are:

* type checking (`url, email, date, required, number`)
* numeric checking (`min, max, equal, range`)
* character count checking (`min, max, equal`)

# Inclusion

Typecheck is dependent on both the jQuery library and HTML5 `data-*` attributes being available. The latest version of jQuery is available [here](http://jquery.com). Once you've included jQuery in your HTML, then include Typecheck.

Self-integration of the checking methods if you'd rather not rely on jQuery or HTML5 is relatively easy, as all the checking methods are found in the child objects of `Typecheck`; `type`, `numeric` and `character`.

# Usage

### Adding the classes and data attributes

First, there are the type checking classes which **simply check for input to be of the same data type**. Some of them are appended with a description on exactly what defines a a valid type.

* `.typecheck-required`
* `.typecheck-url` 
* `.typecheck-email`
* `.typecheck-number`

* `.typecheck-date`

This will only validate for dates in the format `xx/xx/xxxx`. This allows for both European `dd/mm/yyyy` and U.S. `mm/dd/yyyy` dates.

* `.typecheck-time`

This will only validate for time in the format `HH:MM`.

***

Secondly, there are numeric checking classes which check for input to be a number and also **follow specific rules** such as a minimum value, maximum value and equal to value requirement. **All classes here must be used in conjunction with the `.typecheck-numeric` class and the relevant `data-*` attribute, like so:**

`<input class="typecheck-numeric typecheck-max" data-typecheck-max="10"/>` This would effectively require a numeric value, that is equal to 10 or less.

* `.typecheck-max` and `data-typecheck-max`
* `.typecheck-min` and `data-typecheck-min`
* `.typecheck-eq` and `data-typecheck-eq`
* `.typecheck-range`, `data-typecheck-max` and `data-typecheck-min`

***

Finally, there are character count checking classes which check for input to be a particular number of characters in length, and follow specific rules like those numeric checking classes above. **All classes here must be used in conjunction with the `.typecheck-character` class and the relevant `data-*` attribute, like so:**

`<input class="typecheck-character typecheck-max" data-typecheck-max="10"/>` This would effectively require a string with a length, that is equal to 10 characters or less.

* `.typecheck-max` and `data-typecheck-max`
* `.typecheck-min` and `data-typecheck-min`
* `.typecheck-eq` and `data-typecheck-eq`

### Implementation into a HTML form

Typecheck comes with a built-in method which performs a check on all fields in a particular form which have had a `typecheck-*` class fixed on to them called `Typecheck.run()`.

`Typecheck.run()` takes a single parameter which is jQuery selector which is parent to the form fields that are to be checked, e.g. `Typecheck.run($('form'))`

While this can be bound to any form event, such as a the change of an individual field value, Typecheck wasn't written with this in mind (isn't optimized), and so it's recommended that called `Typecheck.run()` when a form submit event is fired, akin to something like this:

    $('form').submit(function(e){
        e.preventDefault(); // stop submission occuring
        if (Typecheck.run($(this))) {
            // form has been validated, continue.
        }
    });
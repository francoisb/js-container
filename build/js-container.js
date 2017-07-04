/* js-container - https://github.com/francoisb/js-container */
"use strict";
(function(name, dependencies, context, definition) {

    // CommonJS and AMD suport
    if (typeof context['module'] === 'object') {
        // CommonJS
        if (dependencies && context['require']) {
            for (var i = 0; i < dependencies.length; i++) {
                context[dependencies[i]] = context['require'](dependencies[i]);
            }
        }
        context['module']['exports'] = definition.apply(context);
    } else if (typeof context['define'] === 'function' && context['define']['amd']) {
        // AMD
        define(name, (dependencies || []), definition);
    } else {
        // Global Variables
        if (dependencies && context['require']) {
            for (var i = 0; i < dependencies.length; i++) {
                dependencies[i] = context[dependencies[i]];
            }
        }
        context[name] = definition.call(context, dependencies);
    }

})('js-container', [], (this || {}), function() {


    /**
     * Returns a closure that stores the result of the given closure for uniqueness in the scope of this instance of Container.
     *
     * @param   {Function}      callable        A closure to wrap for uniqueness.
     * @returns {Function}      The wrapped closure.
     */
    function createSharedCallable(callable) {
        var object;

        return function(container) {
            if ('undefined' === typeof object) {
                object = callable(container);
            }

            return object;
        }
    }


    /**
     * Container constructor.
     *
     */
    function Container() {
        this._values = {};
    }
    // Apply constructor.
    Container.prototype.constructor = Container;

    /**
     * Sets a parameter or an object.
     *
     * @public
     * @param   {String}        id              The unique identifier for the parameter or object.
     * @param   {Mixed}         value           The value of the parameter or a closure to defined an object.
     * @returns {Self}
     */
    Container.prototype.set = function(id, value) {
        this._values[id] = value;
        return this;
    }

    /**
     * Sets a parameter or an object.
     *
     * @public
     * @param   {String}        id              The unique identifier for the parameter or object.
     * @param   {Function}      callable        A closure to wrap for uniqueness.
     * @returns {Self}
     */
    Container.prototype.setShared = function(id, callable) {
        this._values[id] = createSharedCallable(callable);
        return this;
    }

    /**
     * Unsets a parameter or a object.
     *
     * @public
     * @param   {String}        id              The unique identifier for the parameter or object.
     * @returns {Self}
     */
    Container.prototype.unset = function(id) {
        if ('undefined' != typeof this._values[id]) {
            delete this._values[id];
        }

        return this
    }

    /**
     * Checks if a parameter or an object is set.
     *
     * @public
     * @param   {String}        id              The unique identifier for the parameter or object.
     * @returns {Boolean}       true if the parameter or object is defined, false otherwise
     */
    Container.prototype.has = function(id) {
        return 'undefined' == typeof this._values[id] ? false : true;
    }

    /**
     * Gets a service.
     *
     * @public
     * @throws  {Error}         If the parameter or service not exist.
     * @param   {String}        id              The unique identifier for the parameter or object.
     * @returns {Mixed}         The associated parameter or service.
     
     */
    Container.prototype.get = function(id) {
        if ('undefined' == typeof this._values[id]) {
            throw new Error('Invalid id "'+id+'".');
        }

        if ('function' == typeof this._values[id]) {
            return this._values[id](this);
        } else {
            return this._values[id];
        }
    }


    return Container;
});
JS-CONTAINER
============

This is a small Dependency Injection Container in javascript. With it you can manage any kind of *parameters* and *services*.

To start using it, just download the file in the *build* folder (js-container.js or js-container.min.js) and add it to your project as a regular external js file (in that case it will be in the global variable windows['js-container']), using CommonJS or AMD.


How to set a parameter
----------------------


    // define a parameter
    container.set('the_parameter_name', parameterValue);


How to set a service
--------------------

A service is an object that does something as part of a larger system.
Examples of services: logger, current user model, ...

Services are defined by anonymous functions that return an instance of an
object.

    // define a service 
    container.setShared('the_service_name', function(container) {
        function Service() {
            // ...
        }
        return new Service();
    });


How to check if a parameter or a service exists
-----------------------------------------------

    // check if a parameter or a service exists
    if (container.has('the_parameter_or_service_name')) {
        // ...
    }


How to unset a parameter or a service
-------------------------------------

    // unset a parameter or a service
    container.unset('the_parameter_or_service_name');



How to build
------------

First you need to init the node_modules (see https://gruntjs.com/getting-started if you are not familiar with Grunt).

    > ./init.sh


Then you can run the unit tests.

    > grunt test


Finally you can build the library.

    > grunt build

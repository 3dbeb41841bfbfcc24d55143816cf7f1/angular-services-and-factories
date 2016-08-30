# Services and Factories

AngularJS is a client-side JavaScript SPA MVC framework. As such it provides us with set of building blocks for creating various components that fit within the AngularJS ecosystem.

The AngularJS building blocks are:

* modules
* controllers
* directives
* services
* factories
* providers
* constants
* values
* decorators

We can combine these to build various _architectures_ for our AngularJS web applications.

You can read more about the above building blocks at [Angular Providers Gist](https://gist.github.com/demisx/9605099) or at the [Angular Documentation](https://docs.angularjs.org/api/ng/type/angular.Module)

## First an Overview of an AngularJS Application

![Angualr Architecture](https://raw.githubusercontent.com/ATL-WDI-Curriculum/angular-intro/master/images/angular-architecture-large.png)

## Services and Factories Code Along

This code can be found at [Codepen](http://codepen.io/drmikeh/pen/EaxgOe?editors=111)

## HTML

```html
<body ng-app="myApp">
  <section ng-controller="greeterCtrl as $ctrl">
    <h1>AngularJS - Services and Factories</h1>
    <h4 ng-repeat="message in $ctrl.messages">{{ message }}</h4>
  </section>
</body>
```

### Observations:

* We have an `ng-app` directive to bootstrap our AngularJS application.
* We have an `ng-controller` directive to bind our view to a controller called `greeterCtrl`.
* We are using the _controller as_ syntax for our controller binding.
* We have an `ng-repeat` to display all of our messages.

## CSS

```css
body {
  padding: 20px 40px;
  font-family: "Verdana";
}

h1 {
  text-align: center;
}

h4 {
  color: blue;
}
```

### Observations

* Just some simple CSS styling.

## JavaScript

```javascript
(function() {
  angular.module('greeterModule', []);
  angular.module('greeterModule')
  .service('greeterService', function() {
    var svc = this;
    var greeting = 'greeterService says Hi ';

    svc.sayHello = function(name) {
      return greeting + ' ' + name;
    };

    svc.setGreeting = function(newGreeting) {
      greeting = newGreeting;
    };
  })
  .factory('spanishGreeterFactory', function(greeterService) {
    console.log('spanishGreeterFactory is alive!');
    return {
      sayHello : function(name) {
        greeterService.setGreeting('Buenos días');
        return greeterService.sayHello(name);
      }
    };
  });

  var app = angular.module('myApp', ['greeterModule']);
  app.controller('greeterCtrl', function(greeterService, spanishGreeterFactory) {
    var vm = this;
    console.log('greeterCtrl is alive!');
    var message1 = greeterService.sayHello('Marc');
    greeterService.setGreeting('Hello');
    var message2 = greeterService.sayHello('Bruce');
    var message3 = spanishGreeterFactory.sayHello('Mike');
    vm.messages = [message1, message2, message3];
  });
})();
```

### Observations

* We wrapped our JavaScript inside of an _IIFE_.
* We have created 2 modules: `greeterModule` and `myApp`.
* Our `greeterModule` has a service named `greeterService` and a factory named `spanishGreeterFactory`.
* The `spanishGreeterFactory` calls the `greeterService` to generate a greeting.
* We have a `myApp` module with a `greeterCtrl` controller that generates 3 messages using the `greeterService` and the `spanishGreeterFactory`.
* `greeterCtrl` puts the 3 messages inside an array called `messages`.

# Services vs. Factories

In AngularJS, Services and Factories offer basically the same thing - a singleton that returns either an object (Service) or a function that returns an object (Factory). So when do I use a Service and when do I use a Factory?

Some developers prefer using _Factories_ because they are more _functional_ and they don't require a `var that = this;` kind of statement. Other developers prefer _Services_ because they are a little simpler.

I have often used _Services_ for managing communications to the server (AJAX) and for any other data management (such as caching). I then use _Factories_ for the client-side domain models (User, Car, Recipe, etc.).

The choice of when to use _Services_ and when to use _Factories_ is purely a developer preference.

Here is a simple comparison of the syntax between _Services_ and _Factories_:

```javascript
app.service('myService', function() {

  // a service is just a constructor function
  // that will be called with 'new'
  var svc = this;

  svc.sayHello = function(name) {
    return "Hi " + name + "!";
  };
});

app.factory('myFactory', function() {

  // factory returns an object
  // you can run some code before

  return {
    sayHello : function(name) {
      return "Hi " + name + "!";
    }
  };
});
```

In Summary:

* Services are treated as constructor functions (they are called with `new`). Thus they become an object.
* Factories are treated as functions that _return_ an object.


## For Further Reading:

* [Factory vs. Service](https://toddmotto.com/factory-versus-service)
* [Service vs Factory - Once and for All](http://blog.thoughtram.io//angular/2015/07/07/service-vs-factory-once-and-for-all.html)
* [Stack Overflow](http://stackoverflow.com/questions/13762228/confused-about-service-vs-factory)

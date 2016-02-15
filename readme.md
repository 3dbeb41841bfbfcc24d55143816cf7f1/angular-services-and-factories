# Services and Factories

This code can be found at [Codepen](http://codepen.io/drmikeh/pen/EaxgOe?editors=111)

## HTML

```html
<body ng-app="myApp">
  <section ng-controller="greeterCtrl as ctrl">
    <h1>AngularJS - Services and Factories</h1>
    <h4 ng-repeat="message in ctrl.messages">{{ message }}</h4>
  </section>
</body>
```

### Observations:

* We have an `ng-app` direcctive to bootstrap AngularJS.
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

Taken from:
* [Service vs Factory - Once and for All](http://blog.thoughtram.io//angular/2015/07/07/service-vs-factory-once-and-for-all.html)
* [Stack Overflow](http://stackoverflow.com/questions/13762228/confused-about-service-vs-factory)

In Summary:

* Services are treated as constructor functions (they are called with `new`). Thus they become an object.
* Factories are treated as functions that _return_ an object.

```javascript
app.service('myService', function() {

  // a service is just a constructor function
  // that will be called with 'new'

  this.sayHello = function(name) {
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
  }
});
```

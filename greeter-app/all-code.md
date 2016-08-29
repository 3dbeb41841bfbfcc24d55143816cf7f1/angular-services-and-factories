# Greeter App Code (for printing)

## index.html

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Services and Factories</title>
</head>

<body ng-app="myApp">
  <section ng-controller="greeterCtrl as $ctrl">
    <h1>AngularJS - Services and Factories</h1>
    <h4 ng-repeat="message in $ctrl.messages">{{ message }}</h4>
  </section>
</body>
<script type="text/javascript" src="bower_components/angular/angular.min.js" defer></script>
<script type="text/javascript" src="app.js" defer></script>
</html>
```

## app.css

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

## app.js

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

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

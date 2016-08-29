# Pets App Code (for printing)

## index.html

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Pets App</title>
  <meta name="author" content="Mike Hopper">
  <link rel="stylesheet" type="text/css" href="app.css">
</head>

<body ng-app="petsApp">
  <h1>Pets App</h1>
  <h2>Those crazy pets</h2>
  <pets-list></pets-list>
</body>
<script type="text/javascript" src="bower_components/angular/angular.min.js" defer></script>
<script type="text/javascript" src="app.js" defer></script>
</html>
```

## app.css

```css
* {
  text-align: center;
}

ul, li {
  text-align: left;
}

h1, h2, h3, h4, h5, h6 {
  color: blue;
}

.pets-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pets {
  padding: 10px;
  max-width: 50%;
  background-color: #ccc;
  border-radius: 10px;
}

li {
  margin: 10px;
}

button {
  margin: 10px;
  background-color: lightblue;
}
```

## app.js

```javascript
angular.module('petsApp', []);

angular.module('petsApp')
.component('petsList', {
  template: `
    <article class="pets-container">
      <div class="pets">
        <ul>
          <li class="pet" ng-repeat="pet in $ctrl.pets | orderBy : 'owner'">{{
            pet.owner + " has a " + pet.species + " named " + pet.name
          }}</li>
        </ul>
      </div>
    </article>
    <button ng-click="$ctrl.removeLastPet()">Remove Last Pet</button>
`,
  controller: function petsListCtrl(petService) {

    this.removeLastPet = petService.removeLastPet;

    petService.getPets().then( (response) => {
      this.pets = response.data;
    });
  }
});

angular.module('petsApp')
.service('petService', function($http) {

  this.pets = null;

  // here we both cache the pets and return a promise!
  this.getPets = function() {
    let promise = $http.get('pets.json');
    promise.then( (response) => {
      this.pets = response.data;
    });
    return promise;
  };

  this.removeLastPet = function() {
    this.pets.pop();
  };
});
```

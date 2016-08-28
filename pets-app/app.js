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

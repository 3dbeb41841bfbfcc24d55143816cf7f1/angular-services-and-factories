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
    this.pets = petService.pets;
    this.removeLastPet = petService.removeLastPet;
  }
});

angular.module('petsApp')
.service('petService', function() {
  this.pets = [
      { name: 'Meisha', species: 'dog', owner: 'Mike'   , vaccinated: true },
      { name: 'Deisel', species: 'dog', owner: 'Marc'   , vaccinated: false },
      { name: 'Snoopy', species: 'dog', owner: 'Charlie', vaccinated: true },
      { name: 'Felix' , species: 'cat', owner: 'Susan'  , vaccinated: true }
    ];
  this.removeLastPet = function() {
    this.pets.pop();
  };
});

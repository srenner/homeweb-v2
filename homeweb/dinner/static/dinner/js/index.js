var vm = new Vue({
  el: '#app',
  data: {
    modeEnum: {
      NORMAL: 'normal',
      PLANNING: 'planning'
    },
    mode: '',
    meals: [],
    ingredients: [],
    shoppingList: [],
    orphanIngredient: ''
  },
  computed: {
    selectedMeals: function() {
      console.log("filtering");
      var filtered = [];
      for(var i = 0; i < this.meals.length; i++) {
        if(this.meals[i].selected) {
          filtered.push(this.meals[i]);
        }
      }
      return filtered;
    }
  },
  methods: {
    setMode: function(mode) {
      vm.mode = mode;
    },
    togglePlanningMode: function() {
      if(vm.mode === vm.modeEnum.PLANNING) {
        vm.mode = vm.modeEnum.NORMAL;
        vm.shoppingList = [];
      }
      else {
        vm.mode = vm.modeEnum.PLANNING;
        for(var i = 0; i < vm.meals.length; i++) {
          vm.meals[i].selected = false;
          //todo this feels hacky:
          Vue.set(vm.meals, i, vm.meals[i]);
        }
      }
    },
    toggleMealSelected: function(meal, index) {
      if(!meal.selected) {
        meal.selected = true;
        Vue.set(vm.meals, index, meal);
      }
      else {
        meal.selected = false;
        vm.removeFromShoppingList(meal.ingredients);
      }
      Vue.set(vm.meals, index, meal);
    },
    toggleShoppingList: function(ingredient) {
      var alreadyExists = false;
      for(var i = 0; i < vm.shoppingList.length; i++) {
        var shoppingItem = vm.shoppingList[i];
        //todo maybe get meal_ingredient_id from server for the if-statement
        if(shoppingItem.id === ingredient.id
            && shoppingItem.meal_name === ingredient.meal_name) {
          ingredient.selected = false;
          vm.shoppingList.splice(i,1);
          alreadyExists = true;
        }
      }
      if(!alreadyExists) {
        vm.shoppingList.push(ingredient);
      }
    },
    sortShoppingList: function(event) {

      //todo room for improvement
      //some potential solutions may reveal vue.js oddities
      
      var original = vm.shoppingList[event.oldIndex];
      vm.shoppingList.splice(vm.newIndex, 0, original);
      if(event.newIndex < event.oldIndex) {
        //moved up
        vm.shoppingList.splice(vm.oldIndex + 1, 1);
      }
      else {
        //moved down
        vm.shoppingList.splice(vm.oldIndex, 1);
      }



    },
    removeFromShoppingList: function(ingredients) {
      for(var i = 0; i < ingredients.length; i++) {
        var ingredient = ingredients[i];
        for(var j = 0; j < vm.shoppingList.length; j++) {
          var shoppingItem = vm.shoppingList[j];
          //todo maybe get meal_ingredient_id from server for the if-statement
          if(shoppingItem.id === ingredient.id
              && shoppingItem.meal_name === ingredient.meal_name) {
            vm.shoppingList.splice(j,1);
          }
        }
      }
    },
    addOrphanIngredient: function(name) {
      vm.shoppingList.push({name: name});
    },
    getMeals: function() {
      dinner_http.getMeals(getMeals_success, getMeals_failed);
      function getMeals_success(response) {
        vm.meals = response.data;
        //todo can this be done server-side?
        vm.meals.forEach(function(meal) {
          meal.ingredients.forEach(function(ingredient) {
            ingredient.meal_name = meal.name;
          });
        });
      }
      function getMeals_failed(error) {
        console.log(error);
      }
    },
    getIngredients: function() {
      dinner_http.getIngredients(getIngredients_success, getIngredients_failed);
      function getIngredients_success(response) {
        vm.ingredients = response.data;
      }
      function getIngredients_failed(error) {
        console.log(error);
      }
    }
  }
});

vm.setMode(vm.modeEnum.PLANNING);
vm.getIngredients();
vm.getMeals();

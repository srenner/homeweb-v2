var vm = new Vue({
  el: '#app',
  data: {
    meals: [],
    ingredients: [],
    shoppingList: [],
    orphanIngredient: ''
  },
  computed: {
    selectedMeals: function() {
      //console.log("filtering");
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
    editMeal: function(meal) {
      console.log("starting to edit " + meal.name);
      $('#editMeal').modal();

    },
    toggleMealSelected: function(meal, index) {
      if(!meal.selected) {
        meal.selected = true;
        Vue.set(vm.meals, index, meal);
      }
      else {
        meal.selected = false;
        for(var i = 0; i < meal.ingredients.length; i++) {
          meal.ingredients[i].selected = false;
        }
        vm.removeFromShoppingList(meal.ingredients);
      }
      Vue.set(vm.meals, index, meal);
    },
    toggleShoppingList: function(ingredient) {
      var alreadyExists = false;
      for(var i = 0; i < vm.shoppingList.length; i++) {
        var shoppingItem = vm.shoppingList[i];
        //todo maybe get meal_ingredient_id from server for the if-statement
        if(shoppingItem.id === ingredient.id && shoppingItem.meal_name === ingredient.meal_name && shoppingItem.name === ingredient.name) {
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
      if(vm.orphanIngredient.length > 0) {
        vm.shoppingList.push({name: name, showNoteField: false, note: ''});
      }
      vm.orphanIngredient = '';
    },
    showNoteField(item) {
      item.showNoteField = true;
    },
    saveIngredientNote(item) {
      item.showNoteField = false;
    },
    addShoppingItemNote: function(item) {

    },
    getMeals: function() {
      dinner_http.getMeals(getMeals_success, getMeals_failed);
      function getMeals_success(response) {
        var meals = response.data;
        for(var i = 0; i < meals.length; i++) {
          var meal = meals[i];
          for(var j = 0; j < meal.ingredients.length; j++) {
            var ingredient = meal.ingredients[j];
            ingredient.meal_name = meal.name;
            ingredient.note = '';
            ingredient.showNoteField = false;
            //Vue.set(meal.ingredients, j, ingredient);
          }
        }
        vm.meals = meals;
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

vm.getMeals();
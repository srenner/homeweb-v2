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
    shoppingList: []
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
      }
      Vue.set(vm.meals, index, meal);
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

vm.setMode(vm.modeEnum.NORMAL);
vm.getIngredients();
vm.getMeals();

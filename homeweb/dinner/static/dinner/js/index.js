var app = new Vue({
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
      app.mode = mode;
    },
    togglePlanningMode: function() {
      if(app.mode === app.modeEnum.PLANNING) {
        app.mode = app.modeEnum.NORMAL;
      }
      else {
        app.mode = app.modeEnum.PLANNING;
        for(var i = 0; i < app.meals.length; i++) {
          app.meals[i].selected = false;
          //todo this feels hacky:
          Vue.set(app.meals, i, app.meals[i]);
        }
      }
    },
    toggleMealSelected: function(meal, index) {
      if(!meal.selected) {
        meal.selected = true;
        Vue.set(app.meals, index, meal);
      }
      else {
        meal.selected = false;
      }
      Vue.set(app.meals, index, meal);
    },
    getMeals: function() {
      dinner_http.getMeals(getMeals_success, getMeals_failed);
      function getMeals_success(response) {
        app.meals = response.data;
      }
      function getMeals_failed(error) {
        console.log(error);
      }
    },
    getIngredients: function() {
      dinner_http.getIngredients(getIngredients_success, getIngredients_failed);
      function getIngredients_success(response) {
        app.ingredients = response.data;
      }
      function getIngredients_failed(error) {
        console.log(error);
      }
    }
  }
});

app.setMode(app.modeEnum.NORMAL);
app.getIngredients();
app.getMeals();

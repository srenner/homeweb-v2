var dinner_http = {
    getMeals: function (onSuccess, onError) {
        Vue.http.get("/dinner/api/meals/").then(onSuccess, onError);
    },
    getMeal: function (id, onSuccess, onError) {
        Vue.http.get("/dinner/api/meals/" + id).then(onSuccess, onError);
    },
    getIngredients: function (onSuccess, onError) {
        Vue.http.get("/dinner/api/ingredients/").then(onSuccess, onError);
    },
    getIngredient: function (id, onSuccess, onError) {
        Vue.http.delete("/dinner/api/ingredients/" + id).then(onSuccess, onError);
    }
};

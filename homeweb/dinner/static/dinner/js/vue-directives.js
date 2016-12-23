Vue.directive('sortable', {
  inserted: function (el, binding) {
    var sortable = new Sortable(el, binding.value || {});
  }
});

Vue.directive('focus', {
        inserted: function (el) {
        el.focus();
    }
});
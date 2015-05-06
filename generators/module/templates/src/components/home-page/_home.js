define(["knockout", "text!./home.html", "postal"], function(ko, homeTemplate, postal) {

  function HomeViewModel(route) {
    this.message = ko.observable('Welcome to <%= longName.replace("'", "\\'") %>!');
  }

  HomeViewModel.prototype.doSomething = function() {
    this.message('You invoked doSomething() on the viewmodel.');
  };

  return { viewModel: HomeViewModel, template: homeTemplate };

});

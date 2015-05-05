var generators = require('yeoman-generator');
var fs = require('fs');
var chalk = require('chalk');
var path = require('path');

var componentGenerator = require('../component/index.js');

var BowerComponentGenerator =  componentGenerator.extend({
  constructor: function () {    
    generators.Base.apply(this, arguments);
    this.argument('componentname', { type: String, required: true });
    this.componentname = this._.dasherize(this.componentname);
  },
  
  prompting: function () {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Component category',
      default: 'location' // Default to current folder name
    }, function (answers) {
    	this.category = answers.name;
    	this.path = 'src/components/' + this.category + '/' + this.componentname + '/';
     done();
   }.bind(this));
  },
  
  copyBase: function () {
    var self = this;
    fs.readdir(this.templatePath('/base/'), function (err, files) {
      files.forEach(function (file) {
        console.log(self.templatePath('/base/' + file));
        self.fs.copyTpl(self.templatePath('/base/' + file), self.destinationPath(file), { componentname: self.componentname });      
      });
    });
  },
  
  installBowerDependencies: function () {
    this.bowerInstall(); 
  },
  
  createComponent: function () {
//    this.copyREADME();
//    this.createViewModel();
//    this.createView();
//    this.createTest();
  }
});

module.exports = BowerComponentGenerator;
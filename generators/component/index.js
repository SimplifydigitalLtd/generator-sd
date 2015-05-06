'use strict';
var generators = require('yeoman-generator');
var fs = require('fs');
var chalk = require('chalk');

var ComponentGenerator =  generators.Base.extend({

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
  
  init: function(){
  	this.filename = 'sd-' + this.componentname;
  },

  copyREADME: function () {  		
   this.fs.copyTpl(
     this.templatePath('README.md'),
     this.destinationPath(this.path + 'README.md'),
     { componentname: this.componentname }
     );
 },
 
 createViewModel: function () {
   this.fs.copyTpl(
     this.templatePath('viewModel.js'),
     this.destinationPath(this.path + this.filename +'.js'),
     { viewModelClassName: this._.classify(this.componentname + 'ViewModel'),
     filename: this.filename,
     name: this.componentname
   }
   );
 },

 createView: function () {
   this.fs.copyTpl(
     this.templatePath('view.html'),
     this.destinationPath(this.path + this.filename +'.html'),
     { name: this.componentname }
     );
 },

 createTest: function () {
   this.fs.copyTpl(
     this.templatePath('test.js'),
     this.destinationPath(this.path + this.filename +'-test.js'),
     { viewModelClassName: this._.classify(this.componentname + 'ViewModel'),
     modulePath: 'components/' + this.category + '/' + this.componentname + '/' + this.filename,
     filename: this.filename,
     name: this.componentname
   }
   );
 },

 addComponentRegistration: function() {
  registerComponent(this, 'src/app/startup.js', "");
  registerComponent(this, 'src/app/startup.bower.js', "bower_modules/moduleName/");
}

});

function readIfFileExists(path, callback) {
  if (fs.existsSync(path)) {
    callback.call(this, this.readFileAsString(path));
  }
}

function registerComponent(generator, startupFile, prefix) {  
  readIfFileExists.call(generator, startupFile, function(existingContents) {
    var existingRegistrationRegex = new RegExp('\\bko\\.components\\.register\\(\s*[\'"]' + generator.filename + '[\'"]');
      if (existingRegistrationRegex.exec(existingContents)) {
        this.log(generator.filename + ' is already registered in ' + startupFile);
        return;
      }

      var token = '// [Scaffolded component registrations will be inserted here. To retain this feature, don\'t remove this comment.]',
      regex = new RegExp('^(\\s*)(' + token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + ')', 'm'),
      modulePath = 'components/' + generator.category + '/' + generator.componentname + '/' + generator.filename,
      lineToAdd = 'ko.components.register(\'' + generator.filename + '\', { require: \'' + prefix + modulePath + '\' });',
      newContents = existingContents.replace(regex, '$1' + lineToAdd + '\n$&');
      fs.writeFile(startupFile, newContents);
      generator.log('   Registered ' + generator.filename + ' in '+ startupFile);

      if (fs.existsSync('gulpfile.js')) {
        generator.log(chalk.magenta('To include in build output, reference ') + chalk.white('\'' + modulePath + '\'') + chalk.magenta(' in ') + chalk.white('gulpfile.js'));
      }
    });
}

module.exports = ComponentGenerator;
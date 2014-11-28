'use strict';
var generators = require('yeoman-generator');
var fs = require('fs');

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

	    this.log('created README');
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

	    this.log('created viewModel');
  },

	createView: function () {
	    this.fs.copyTpl(
	      this.templatePath('view.html'),
	      this.destinationPath(this.path + this.filename +'.html'),
	      { name: this.componentname }
	    );

	    this.log('created view');
  },

  	createTest: function () {
	    this.fs.copyTpl(
	      this.templatePath('test.js'),
	      this.destinationPath(this.path + this.filename +'-test.js'),
	      { name: this.componentname }
	    );

	    this.log('created test');
  },

  addComponentRegistration: function() {
    var startupFile = 'src/app/startup.js';
    readIfFileExists.call(this, startupFile, function(existingContents) {
        var existingRegistrationRegex = new RegExp('\\bko\\.components\\.register\\(\s*[\'"]' + this.filename + '[\'"]');
        if (existingRegistrationRegex.exec(existingContents)) {
            this.log(this.filename + ' is already registered in ' + startupFile);
            return;
        }

        var token = '// [Scaffolded component registrations will be inserted here. To retain this feature, don\'t remove this comment.]',
            regex = new RegExp('^(\\s*)(' + token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + ')', 'm'),
            modulePath = 'components/' + this.category + '/' + this.componentname + '/' + this.filename,
            lineToAdd = 'ko.components.register(\'' + this.filename + '\', { require: \'' + modulePath + '\' });',
            newContents = existingContents.replace(regex, '$1' + lineToAdd + '\n$&');
        fs.writeFile(startupFile, newContents);
        this.log('   registered ' + this.filename + ' in '+ startupFile);
    });
  }

});

function readIfFileExists(path, callback) {
    if (fs.existsSync(path)) {
        callback.call(this, this.readFileAsString(path));
    }
}

module.exports = ComponentGenerator;
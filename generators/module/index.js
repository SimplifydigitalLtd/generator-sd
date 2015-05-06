'use strict';
var util = require('util'),
	path = require('path'),
	chalk = require('chalk'),
	koApp = require('generator-ko/app');

var AppGenerator =  koApp.extend({
	initFunc: function(){
		this.init();	
	},
	askFor: function () {
		var done = this.async();
    	this.log(this.yeoman);
    	this.log(chalk.magenta('You\'re using simplify module generator.'));
		
	    var prompts = [{
	      name: 'name',
	      message: 'What\'s the name of your new module?',
	      default: path.basename(process.cwd())
	    }];
	
	    this.prompt(prompts, function (props) {
	      this.longName = props.name;
	      this.slugName = this._.slugify(this.longName);
	      this.usesTypeScript = false;
	      this.includeTests = true;
	      done();
	    }.bind(this));
	},
	baseFiles: function () {
		this.templating();
	}
});

module.exports = AppGenerator;
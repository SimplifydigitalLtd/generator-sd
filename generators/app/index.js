'use strict';
var generators = require('yeoman-generator');
var fs = require('fs');
var AppGenerator =  generators.Base.extend({
    message: function(){
      console.log('based on generator-ko, please use it to generate your project');
    }
});
	

module.exports = AppGenerator;
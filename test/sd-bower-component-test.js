/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var fs = require('fs');

describe('sd:bower-component', function () {
	var temp = './temp';
	beforeEach(function (done) {
		helpers.run(path.join( __dirname, '../generators/bower-component'))
		.inDir(path.join( __dirname, temp))  // Clear the directory and set it as the CWD
		.withArguments(['component-name'])              // Mock the arguments
		.on('ready', function (generator) {
     	 	// this is called right before `generator.run()` is called
    	})
    	.on('end', done);
	});
	describe('when basic configuration runs', function () {
		it('should copy all base files', function (done) {
			fs.readdir(path.join( __dirname, '../generators/bower-component/templates/base'), function (err, files) {
				assert.file(files);
				done();      
      		});	
		});
	});
});
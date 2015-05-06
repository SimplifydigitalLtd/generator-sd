/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('sd:component', function () {
	beforeEach(function (done) {
		helpers.run(path.join( __dirname, '../generators/component'))
		.inDir(path.join( __dirname, './tmp'))  // Clear the directory and set it as the CWD
		.withArguments(['component-name'])              // Mock the arguments
		.on('ready', function (generator) {
     	 	// this is called right before `generator.run()` is called
    	})
    	.on('end', done);
	});
	describe('if no arguments are passed', function () {
		it('should generate a component in location', function () {
			assert.file(['src/components/location/component-name/sd-component-name-test.js']);	
		});
	});
});
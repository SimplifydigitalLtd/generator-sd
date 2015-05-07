/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('sd:module', function () {
	beforeEach(function (done) {
		helpers.run(path.join( __dirname, '../generators/module'))
		.inDir(path.join( __dirname, './mtmp'))  // Clear the directory and set it as the CWD
		.withPrompts({ name: 'sd-module-availabity' })
		.on('ready', function (generator) {
     	 	// this is called right before `generator.run()` is called
    	})
    	.on('end', done);
	});
	describe('with args', function () {
		it('should generate a folder with the module name tmp', function () {
			assert.file(['sd-module-availabity/gulpfile.js']);	
		});
	});
});
/*jshint node:true*/
/*
 * grunt-component
 * https://github.com/smhg/grunt-component
 *
 * Copyright (c) 2013 smhg
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util'),
  path = require('path') || require('fs');

module.exports = function(grunt) {
  grunt.registerMultiTask('component', 'Wrapper around component(1).', function() {
    var helpers = require('grunt-lib-contrib').init(grunt),
      options = this.options({
        cwd: '.',
        action: 'build',
        args: {}
      }),
      cmdPath = path.resolve(__dirname, '../node_modules/.bin'),
      cmd = path.join(cmdPath, process.platform === 'win32' ? 'component.cmd' : 'component'),
      processOptions = {
        env: process.env,
        cwd: path.resolve(options.cwd)
      },
      done,
      child;

    done = this.async();

    // options to array
    options.args = helpers.optsToArgs(options.args);

    // action is first parameter
    if (options && Object.prototype.toString.call(options.action) == '[object Array]') {
      options.args = options.action.concat(options.args);
    } else {
      options.args.unshift(options.action);
    }

    grunt.log.writeln('    # ' + processOptions.cwd + ' >');
    grunt.log.writeln('    ' + cmd + ' ' + options.args.join(' '));

    child = grunt.util.spawn({
      cmd: cmd,
      args: options.args,
      opts: processOptions
    }, function (error, result, code) {
      if (error || result.stderr) {
        grunt.fatal(error || result.stderr);
      }
      done();
    });
    child.stdout.pipe(process.stdout);
  });
};

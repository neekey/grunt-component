/*jshint node:true*/
'use strict';

var grunt = require('grunt'),
  normalize = grunt.util.normalizelf;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.component = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  'default': function(test) {
    test.expect(2);

    var actual,
      expected;

    actual = normalize(grunt.file.read('tmp/default.js'));
    expected = normalize(grunt.file.read('test/expected/default.js'));

    test.equal(actual, expected, 'no options');

    actual = normalize(grunt.file.read('tmp/default-dev.js'));
    expected = normalize(grunt.file.read('test/expected/default-dev.js'));

    test.equal(actual, expected, 'with --dev');

    test.done();
  },
  dependency: function(test) {
    test.expect(1);

    var actual,
      expected;

    actual = normalize(grunt.file.read('tmp/dependency.js'));
    expected = normalize(grunt.file.read('test/expected/dependency.js'));

    test.equal(actual, expected, 'no options');

     test.done();
  },
  convert: function(test) {
    test.expect(1);

    var actual,
      expected;

    actual = normalize(grunt.file.read('test/fixtures/convert/template.js'));
    expected = normalize(grunt.file.read('test/expected/template.js'));

    test.equal(actual, expected, 'no options');

    test.done();
  }
};

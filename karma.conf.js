// Karma configuration
// Generated on Fri Feb 17 2017 15:57:25 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','commonjs'],

    // list of files  patterns to load in the browser
    files: [  //include:false为不包含这些文件到浏览器中
	
	//Legacy
	{pattern:'src/Legacy/libs/SuperMap_Basic-8.1.1-14426.js',include:false},
	{pattern:'src/Legacy/libs/SuperMap_IServer-8.1.1-14426.js',include:false},
	{pattern:'src/Legacy/libs/Lang/*.js',include:false},
	{pattern:'src/Legacy/theme/default/*.js',include:false},
	{pattern:'src/Legacy/theme/default/*.css',include:false},
	
	//Core
	'src/Core/base.js',
	{pattern:'src/Core/**/*.js',include:false},

	//test
    {pattern:'test/**/*Spec.js',include:false},
	'test/js/test-main.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'src/Legacy/libs/SuperMap_Basic-8.1.1-14426.js':['commonjs'],
		'src/Legacy/libs/SuperMap_IServer-8.1.1-14426.js':['commonjs'],
	    'src/Legacy/libs/Lang/*.js':['commonjs'],
	    'src/Legacy/theme/default/*.js':['commonjs'],
		'src/Core/base.js':['commonjs'],
		'src/Core/**/*.js':['commonjs'],
		'src/Core/iServer/*.js':['commonjs',"coverage"],
        'test/**/*Spec.js': ['commonjs',]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage','teamcity'],
	
	coverageReporter: {
		dir: 'testcoverage/',
        reporters: [
			{ type: 'lcov',subdir: '.'}
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
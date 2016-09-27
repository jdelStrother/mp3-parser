const Jasmine = require('jasmine');
const runner = new Jasmine();

runner.loadConfig({
    spec_dir: "test/spec",
    spec_files: ["**/*.spec.js"],
    helpers: ["../../node_modules/jasmine-expect/index.js"],
    stopSpecOnExpectationFailure: false,
    random: false
});

// const Reporter = require('jasmine/lib/reporters/console_reporter'); // Dots, by default if ommitted
runner.env.clearReporters(); // Clear the default console-reporter ..

// .. and add this nicer reporter instead (https://github.com/bcaudan/jasmine-spec-reporter)
const Reporter = require('jasmine-spec-reporter');
const reporter = new Reporter();
runner.addReporter(reporter);

runner.execute();

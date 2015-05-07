// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "postal":               "bower_modules/postal/lib/postal",
        "lodash":               "bower_modules/lodash/lodash",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "text":                 "bower_modules/requirejs-text/text",
        "json":                 "bower_modules/requirejs-plugins/src/json"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};

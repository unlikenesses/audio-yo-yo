var app = app || {};

app.boot = function() {

    app.audioCx = new (window.AudioContext || window.webkitAudioContext)();

    app._vent = _.extend({}, Backbone.Events);

    // "canvas":
    new app.TracksView();

    // Controls:
    new app.ControlsView();

}

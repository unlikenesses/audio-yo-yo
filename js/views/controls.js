var app = app || {};

app.ControlsView = Backbone.View.extend({

	el: $('.controls'),

	events: {
		'click #addTrack': 'addTrack',
	},

	addTrack: function(e) {

		e.preventDefault();
		app._vent.trigger('controls:addTrack', this);

	}

});
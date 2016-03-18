var app = app || {};

app.TracksView = Backbone.View.extend({

	el: $('.canvas'),

	initialize: function() {
		this.collection = new app.Tracks();
		app._vent.on('controls:addTrack', this.addTrack, this);
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderTrack(item);
		}, this);
	},

	renderTrack: function(item){
		var trackView = new app.TrackView({
			model: item
		});
		this.$el.append(trackView.render().el);
	},

	addTrack: function() {
		var length = this.collection.length;
		var num = length + 1;
		var newTrack = new app.Track({name: 'Track ' + num, speed: 10});
		this.collection.add(newTrack);
		this.renderTrack(newTrack);
	}

});
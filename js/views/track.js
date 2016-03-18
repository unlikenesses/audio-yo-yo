var app = app || {};

app.TrackView = Backbone.View.extend({

	tagName: 'div',
	className: 'trackContainer',
	template: _.template($('#trackTemplate').html()),

	initialize: function() {

		this.listenTo(this.model, 'change', this.updateBall);

	},

	updateBall: function(e) {

		$(this.$el).find('.ball').css('top', this.model.get('ballPos') + 'px');

	},

	events: {
		'click a' : 'toggleStart',
		'change .startNote' : 'changeStartNote',
		'change .endNote' : 'changeEndNote'
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	toggleStart: function(e) {

		e.preventDefault();
		var btnState = $(this.$el).find('a.toggleStart');
		if (btnState.html() == 'Start') {
			btnState.html('Stop');
		} else {
			btnState.html('Start');
		}
		this.model.toggleStart();	
	},

	changeStartNote: function(e) {

		var frequency = e.target.value;
		this.model.set('startNote', frequency);

	},

	changeEndNote: function(e) {

		var frequency = e.target.value;
		this.model.set('endNote', frequency);

	}

});
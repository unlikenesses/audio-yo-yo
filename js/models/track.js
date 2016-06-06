var app = app || {};

app.Track = Backbone.Model.extend({

	initialize: function(obj) {

		this.gain = app.audioCx.createGain();
		this.gain.connect(app.audioCx.destination);
		this.gain.gain.value = 1;

	},

	defaults: {
		name: '',
		detune: 0,
		playing: false,
		type: 'sine',
		ballPos: 1,
		ballSize: 19,
		height: 180,
		direction: 1,
		startNote: 220,
		endNote: 220,
		muted: false
	},

	create: function(freq) {

		this.node = app.audioCx.createOscillator();
		this.node.frequency.value = freq;
		this.node.detune.value = 0;
		this.node.type = this.get('type');
		this.node.connect(this.gain);

	},

	updatePos: function() {

		var direction = this.get('direction');
		var newPos = this.get('ballPos') + 1 * this.get('direction');
		if (newPos <= 0) {
			this.set('direction', direction * -1);
			this.sound('startNote');
		}
		if (newPos >= this.get('height') - this.get('ballSize')) {
			this.set('direction', direction * -1);
			this.sound('endNote');
		}

		this.set('ballPos', newPos);

	},

	sound: function(pos) {

		if (! this.get('muted')) {
			this.create(this.get(pos));
			var currentTime = app.audioCx.currentTime;
			this.node.start(currentTime);
			this.node.stop(currentTime + 0.5);
		}

	},

	start: function() {

		var that = this;

		this.timer = setInterval(function(){

			that.updatePos();

		}, 1);

	},

	stop: function() {

		clearInterval(this.timer);

	},

	toggleStart: function() {

		var playing = this.get('playing');
		if (playing) {
			this.stop();
		} else {
			this.start();
		}
		this.set('playing', ! playing);

	},

	toggleMute: function() {

		var muted = this.get('muted');
		this.set('muted', ! muted);

	}

});

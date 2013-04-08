/* typecheck.js
================
Typecheck is a very simple library designed for plugging straight into your forms in order
to validate the content of their fields. A large range of validation methods have already been
provided, which can be used as standalone methods for simply returning boolean values or can be
used in conjunction with Typecheck.run() as per the documentation.

@author Yousef Soliman | grapenode
@date 07/04/2013
@version 1.0
*/

var Typecheck = {
	status: true,
	type:  {
		url: function(a) {
			// Maps to http:// prefixed urls
			var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
			if (!a.match(reg)) {
				return false;
			}	
		},
		email: function(a) {
			// Maps to almost RFC 2822 formatted email addresses
			var reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			if (!a.match(reg)) {
				return false;
			}
		},
		date: function(a) {
			// Maps to xx/xx/xxxx date formats (allowance for both US/European formatting)
			var reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
			if (!a.match(reg)) {
				return false;
			}
		},
		time: function(a) {
			// Maps to HH:MM timing
			var reg = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
			if (!a.match(reg)) {
				return false;
			}
		},
		number: function(a) {
			// isNaN() returns true if not a number, which is the opposite output boolean of what
			// we're looking for
			if (isNaN(parseFloat(a))) {
				return false;
			}
		},
		required: function(a) {
			// Maps to a string full of whitespace
			var reg = /^\s+$/;
			// If a matches whitespace or is an empty string, return false
			if (a.match(reg) || a === '') {
				return false;
			}
		}
	},
	numeric: {
		max: function(a, b) {
			a = parseInt(a, 10),
			b = parseInt(b, 10);

			if (a > b) {
				return false;
			}
		},
		min: function(a, b) {
			a = parseInt(a, 10),
			b = parseInt(b, 10);

			if (a < b) {
				return false;
			}
		},
		eq: function(a, b) {
			a = parseInt(a, 10),
			b = parseInt(b, 10);

			if (a !== b) {
				return false;
			}
		}
	},
	character: {
		max: function(a, b) {
			if (a.length > parseInt(b, 10)) {
				return false;
			}
		},
		min: function(a, b) {
			if (a.length < parseInt(b, 10)) {
				return false;
			}
		},
		eq: function(a, b) {
			if (a.length !== parseInt(b, 10)) {
				return false;
			}
		}
	},
	run: function($el) {
		var self = this;
			self.status = true;

		$el.find('.typecheck-required').each(function(){
			var a = $(this).val();
			if (self.type.required(a) === false) {
				self.status = false;
			}
		});

		$el.find('.typecheck-url').each(function() {
			var a = $(this).val();
			if (self.type.url(a) === false || self.type.required(a) === false) {
				self.status = false;
			}
		});

		$el.find('.typecheck-email').each(function() {
			var a = $(this).val();
			if (self.type.email(a) === false || self.type.required(a) === false) {
				self.status = false;
			}
		});

		$el.find('.typecheck-date').each(function() {
			var a = $(this).val();
			if (self.type.date(a) === false || self.type.required(a) === false) {
				self.status = false;
			}
		});

		$el.find('.typecheck-time').each(function() {
			var a = $(this).val();
			if (self.type.time(a) === false || self.type.required(a) === false) {
				self.status = false;
			}
		});

		$el.find('.typecheck-numeric, .typecheck-character').each(function() {
			var a = $(this).val(),
				o = {
					max: $(this).attr('data-typecheck-max'),
					min: $(this).attr('data-typecheck-min'),
					eq:  $(this).attr('data-typecheck-eq')
				};

			if ($(this).hasClass('typecheck-max') && $(this).hasClass('typecheck-numeric')) {
				if (self.numeric.max(a, o.max) === false || self.type.required(a) === false) {
					self.status = false;
				}
			} else if ($(this).hasClass('typecheck-min') && $(this).hasClass('typecheck-numeric')) {
				if (self.numeric.min(a, o.min) === false || self.type.required(a) === false) {
					self.status = false;
				}
			} else if ($(this).hasClass('typecheck-eq') && $(this).hasClass('typecheck-numeric')) {
				if (self.numeric.eq(a, o.eq) === false || self.type.required(a) === false) {
					self.status = false;
				}
			} else if ($(this).hasClass('typecheck-max') && $(this).hasClass('typecheck-character')) {
				if (self.character.max(a, o.max) === false || self.type.required(a) === false) {
					self.status = false;
				}
			} else if ($(this).hasClass('typecheck-min') && $(this).hasClass('typecheck-character')) {
				if (self.character.min(a, o.min) === false || self.type.required(a) === false) {
					self.status = false;
				}
			} else if ($(this).hasClass('typecheck-eq') && $(this).hasClass('typecheck-character')) {
				if (self.character.eq(a, o.eq) === false || self.type.required(a) === false) {
					self.status = false;
				}
			} else if ($(this).hasClass('typecheck-range') && $(this).hasClass('typecheck-numeric')) {
				if (self.numeric.max(a, o.max) === false || self.numeric.min(a, o.min) === false || self.type.required(a) === false) {
					self.status = false;
				}
			}
		});
		
		return self.status;
	}
};
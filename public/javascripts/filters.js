var app = angular.module('filters', []);

app.filter('fLetter', function() {
		return function(word, letters){
			return word.substring(0,letters)
		}
	});

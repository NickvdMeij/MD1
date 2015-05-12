var module = angular.module('starter.services', ['ngResource']);

module.factory('Venue', function($resource) {
	return $resource('https://api.eet.nu/venues/:id', {
		id: '@_id'
	},{
		query: {isArray: false}
	})
})

module.factory('LocalStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
})

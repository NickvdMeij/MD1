angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('VenuesCtrl', function($scope, Venue, LocalStorage, $stateParams, $cordovaGeolocation) {
	
	$scope.venues = LocalStorage.getObject('venues')['results'];
	$scope.singleVenue = {};

	$scope.loadAll = function(){
		if(!LocalStorage.getObject('venues')['results']){
			Venue.query(function(venues){
				LocalStorage.setObject('venues', venues);
				$scope.venues = venues['results'];
			});	
		}
	}

	$scope.loadOne = function(){
		Venue.get({
			id: $stateParams.venueId
		},function(venue){
			$scope.singleVenue = venue;
		});	
	}

	$scope.loadFromLocation = function(){
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {
		  		var latitude  = position.coords.latitude;
		  		var longitude = position.coords.longitude;

		  		Venue.get({
					max_distance: 5000,
					geolocation: latitude+','+longitude
				}, function(venues){
					$scope.geoVenues = venues['results'];
				});
			}, function(err) {
				$scope.geoVenues = [{
					name: "Failed to retrieve venues based on geolocation"
				}];
			});
	}
})

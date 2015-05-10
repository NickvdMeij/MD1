angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('VenuesCtrl', function($scope, Venue, LocalStorage, $stateParams, $cordovaGeolocation, $cordovaInAppBrowser, $ionicPlatform) {
	
	$scope.venues = LocalStorage.getObject('venues')['results'];
	$scope.singleVenue = {};

	$scope.loadAll = function(){
		$scope.loading = true;
		Venue.query(function(venues){
			LocalStorage.setObject('venues', venues);
			$scope.venues = venues['results'];
			$scope.loading = false;
		});	
	};

	$scope.loadOne = function(){
		Venue.get({
			id: $stateParams.venueId
		},function(venue){
			$scope.singleVenue = venue;
		});	
	};

	$scope.loadFromLocation = function(){
		$scope.loading=true;
		$scope.error=false;
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$ionicPlatform.ready(function() {
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
						$scope.loading = false;
					});
				}, function(err) {
					$scope.error = true;
				});
		});
	};

	$scope.openWebpage = function(url){
		$ionicPlatform.ready(function() {
			window.open(url, '_system');
		});
	}
})

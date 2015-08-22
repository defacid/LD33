(function(){
	var app = angular.module("gameWorld", []);
	
	app.controller("RoomController", ["$scope", function($scope){
		$scope.room = {
			event: 1,
			type: 7,
			poop: 0,
			examined: 0,
			directions: [
				{canMove: 1, roomType: 1},
				{canMove: 1, roomType: 6},
				{canMove: 0, roomData: null},
				{canMove: 0, roomData: null},
			],
			action: function(){
				$scope.room.event = 0;
			},
		}
		
		//Direction definitions (0: North, 1: East, 2: West, 3: South)
		$scope.compass = [
			'north',
			'east',
			'south',
			'west'
		];
		
		//Set of room templates
		$scope.roomSet = [
			{
				type: 0,
				name: 'NULL',
				description: 'TEST',
			}, {
				type: 1,
				name: 'a dark forest',
				description: 'TEST',
			}, {
				type: 2,
				name: 'a large castle',
				description: 'TEST',
			}, {
				type: 3,
				name: 'an empty room',
				description: 'TEST',
			}, {
				type: 4,
				name: 'another empty room',
				description: 'TEST',
			}, {
				type: 5,
				name: 'a dungeon',
				description: 'TEST',
			}, {
				type: 6,
				name: 'a small farm',
				description: 'TEST',
			}, {
				type: 7,
				name: 'an open field',
				description: 'You are alone in an empty field.'
			},
			
		];
		
		$scope.mapGrid = []
		
		//List of every defined room in the game
		$scope.roomList = [
			{
				id: 0,
				event: 0,
				type: 0,
				poop: 0,
				examined: 0,
				directions: [
					{canMove: 0},
					{canMove: 0},
					{canMove: 0},
					{canMove: 0},
				],
				action: function(){
					alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				id: 1,
				event: 1,
				type: 7,
				poop: 0,
				examined: 0,
				directions: [
					{canMove: 1, roomType: 1},
					{canMove: 1, roomType: 6},
					{canMove: 0, roomData: null},
					{canMove: 0, roomData: null},
				],
				action: function(){
					$scope.room.event = 0;
				},
			}, 
		];
		
		//List of every text event that will happen in the game
		$scope.eventList = [
			{
				id: 0,
				description: '',
			},{
				id: 1,
				description: 'You find yourself awaking to sharp pain covering your whole body. You struggle for breath and ache from the bruses on your upperbody and lacerations on your thighs and calves. Beaten and starved, your top priorities are tending to your wounds and empty stomach.',
			},
			
		];
	}]);

	
})();
(function(){
	var app = angular.module("gameWorld", []);
	
	app.controller("RoomController", ["$scope", function($scope){
		//Direction definitions (0: North, 1: East, 2: West, 3: South)
		$scope.compass = [
			'north',
			'east',
			'south',
			'west'
		];
		
		//Numerical values for the compass
		$scope.cNum = [-8, 1, 8, -1];
		
		//Set of room templates
		$scope.roomSet = [
			{
				type: 0,
				name: 'NULL',
				description: 'TEST',
			}, {
				type: 1,
				name: 'the foyer',
				description: 'You are standing in the foyer of a large mansion.',
			}, {
				type: 2,
				name: 'a hallway',
				description: 'You are standing in a hallway.',
			}, {
				type: 3,
				name: 'a restroom',
				description: 'You are standing in a restroom.',
			}, {
				type: 4,
				name: 'a bedroom',
				description: 'You are standing in a bedroom. There is a bed here where you can rest.',
			}, {
				type: 5,
				name: 'an empty room',
				description: 'You are standing in an empty room.',
			}, {
				type: 6,
				name: 'a kitchen',
				description: 'You are standing in a kitchen.',
			}, {
				type: 7,
				name: 'a dining room',
				description: 'You are standing in a room with a large table where people eat.',
			},
			
		];
		
		//16x16 grid
		$scope.mapGrid = [
			0,  0,  0,  0,  0,  0,  0,  0,
			0,  0,  0,  0,  0,  0,  0,  0,
			0,  0,  3,  2,  6,  0,  0,  0,
			0,  0,  4,  2,  7,  0,  0,  0,
			0,  2,  2,  2,  2,  2,  2,  3,
			0,  2,  5,  2,  5,  4,  2,  0,
			0,  2,  2,  1,  2,  2,  2,  0,
			0,  0,  0,  0,  0,  0,  0,  0,
		];
		
		$scope.position = 51;
		/*
		1: Origin, 2: Hallway, 3: Restroom, 4: Bedroom,
		5: Empty Room, 6: Kitchen, 7: Dining Room
		-------- 
		--------
		--RHK---
		--BHD---
		-HHHHHHR
		-HEHEBH-
		-HHOHHH-
		--------
		*/
		
		//List of every defined room in the game
		//Initialize all rooms
		$scope.roomList = [];
		
		/*for (i = 0; i < 64; i++) {
			
			$scope.roomList.push({
				event: 0,
				type: $scope.mapGrid[i],
				poop: 0,
				examined: 0,
				directions: [0, 0, 0, 0],
				action: function(){
					alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			});
			
			if ($scope.mapGrid[i-8] > 0) $scope.roomList[i].directions[0] = {
				1,
				
			};
			if ($scope.mapGrid[i+1] > 0) $scope.roomList[i].directions[1] = 1;
			if ($scope.mapGrid[i+8] > 0) $scope.roomList[i].directions[2] = 1;
			if ($scope.mapGrid[i-1] > 0) $scope.roomList[i].directions[3] = 1;
			
		}
		
		//Set barriers and actions
		$scope.roomList[59].directions = [1, 1, 0, 0],
		$scope.roomList[59].action = function(){
			$scope.room.event = 0;
		};
		*/
		
		//Debug code
		$scope.roomList[51] = {
			event: 1,
			type: $scope.mapGrid[51],
			poop: 0,
			examined: 0,
			directions: [
				{
					canMove: 1,
					name: $scope.roomSet[$scope.mapGrid[51 + $scope.cNum[0]]].name,
				}, {
					canMove: 1,
					name: $scope.roomSet[$scope.mapGrid[51 + $scope.cNum[1]]].name,
				}, {
					canMove: 0,
					name: "NULL",
				}, {
					canMove: 0,
					name: "NULL",
				},
			],
			action: function(){
				alert("ERROR! ERROR! I NEED SCISSORS 61!");
			},
		}
		
		$scope.room = $scope.roomList[$scope.position];
		
		$scope.move = function(number){
			//Carry out the pre-room moving actions
			$scope.room.action();
			
			//Save the state of the room to the list
			$scope.roomList[$scope.position] = $scope.room;
			
			//Set the new position
			$scope.position += number;
			
			//Move to the new position
			$scope.room = $scope.roomList[$scope.position];
		};
		
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
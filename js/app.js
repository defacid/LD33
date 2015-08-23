(function(){
	var app = angular.module("gameWorld", []);
	
	app.controller("RoomController", ["$scope", function($scope){
		$scope.stats = {
			maxHealth: 10,
			health: 1,
			rest: 100,
			hunger: 35,
			inventory: [],
		}
		
		$scope.triggers = {
			showHealth: 1,
			showRest: 0,
			showHunger: 0,
		}
		
		//Direction definitions (0: North, 1: East, 2: West, 3: South)
		$scope.compass = [
			'north',
			'east',
			'south',
			'west'
		];
		
		//Grid size - All grids are currently squares, but you can have empty space on your grid
		$scope.gridSize = 8;
		
		//Numerical values for the compass
		$scope.cNum = [-$scope.gridSize, 1, $scope.gridSize, -1];
		
		//Set of room templates
		$scope.roomSet = [
			{
				type: 0,
				name: 'NULL',
				description: 'TEST',
				action: function(){
					alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 1,
				name: 'the foyer',
				description: 'You are standing in the foyer of a large mansion.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			}, {
				type: 2,
				name: 'a hallway',
				description: 'You are standing in a hallway.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			}, {
				type: 3,
				name: 'a restroom',
				description: 'You are standing in a restroom.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			}, {
				type: 4,
				name: 'a bedroom',
				description: 'You are standing in a bedroom. There is a bed here where you can rest.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			}, {
				type: 5,
				name: 'an empty room',
				description: 'You are standing in an empty room.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			}, {
				type: 6,
				name: 'a kitchen',
				description: 'You are standing in a kitchen.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			}, {
				type: 7,
				name: 'a dining room',
				description: 'You are standing in a room with a large table where people eat.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			},
			
		];
		
		//8 x 8 Grid - Make sure it matches your gridSize
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
		
		//Initialize counter for cycling through each item on the mapGrid
		var i = 0;
		
		//Push room objects onto the roomList stack
		angular.forEach($scope.mapGrid, function(){
			this.push({
				event: 0,
				type: $scope.mapGrid[i],
				poop: 0,
				examined: 0,
				heal: 0, //Int
				food: 0, //Int
				canRest: 0, //Bool
				directions: [
					{
						canMove: 0,
						name: "NULL",
					}, {
						canMove: 0,
						name: "NULL",
					}, {
						canMove: 0,
						name: "NULL",
					}, {
						canMove: 0,
						name: "NULL",
					},
				],
				action: $scope.roomSet[$scope.mapGrid[i]].action,
			});
			
			//Determine if a room is empty before allowing travel to said room
			if ($scope.mapGrid[i + $scope.cNum[0]] > 0) $scope.roomList[i].directions[0] = {
				canMove: 1,
				name: $scope.roomSet[$scope.mapGrid[i + $scope.cNum[0]]].name,
			};
			if ($scope.mapGrid[i + $scope.cNum[1]] > 0) $scope.roomList[i].directions[1] = {
				canMove: 1,
				name: $scope.roomSet[$scope.mapGrid[i + $scope.cNum[1]]].name,
			};
			if ($scope.mapGrid[i + $scope.cNum[2]] > 0) $scope.roomList[i].directions[2] = {
				canMove: 1,
				name: $scope.roomSet[$scope.mapGrid[i + $scope.cNum[2]]].name,
			};
			if ($scope.mapGrid[i + $scope.cNum[3]] > 0) $scope.roomList[i].directions[3] = {
				canMove: 1,
				name: $scope.roomSet[$scope.mapGrid[i + $scope.cNum[3]]].name,
			};
			i++;
			
		}, $scope.roomList);
		
		
		//Set Internal Walls/Boundaries - This must be defined manually. Make sure to block both sides if you want a certain area to be impassible (Ex - Only block the west facing side of 41 if you would still like to travel from 40 to 41. Otherwise, be sure to block the east facing side of 40 as well to close travel between the two rooms completely.)
		$scope.roomList[26].directions[2].canMove = 0;
		
		$scope.roomList[32].directions[2].canMove = 0;
		
		$scope.roomList[34].directions[0].canMove = 0;
		
		$scope.roomList[37].directions[0].canMove = 0;
		
		$scope.roomList[40].directions[0].canMove = 0;
		$scope.roomList[40].directions[2].canMove = 0;
		
		$scope.roomList[42].directions[1].canMove = 0;
		$scope.roomList[42].directions[2].canMove = 0;
		
		$scope.roomList[43].directions[3].canMove = 0;
		
		$scope.roomList[44].directions[1].canMove = 0;
		$scope.roomList[44].directions[2].canMove = 0;
		
		$scope.roomList[45].directions[0].canMove = 0;
		$scope.roomList[45].directions[2].canMove = 0;
		$scope.roomList[45].directions[3].canMove = 0;
		
		$scope.roomList[48].directions[0].canMove = 0;
		
		$scope.roomList[50].directions[0].canMove = 0;
		
		$scope.roomList[52].directions[0].canMove = 0;
		
		$scope.roomList[53].directions[0].canMove = 0;
		
		//Room Event/Action List 
		$scope.roomList[51].event = 1;
		$scope.roomList[51].heal = 3;
		$scope.roomList[51].action = function(){
			$scope.roomList[51].event = 0;
		};
		
		//Set the game room to the initial position
		$scope.room = $scope.roomList[$scope.position];

		//ACTIONS

		//Heal - Heal yourself and remove the healing properties of the room
		$scope.heal = function(number){
			$scope.stats.health += number;

			if ($scope.stats.health > $scope.stats.maxHealth) $scope.stats.health = $scope.stats.maxHealth; 

			$scope.room.heal -= number;
		}
		
		//Move - Execute room action code and move from room to room 
		$scope.move = function(number){
			//Save the state of the room to the list
			$scope.roomList[$scope.position] = $scope.room;
			
			//Set the new position
			$scope.position += number;
			
			//Carry out the pre-room moving actions
			$scope.room.action();
			
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
			}, {
				id: 2,
				description: 'The path is blocked by debris. You cannot go that way.',
			},
			
		];
	}]);

	
})();
(function(){
	var app = angular.module("gameWorld", []);
	
	app.controller("RoomController", ["$scope", function($scope){
		$scope.Math = window.Math;

		$scope.stats = {
			maxHealth: 10,
			health: 1,
			rest: 50,
			hunger: 20,
			inventory: [],
		}

		$scope.gameEnd = 0;
		$scope.poopCount = 0;
		$scope.steps = 0;
		$scope.timeline = 1;
		
		$scope.triggers = {
			showHealth: 1,
			showRest: 1,
			showHunger: 1,
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
				heal: 0,
				food: 0,
				comfort: 0,
				indepth: 'The front door is locked and you do not see a way to unlock it.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				}
			}, {
				type: 2,
				name: 'a hallway',
				description: 'You are standing in a hallway.',
				heal: 0,
				food: 0,
				comfort: 0,
				indepth: 'There is nothing else to see.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 3,
				name: 'a restroom',
				description: 'You are standing in a restroom.',
				heal: 5,
				food: 0,
				comfort: 10,
				indepth: 'There is an empty bathtub available to take a nap in and there are bandages and prescription pills in here.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 4,
				name: 'a bedroom',
				description: 'You are standing in a bedroom. There is a bed here where you can rest.',
				heal: 0,
				food: 0,
				comfort: 50,
				indepth: 'There is nothing else to see.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 5,
				name: 'an empty room',
				description: 'You are standing in an empty room.',
				heal: 0,
				food: 0,
				comfort: 0,
				indepth: 'There is nothing else to see.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 6,
				name: 'a kitchen',
				description: 'You are standing in a kitchen.',
				heal: 0,
				food: 50,
				comfort: 0,
				indepth: 'There is an entire pantry of food to raid and sustain you.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 7,
				name: 'a dining room',
				description: 'You are standing in a room with a large table where people eat.',
				heal: 0,
				food: 15,
				comfort: 0,
				indepth: 'Various half eaten scraps are available to eat out of the trash.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 8,
				name: 'a den',
				description: 'You are standing in the den.',
				heal: 0,
				food: 0,
				comfort: 30,
				indepth: "There's a relatively comfortable couch to lay on here.",
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 9,
				name: 'a living room',
				description: 'You are standing in a room with a large table where people eat.',
				heal: 0,
				food: 0,
				comfort: 40,
				indepth: 'There is a plush sectional in the corner of the room that would be nice to sit on.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			}, {
				type: 10,
				name: 'a garage',
				description: 'You are standing in an empty garage.',
				heal: 0,
				food: 10,
				comfort: 10,
				indepth: 'There is a dog bed here you can sleep in alongside bowls of dog food and water.',
				action: function(){
					//alert("ERROR! ERROR! I NEED SCISSORS 61!");
				},
			},
			
		];
		
		//8 x 8 Grid - Make sure it matches your gridSize
		$scope.mapGrid = [
			0,  0,  0,  0,  0,  0,  0,  0,
			0,  0,  0,  0,  0,  0,  0,  0,
			0,  0,  3,  2,  6,  0,  0,  0,
			0,  0,  4,  2,  7,  0,  0,  0,
			0,  4,  2,  2,  2,  2,  2,  3,
			0,  3,  9,  2,  8,  4,  2,  0,
			0,  4,  2,  1,  2,  2,  2, 10,
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
				eventCall: 0,
				type: $scope.mapGrid[i],
				poop: 0,
				examined: 0,
				heal: $scope.roomSet[$scope.mapGrid[i]].heal,
				food: $scope.roomSet[$scope.mapGrid[i]].food,
				comfort: $scope.roomSet[$scope.mapGrid[i]].comfort,
				indepth: $scope.roomSet[$scope.mapGrid[i]].indepth,
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
		
		//Set the game room to the initial position
		$scope.room = $scope.roomList[$scope.position];
		$scope.room.eventCall = 1;

		//ACTIONS
		
		//Look - Look at your surroundings
		$scope.look = function(){
			$scope.room.examined = 1;
			
			$(".action").html('<div class="right">You examined your surroundings.</div>');
		};
		
		//Poop - I know it's childish, but it gets the Point of Object Perminance across... Sorry, couldn't help myself
		$scope.poop = function(){
			$scope.room.poop = 1;

			$scope.poopCount += 1;
			
			$(".action").html('<div class="right">You decided to poop on the ground.</div>');
		};

		//Heal - Heal yourself and remove the healing properties of the room
		$scope.heal = function($number){
			$scope.stats.health += $number;

			if ($scope.stats.health > $scope.stats.maxHealth) $scope.stats.health = $scope.stats.maxHealth; 
			
			$(".action").html('<div class="good left"><i class="fa fa-heart"></i> +' + $number +'</div><div class="good right">You attended to your wounds.</div>');
			
			$scope.room.heal -= $number;
		}
		
		//Eat - Eat food and remove the food source from the room
		$scope.eat = function($number){
			$scope.stats.hunger += $number;

			if ($scope.stats.hunger > 100) $scope.stats.hunger = 100; 
			
			$(".action").html('<div class="good left"><i class="fa fa-cutlery"></i> +' + $number +'</div><div class="good right">You satisfied your hunger.</div>');

			$scope.room.food -= $number;
		}
		
		//Rest - Use the room to an amount of rest relative to the comfort level - time passes, so you will be hungier when you are done resting
		$scope.rest = function($number){
			$scope.stats.rest += $number;
			$scope.stats.health += 2;
			$scope.stats.hunger -= 10;

			if ($scope.stats.hunger <= 0) $scope.gameEnd = 1;
			
			if ($scope.stats.rest > 100) $scope.stats.rest = 100; 
			
			$(".action").html('<div class="left"><span class="good"><i class="fa fa-bed"></i> +' + $number +' <i class="fa fa-heart"></i> +2</span> <span class="danger"><i class="fa fa-cutlery"></i> -10</span></div><div class="good right">You allowed yourself to rest.</div>');
		}
		
		//Move - Execute room action code and move from room to room 
		$scope.move = function($number){

			//Save the state of the room to the list
			$scope.roomList[$scope.position] = $scope.room;
			
			//Set the new position
			$scope.position += $number;
			
			//Carry out the specific pre-room moving actions
			$scope.room.action();
			
			//Make tired and be haaangry
			$scope.stats.hunger -= 1;
			$scope.stats.rest -= 1;
			
			//Clear the action text
			$('.action').html('<div class="danger left"><i class="fa fa-bed"></i> -1 <i class="fa fa-heart"></i> -1</div><div class="right">You moved to the next area.</div><br />');

			//Count the steps taken
			$scope.steps += 1;

			//Set the event to none
			$scope.room.eventCall = 0;

			//Move to the new position
			$scope.room = $scope.roomList[$scope.position];

			//Call Story Events
			if ($scope.room.eventCall == 0) {
				//Set the events
				for(i=1; i<7; i++) {
					if ($scope.poopCount > i && $scope.steps > i*2 && $scope.timeline < i+1) {
						if ($scope.timeline < 6) {
							$scope.timeline += 1;
							$scope.roomList[$scope.position].eventCall = i+1;
						} else {
							$scope.gameEnd = 3;
						}
					};
				};
			};

			if ($scope.stats.hunger <= 0) $scope.gameEnd = 1;
			if ($scope.stats.rest <= 0) $scope.gameEnd = 2;
		};
		
		//List of every text event that will happen in the game
		$scope.eventList = [
			{
				id: 0,
				description: '',
			}, {
				id: 1,
				description: 'You find yourself awaking to your stomach both empty and in knots. There are bruises coving your body, and you can not recall why you are so hurt and hungry. Your top priorities are tending to your wounds and empty stomach.',
			}, {
				id: 2,
				description: 'You hear a door open and close somewhere in the house.',
			}, {
				id: 3,
				description: '"What is that horrid stench?" you heard a female voice say.',
			}, {
				id: 4,
				description: '"OH MY GOD, WHAT IS THAT!?" a voice screams, almost unintelligibly.',
			}, {
				id: 5,
				description: '"Where is it even coming from?!" you hear a male voice yell.',
			}, {
				id: 6,
				description: 'You hear what sounds like a man and woman frantically yelling at each other. You believe you might also hear sobbing.',
			},
		];
	}]);

	
})();
(function(){
	var app = angular.module("gameWorld", []);
	
	app.controller("RoomController", function(){
		this.rooms = roomList;
		this.type = "cool";
	});
	
	app.controller("EventController", function(){
		this.events = eventList;
	});
	
	var direction = [
		'north',
		'east',
		'south',
		'west'
	];
	
	var roomList = [
		{
			type: 'an open field',
			description: 'You find yourself awaking to sharp pain covering your whole body. Alone in <strong>an open field</strong>, you struggle for breath and ache from the bruses on your upperbody and lacerations on your thighs and calves.',
			directions: [
				{canMove: 1, roomData: roomTypes[1]},
				{canMove: 1, roomData: roomTypes[6]},
				{canMove: 0, roomData: null},
				{canMove: 0, roomData: null},
			],
		}
	];
	
	var roomTypes = [
		{
			type: 'a dirt road',
			description: 'TEST',
		}, {
			type: 'a dark forest',
			description: 'TEST',
		}, {
			type: 'a large castle',
			description: 'TEST',
		}, {
			type: 'an empty room',
			description: 'TEST',
		}, {
			type: 'another empty room',
			description: 'TEST',
		}, {
			type: 'a dungeon',
			description: 'TEST',
		}, {
			type: 'a small farm',
			description: 'TEST',
		},
		
	];
	
	
})();
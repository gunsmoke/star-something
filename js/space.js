var initId = 0;
var world = createWorld();
var ctx;
var keys = [];
var test;
var mouse = {x:0,y:0};
var player = function(){
	this.ship = null;
	this.mouseJoint = null;
	this.shells = null;
};
function setupWorld() {
	world = createWorld();
	var createDebry = true;
	if(createDebry){
		for (var i = 0; i < 120; i++) {
			var size = 8*Math.random();
			if(size<5){size=5;}
			createBall(world,size,scene.canvasWidth*Math.random(),scene.canvasHeight*Math.random(),true);
		};
		for (var i = 0; i < 50; i++) {
			var size = 25*Math.random();
			if(size<10){size=10;}
			createBox(world,scene.canvasWidth*Math.random(),scene.canvasHeight*Math.random(),size,size,true);
		};
	}

	player.ship = createBox(world,scene.canvasWidth/2,scene.canvasHeight/2,12,20,false);
	player.shells = new Array();
	//setup debug draw
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(scene.scale);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1);
	//debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit | b2DebugDraw.e_centerOfMassBit);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit);
	world.SetDebugDraw(debugDraw);
}

var max_speed = 400/scene.scale;
var speed = 25/scene.scale;

function fireCannons(target){
	var position = player.ship.GetPosition();
	var angle = player.ship.GetAngle()+1.6;
	var newx = Math.cos(angle) + position.x
	var newy = Math.sin(angle) + position.y
	var shell = createShell(world,3,newx,newy);
	target.Multiply(3);
	shell.SetLinearVelocity(target);
	player.shells.push({'body':shell,'life':20});
}

function clearShells(){
	for (var i = 0; i < player.shells.length; i++) {
		player.shells[i].life-=Math.random()*2;
		if(player.shells[i].life<0){
			world.DestroyBody(player.shells[i].body);
			player.shells.splice(i,1);
		}
	};
}

function handleInteractions(){
	// clear the shells
	clearShells();

	var mouseTarget = new b2Vec2(mouse.x,mouse.y);

	player.ship.SetAngularVelocity(0);
    var pos = player.ship.GetPosition();
    mouseTarget.Subtract(pos);
    var desiredAngle = Math.atan2( -mouseTarget.x, mouseTarget.y );
	var vel = player.ship.GetLinearVelocity();
	player.ship.SetAngle(desiredAngle);
	// up/down arrow
	if (keys[38] || keys[87]){
		vel.y-=speed;
	}
	if (keys[40] || keys[83]){
		vel.y+=speed;	
	}
	// left/right arrows
	if (keys[37] || keys[65]){
		vel.x-=speed;
	}
	if (keys[39] || keys[68]){
		vel.x+=speed;
	}
	// FIRE
	if (isMouseDown) {
		fireCannons(mouseTarget);
	}

	if(vel.x > max_speed){vel.x=max_speed};
	if(vel.x < -max_speed){vel.x=-max_speed};
	if(vel.y > max_speed){vel.y=max_speed};
	if(vel.y < -max_speed){vel.y=-max_speed};
	
}

function update() {
	handleInteractions();
	world.Step(
		1 / 60   //frame-rate
		,  10    //velocity iterations
		,  10    //position iterations
	);
	world.DrawDebugData();
	world.ClearForces();
}
function handleKeyDown(evt){
	keys[evt.keyCode] = true;
}
function handleKeyUp(evt){
	keys[evt.keyCode] = false;
}
function handelMouse(evt){
	mouse.x = evt.pageX/scene.scale;
	mouse.y = evt.pageY/scene.scale;
}
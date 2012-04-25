function createWorld() {
	var world = new b2World(new b2Vec2(0, 0),true);
	// LEFT
	createStaticBox(world,0,scene.canvasHeight/2,5,scene.canvasHeight/2);
	// RIGHT
	createStaticBox(world,scene.canvasWidth,scene.canvasHeight/2,5,scene.canvasHeight/2);
	// GROUND
	createStaticBox(world,scene.canvasWidth/2,scene.canvasHeight,scene.canvasWidth/2,5);
	// CEILING
	createStaticBox(world,scene.canvasWidth/2,0,scene.canvasWidth/2,5);
	return world;
}

function createStaticBox(world,x,y,width,height) {
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width/scene.scale,height/scene.scale);

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.x = x/scene.scale;
	bodyDef.position.y = y/scene.scale;

	var wb = world.CreateBody(bodyDef);
   	wb.CreateFixture(fixDef);
   	return wb;
}

function createShell(world, radius, x, y){
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;

	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.Set(x, y);
	fixDef.shape = new b2CircleShape(radius/scene.scale);
    bodyDef.allowSleep = false;
    bodyDef.bullet = true;
   	var wb = world.CreateBody(bodyDef);
   	wb.CreateFixture(fixDef);
   	return wb;
}

function createBall(world, radius, x, y, allowSleep) {
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;

	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.Set(x/scene.scale, y/scene.scale);
	fixDef.shape = new b2CircleShape(radius/scene.scale);
    bodyDef.allowSleep = allowSleep;
   	var wb = world.CreateBody(bodyDef);
   	wb.CreateFixture(fixDef);
   	return wb;
}

function createBox(world, x, y, width, height, allowSleep) {
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width/scene.scale,height/scene.scale);

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.x = x/scene.scale;
	bodyDef.position.y = y/scene.scale;

    bodyDef.allowSleep = allowSleep;
	var wb = world.CreateBody(bodyDef);
   	wb.CreateFixture(fixDef);
   	return wb;
}

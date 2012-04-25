// set the scene size
var WIDTH = $(window).width(), HEIGHT = $(document).height()-8;

// set some camera attributes
var VIEW_ANGLE = 50, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');
var scene, renderer, camera, sphere, pointLight;
var r = 0;

initScene();
animate();

function generateStars(quantity,z,color){
	var x, y, geo = new THREE.Geometry();

	for ( var i = 0; i < quantity; i ++ ) {

		x = THREE.Math.randFloatSpread( WIDTH-z );
		y = THREE.Math.randFloatSpread( HEIGHT-z );

		var p = new THREE.Vector3( x, y, z );
		geo.vertices.push( new THREE.Vertex( p ) );

	}

	var particles = new THREE.ParticleSystem( geo, new THREE.ParticleBasicMaterial( { color: color } ) );
	scene.add( particles );
}

function initScene(){

	// and a scene
	scene = new THREE.Scene();

	// create a WebGL renderer, camera
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		clearColor: 0x000000,
		clearAlpha: 1
	});

	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

	// add the camera to the scene
	scene.add(camera);

	// the camera starts at 0,0,0
	// so pull it back
	camera.position.z = 300;

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	$container.append(renderer.domElement);

	// set up the sphere vars
	var radius = 40, segments = 32, rings = 32;

	// create the sphere's material
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000,  wireframe:true});

	// create a new mesh with
	// sphere geometry - we will cover
	// the sphereMaterial next!
	sphere = new THREE.Mesh(new THREE.SphereGeometry(radius,segments,rings),sphereMaterial);

	// add the sphere to the scene
	scene.add(sphere);


	// create a point light
	pointLight = new THREE.PointLight(0xFFFFFF);
	// set its position
	pointLight.position.x = 420;
	pointLight.position.y = 550;
	pointLight.position.z = 430;
	// add to the scene
	scene.add(pointLight);


	generateStars(10000,-1000,0x666666);
	generateStars(1000,-100,0xFFFFFF);
	generateStars(100,-500,0x555555);
	generateStars(10,-800,0x222222);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;

	stats.domElement.children[ 0 ].children[ 0 ].style.color = "#ccc";
	stats.domElement.children[ 0 ].style.background = "transparent";
	stats.domElement.children[ 0 ].children[ 1 ].style.display = "none";

	$container.append( stats.domElement );

	renderer.autoClear = false;
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'keydown', onKeyDown, false );

}

function onWindowResize( event ) {

	SCREEN_WIDTH = $(window).width();
	SCREEN_HEIGHT = $(window).height();

	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

}


function goLeft(){
	
}

function onKeyDown ( event ) {
	switch( event.keyCode ) {
		case 27: /*ESCAPE*/;
		case 17: /*CTRL*/;
		case 37: /*LEFT*/;
		case 38: /*UP*/;
		case 39: /*RIGHT*/;
		case 40: /*DOWN*/;
		case 65: /*A*/;
		case 87: /*W*/;
		case 83: /*S*/;
		case 68: /*D*/;
	}

};


function render(){

	sphere.position.x = 61 * Math.cos( r );
	sphere.position.z = 61 * Math.sin( r );
	sphere.position.y = 61 * Math.sin( r );

	renderer.clear();
	renderer.render( scene, camera );

	r += 0.003;
}

function animate(){
	requestAnimationFrame( animate );
	render();
	stats.update();
}
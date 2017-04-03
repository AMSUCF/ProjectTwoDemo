//utility function for on screen
$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};
console.log('\'Allo \'Allo!');
$(document).ready(function () {
  //animate the cards
  $(window).scroll(function(){
        $('.card').each(function() {
            if ($(this).isOnScreen()) {
                $(this).addClass("animated bounceIn");
            }
        });
    });
  //new code for fireworks
  var fireworkRenderer = PIXI.autoDetectRenderer(window.innerWidth, 500, {transparent: true });
  $("#fireworks").append(fireworkRenderer.view);
  var fireworkStage = new PIXI.Container();
  var rightFireworkEmitter;
  var elapsed = Date.now();
  explode();
  var timer = setInterval(makeFirework, 5000);
  function makeFirework() {
    console.log('made');
    rightFireworkEmitter = new PIXI.particles.Emitter(
      // The PIXI.Container to put the emitter in
      // if using blend modes, it's important to put this
      // on top of a bitmap, and not use the root stage Container
      fireworkStage,
      // The collection of particle images to use
      [PIXI.Texture.fromImage('images/star.png')],
      // Emitter configuration, edit this to change the look
      // of the emitter
        {
            alpha: {
                start: 0.5,
                end: 0.1
            },
            scale: {
                start: .08,
                end: 0.01
            },
            color: {
                start: "fb1010",
                end: "f5b830"
            },
            speed: {
                start: 200,
                end: 10
            },
            startRotation: {
                min: 0,
                max: 360
            },
            rotationSpeed: {
                min: 0,
                max: 0
            },
            lifetime: {
                min: 0.5,
                max: 1
            },
            frequency: 0.2,
            emitterLifetime: Math.random()*3+1,
            maxParticles: 1000,
            pos: {
                x: Math.random()*300+50,
                y: Math.random()*200+100
            },
            addAtBack: true,
            spawnType: "burst",
					  particlesPerWave: 5,
					  particleSpacing: 0,
					  angleStart: 0
        }
  );
  rightFireworkEmitter.emit = true;
 }
  function explode() {
    var now = Date.now();
    if (rightFireworkEmitter) {
      console.log('emit');
      rightFireworkEmitter.update((now - elapsed) * 0.001);
    }
    elapsed = now;
    fireworkRenderer.render(fireworkStage);
    requestAnimationFrame(explode);
  }

  // 1. Create a Pixi renderer
  var renderer = PIXI.autoDetectRenderer(400, 400, { transparent: true });
  // 2. Append canvas element to the body
  $("#addPixi").append(renderer.view);
  // 3. Create a container that will hold your scene
  var stage = new PIXI.Container();
  //create a PIXI sprite from an image
  var clouds = PIXI.Sprite.fromImage('images/clouds.jpg');
  //center the sprite anchor
  clouds.anchor.x = 0.5;
  clouds.anchor.y = 0.5;
  //move the sprite to the center of the canvas
  clouds.position.x = 200;
  clouds.position.y = 200;
  //add cloud to stage
  stage.addChild(clouds);
  // add stage to the canvas
  var text = new PIXI.Text("Welcome", {font:"50px Arial", dropShadow: true, fill:"white"});
  //center the text anchor
  text.anchor.x = 0.5;
  text.anchor.y = 0.5;
  //move the sprite to center just off top of canvas
  text.position.x = 200;
  text.position.y = -25;
  //add text to the stage
  stage.addChild(text);
  render();
  //set initial saturation for animation
  var count = 0;
  var moveX = 1;
  function render(){
    requestAnimationFrame(render);
    //rotate each frame
    clouds.rotation += .001;
    //add an animated filter
    var colorMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    //use the matrix for the filter starting point
    var filter = new PIXI.filters.ColorMatrixFilter();
    filter.matrix = colorMatrix;
    var newValSat = 0 + Math.sin(count);
    filter.saturate(newValSat, false);
    stage.filters = [filter];
    count += 0.01;
    renderer.render(stage);
    if (text.position.y <300) {
      text.position.y += 1;
    }
  }
});

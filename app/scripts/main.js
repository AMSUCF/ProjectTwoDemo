
console.log('\'Allo \'Allo!');
$(document).ready(function () {
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

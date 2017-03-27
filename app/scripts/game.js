$(document).ready(function() {
  //rendering options
  var renderOptions = {
    antialiasing: false,
    transparent: false,
    resolution: 1,
    autoResize: true,
  }
  //set up the stage
  var stage = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, renderOptions);
  //attach it to the body
  document.body.appendChild(renderer.view);
  // Put the renderer on screen in the corner
  renderer.view.style.position = "absolute";
  renderer.view.style.top = "0px";
  renderer.view.style.left = "0px";
  //resize it to fit the screen
  window.onresize = resize;
  resize();
  //add keyboard controls
  //Create the `cat` sprite
  var cat = new PIXI.Sprite.fromImage("images/cat.png");
  cat.y = 96;
  cat.x = 0;
  cat.vx = 0;
  cat.vy = 0;
  //set the cat scale
  cat.scale.set(0.1,0.1);
  //add the cat to stage
  stage.addChild(cat);
/*  //draw a circle
  // Initialize the pixi Graphics class
  var graphics = new PIXI.Graphics();
  // Set the fill color
  graphics.beginFill(0xe74c3c, .5); // Red
  // Draw a circle
  graphics.drawCircle(100,100,50); // drawCircle(x, y, radius)
  // Applies fill to lines and shapes since the last call to beginFill.
  graphics.endFill();
  // Add the graphics to the stage
  stage.addChild(graphics); */
  var graphics = new PIXI.Graphics();
  stage.addChild(graphics);
  stage.interactive = true;
  stage.containsPoint = () => true;
  stage.on('click', function(mouseData) {
    graphics.beginFill(0xe74c3c, .5);
    graphics.drawCircle(mouseData.data.originalEvent.pageX,mouseData.data.originalEvent.pageY,50);
    graphics.endFill();
  });
  //Capture the keyboard arrow keys using ASCII codes and a keyboard handler function, below
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);
  //Left arrow key `press` method
  left.press = function() {
    //Change the cat's velocity when the key is pressed
    cat.vx = -5;
  };
  //Left arrow key `release` method
  left.release = function() {
    //If the left arrow has been released, and the right arrow isn't down,
    //Stop the cat
    if (!right.isDown) {
      cat.vx = 0;
    }
  };
  //Up
  up.press = function() {
    cat.vy = -5;
  };
  up.release = function() {
    if (!down.isDown) {
      cat.vy = 0;
    }
  };
  //Right
  right.press = function() {
    cat.vx = 5;
  };
  right.release = function() {
    if (!left.isDown) {
      cat.vx = 0;
    }
  };
  //Down
  down.press = function() {
    cat.vy = 5;
  };
  down.release = function() {
    if (!up.isDown) {
      cat.vy = 0;
    }
  };
  //handle animation
  requestAnimationFrame(animate);
  function animate() {
      requestAnimationFrame(animate);
      cat.x += cat.vx;
      cat.y += cat.vy;
      renderer.render(stage);
  }
  //handle resize
  function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      renderer.view.style.width = w + 'px';
      renderer.view.style.height = h + 'px';
  }
});
//keyboard handler -- just put this function anywhere you want keyboard controls
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

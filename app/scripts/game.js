$(document).ready(function() {
  var renderOptions = {
    antialiasing: false,
    transparent: false,
    resolution: window.devicePixelRatio,
    autoResize: true
  }
  var stage = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, renderOptions);
  document.body.appendChild(renderer.view);
  renderer.view.style.position = "absolute";
  renderer.view.style.top = "0px";
  renderer.view.style.left = "0px";
  window.onresize = resize;
  resize();
  var cat = new PIXI.Sprite.fromImage("images/cat.png");
  cat.y = 96;
  cat.x = 0;
  cat.vx = 0;
  cat.vy = 0;
  cat.scale.set(0.1,0.1);
  stage.addChild(cat);
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);
    left.press = function() {
      cat.vx = -5;
    };
    left.release = function() {
      if (!right.isDown) {
          cat.vx = 0;
        }
      };
    right.press = function() {
      cat.vx = 5;
    };
    right.release = function() {
      if (!left.isDown) {
        cat.vx = 0;
      }
    };
    var graphics = new PIXI.Graphics();
    stage.interactive = true;
    stage.containsPoint = () => true;
    stage.on('mousedown', function(mouseData) {
      //alert('click');
      graphics.beginFill(0xe74c3c, .5);
      graphics.drawCircle(mouseData.data.originalEvent.pageX,mouseData.data.originalEvent.pageY,50);
      graphics.endFill();
    });
    /*graphics.beginFill(0xe74c3c, .5);
    graphics.drawCircle(100,100,50);
    graphics.endFill();*/
    stage.addChild(graphics);
  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';
  }
  requestAnimationFrame(animate);
  function animate() {
    requestAnimationFrame(animate);
    cat.x += cat.vx;
    cat.y += cat.vy;
    renderer.render(stage);
  }
});
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

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
    //Up
   up.press = function() {
     cat.vy = -5;
   };
   up.release = function() {
     if (!down.isDown) {
       cat.vy = 0;
     }
   };
   down.press = function() {
        cat.vy = 5;
    };
      down.release = function() {
      if (!up.isDown) {
          cat.vy = 0;
      }
      };
    var emitter;
    var graphics = new PIXI.Graphics();
    stage.interactive = true;
    stage.containsPoint = () => true;
    stage.on('mousedown', function(mouseData) {
      //alert('click');
      emitter = new PIXI.particles.Emitter(

        // The PIXI.Container to put the emitter in
        // if using blend modes, it's important to put this
        // on top of a bitmap, and not use the root stage Container
        stage,

        // The collection of particle images to use
        [PIXI.Texture.fromImage('images/soot.gif')],

        // Emitter configuration, edit this to change the look
        // of the emitter
        {
            alpha: {
                start: 0.8,
                end: 0.1
            },
            scale: {
                start: 1,
                end: 0.3
            },
            color: {
                start: "fb1010",
                end: "f5b830"
            },
            speed: {
                start: 200,
                end: 100
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
                max: 0.5
            },
            frequency: 0.008,
            emitterLifetime: 0.31,
            maxParticles: 1000,
            pos: {
                x: mouseData.data.originalEvent.pageX,
                y: mouseData.data.originalEvent.pageY
            },
            addAtBack: false,
            spawnType: "circle",
            spawnCircle: {
                x: 0,
                y: 0,
                r: 10
            }
        }
    );
      graphics.beginFill(0xe74c3c, .5);
      graphics.drawCircle(mouseData.data.originalEvent.pageX,mouseData.data.originalEvent.pageY,50);
      graphics.endFill();
      emitter.emit = true;
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
  var elapsed = Date.now();
  requestAnimationFrame(animate);
  function animate() {
    requestAnimationFrame(animate);
    var now = Date.now();
    if (emitter) {
				emitter.update((now - elapsed) * 0.001);
      }

    elapsed = now;
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

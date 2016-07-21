const ValidKeys = require("./keycodes.js");
const Sounds = require("./sounds.js");
const anime = require('animejs');
const Howler = require("./howler.min.js");
const Track = require("./tracks.js");

const fireworks = (function(ctx, canvas) {
  let recording = false;
  let currentTrack = [];
  let currentSounds = [];
  let title;
  let typing = false;

  $("#start").click(function(e) {
    currentTrack = [];
    currentSounds = [];
    recording = true;
  });

  $("#stop").click(function(e) {
    recording = false;
  });

  $("#play").click(function(e) {
    Track.playTrack(currentTrack);
  });

  $("#track-title").focus(function() {
    typing = true;
  });

  $("#track-title").blur(function() {
    typing = false;
  });

  $("#save").click(function(e) {
    title = $("#track-title").val();
    Track.saveTrack(title, currentSounds);
    title = $("#track-title").val("");
  });

  let getFontSize = function() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  };

  let numberOfParticules = 30;
  let distance = 250;
  let animations = [];

  const setCanvasSize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const colors = ['#FF324A', '#581845', '#900C3F', '#FF5733'];

  const createCircle = function(x, y) {
    let p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.color = '#FFc300';
    p.radius = 0;
    p.alpha = 1;
    p.lineWidth = 6;
    p.draw = function() {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };
    return p;
  };

  const createParticule = function(x,y) {
    let p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(getFontSize(), getFontSize() * 2);
    p.draw = function() {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    };
    return p;
  };

  const createParticles = function(x,y) {
    let particules = [];
    for (let i = 0; i < numberOfParticules; i++) {
      let p = createParticule(x, y);
      particules.push(p);
    }
    return particules;
  };

  const removeAnimation = function(animation) {
    let index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
  };

  const animateParticules = function(x, y) {
    setCanvasSize();
    let particules = createParticles(x, y);
    let circle = createCircle(x, y);
    let circle2 = createCircle(x, y);
    let circle3 = createCircle(x, y);
    let particulesAnimation = anime({
      targets: particules,
      x: function(p) { return p.x + anime.random(-distance, distance); },
      y: function(p) { return p.y + anime.random(-distance, distance); },
      radius: 0,
      duration: function() { return anime.random(1200, 1800); },
      easing: 'easeOutExpo',
      complete: removeAnimation
    });
    let circleAnimation = anime({
      targets: circle,
      radius: function() { return anime.random(getFontSize() * 9, getFontSize() * 11); },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: function() { return anime.random(400, 600); }
      },
      duration: function() { return anime.random(1200, 1800); },
      easing: 'easeOutExpo',
      complete: removeAnimation
    });
    let circleAnimation2 = anime({
      targets: circle2,
      radius: function() { return anime.random(getFontSize() * 11, getFontSize() * 13); },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: function() { return anime.random(400, 600); }
      },
      duration: function() { return anime.random(1200, 1800); },
      easing: 'easeOutExpo',
      complete: removeAnimation
    });
    let circleAnimation3 = anime({
      targets: circle3,
      radius: function() { return anime.random(getFontSize() * 5, getFontSize() * 7); },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: function() { return anime.random(400, 600); }
      },
      duration: function() { return anime.random(1200, 1800); },
      easing: 'easeOutExpo',
      complete: removeAnimation
    });
    animations.push(particulesAnimation);
    animations.push(circleAnimation);
    animations.push(circleAnimation2);
    animations.push(circleAnimation3);
  };

  const mainLoop = anime({
    duration: Infinity,
    update: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach(function(anim) {
        anim.animatables.forEach(function(animatable) {
          animatable.target.draw();
        });
      });
    }
  });


  let x;
  let y;

  const updateCoords = function() {
    let xMin = 0;
    let xMax = window.innerWidth;
    x = Math.random() * (xMax - xMin) + xMin;

    let yMin = 0;
    let yMax = window.innerHeight;
    y = Math.random() * (yMax - yMin) + yMin;
  };


  $(document).keydown(function(e, fake) {

    let remove = function() {
      $('#text').removeClass('pulse');
    };

    let pulse = function() {
      $('#text').addClass('pulse');
      setTimeout(
        remove
        , 300);
    };

    if (fake) {
      updateCoords();
      animateParticules(x, y);
    } else {

      if (typing === false) {

      if (e.keyCode === undefined) {
        let pos = $("#note").offset();
        let b = pos.top + 35;
        let a = pos.left ;
        animateParticules(a, b);

      } else if ( ValidKeys.indexOf(e.keyCode) !== -1 ) {
        updateCoords();
        animateParticules(x, y);

        let howl = new Howl({
            urls: Sounds[e.keyCode]
        }).play();

        if (recording === true) {
          currentTrack.push(howl);
          currentSounds.push(Sounds[e.keyCode]);
        }

        pulse();

      }
    }}
  });

    window.addEventListener('resize', setCanvasSize, false);

  return {
    boom: animateParticules
  };

});


module.exports = fireworks;

const anime = require('animejs');
const Sounds = require("./sounds.js");

const start = function() {

  let title = document.getElementById("note");

  let textAnimationDown = anime ({
    targets: title,
    translateY: '0rem',
    duration: 500,
    loop: false,
    autoplay: false
  });

  let titleAnimationUp = anime ({
    targets: title,
    translateY: '-20rem',
    duration: 800,
    loop: false,
    easing: 'easeOutCirc',
    complete: textAnimationDown.play
  });

  let drop;

  let boom = function() {
    $(document).keydown();
    drop = new Howl({
        urls: Sounds[87]
    }).play();
  };

  let instructions = function() {
    $('#instructions').addClass('flipInX');
    $('#instructions').css('opacity', '1');
  };

  setTimeout(boom, 950);
  setTimeout(instructions, 1500);

};

module.exports = start;

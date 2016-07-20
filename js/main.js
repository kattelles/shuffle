const LogoStart = require("./logo.js");
const Animations = require("./animations");
const Track = require("./tracks");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  Animations(ctx, canvas);
  LogoStart();
  Track.fetchTracks();

  // menu
  $('#menuToggle, .menu-close').on('click', function(){
    $('#menuToggle').toggleClass('active');
    $('body').toggleClass('body-push-toleft');
    $('#theMenu').toggleClass('menu-open');
  });

});

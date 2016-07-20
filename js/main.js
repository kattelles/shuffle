const LogoStart = require("./logo.js");
const Animations = require("./animations");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  Animations(ctx, canvas);
  LogoStart();

});

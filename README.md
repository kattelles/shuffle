#shuffle

[live][shuffle]

[shuffle]: http://www.shufffle.space

shuffle is a dynamic music app created with Javascript, jQuery, HTML5/CSS3, anime.js and howler.js.

![image of splash](https://github.com/kattelles/shuffle/blob/master/pics/shuffle.png)

## Implementation

shuffle uses anime.js to create beautiful animations on key strokes.

```Javascript
const createParticle = function(x,y) {
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
```

![image of anime](https://github.com/kattelles/shuffle/blob/master/pics/anime.png)

## Future Plans

My future plans for this project include: pause and stop options for tracks the ability to loop tracks on top of one another.

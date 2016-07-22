#shuffle

[live][shuffle]

[shuffle]: http://www.shufffle.space

shuffle is a dynamic music app created with Javascript, jQuery, HTML5/CSS3, anime.js and howler.js.

![image of splash](https://github.com/kattelles/shuffle/blob/master/pics/shuffle.png)

## Implementation

shuffle uses anime.js to create beautiful animations with the keydown event.

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

Every keydown event also plays sounds with the help of howler.js.

```Javascript
let howl = new Howl({
    urls: Sounds[e.keyCode]
}).play();
```

A rails backend allows tracks to be saved, played back and deleted. The roll column stores an array of sounds.

```Ruby
create_table "tracks", force: :cascade do |t|
  t.string   "title", null: false
  t.datetime "created_at"
  t.datetime "updated_at"
  t.text     "roll", default: [], array: true
end
```

![image of tracks](https://github.com/kattelles/shuffle/blob/master/pics/tracks.png)

## Future Plans

My future plans for this project include: pause and stop options for tracks the ability to loop tracks on top of one another.

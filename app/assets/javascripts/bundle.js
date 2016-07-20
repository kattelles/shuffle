/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const LogoStart = __webpack_require__(1);
	const Animations = __webpack_require__(4);
	const Track = __webpack_require__(8);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const anime = __webpack_require__(2);
	const Sounds = __webpack_require__(3);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Anime v1.1.0
	 * http://anime-js.com
	 * JavaScript animation engine
	 * Copyright (c) 2016 Julian Garnier
	 * http://juliangarnier.com
	 * Released under the MIT license
	 */
	
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module === 'object' && module.exports) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.anime = factory();
	  }
	}(this, function () {
	
	  var version = '1.1.0';
	
	  // Defaults
	
	  var defaultSettings = {
	    duration: 1000,
	    delay: 0,
	    loop: false,
	    autoplay: true,
	    direction: 'normal',
	    easing: 'easeOutElastic',
	    elasticity: 400,
	    round: false,
	    begin: undefined,
	    update: undefined,
	    complete: undefined
	  }
	
	  // Transforms
	
	  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];
	  var transform, transformStr = 'transform';
	
	  // Utils
	
	  var is = (function() {
	    return {
	      array:  function(a) { return Array.isArray(a) },
	      object: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
	      svg:    function(a) { return a instanceof SVGElement },
	      dom:    function(a) { return a.nodeType || is.svg(a) },
	      number: function(a) { return !isNaN(parseInt(a)) },
	      string: function(a) { return typeof a === 'string' },
	      func:   function(a) { return typeof a === 'function' },
	      undef:  function(a) { return typeof a === 'undefined' },
	      null:   function(a) { return typeof a === 'null' },
	      hex:    function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
	      rgb:    function(a) { return /^rgb/.test(a) },
	      rgba:   function(a) { return /^rgba/.test(a) },
	      hsl:    function(a) { return /^hsl/.test(a) },
	      color:  function(a) { return (is.hex(a) || is.rgb(a) || is.rgba(a) || is.hsl(a))}
	    }
	  })();
	
	  // Easings functions adapted from http://jqueryui.com/
	
	  var easings = (function() {
	    var eases = {};
	    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
	    var functions = {
	      Sine: function(t) { return 1 - Math.cos( t * Math.PI / 2 ); },
	      Circ: function(t) { return 1 - Math.sqrt( 1 - t * t ); },
	      Elastic: function(t, m) {
	        if( t === 0 || t === 1 ) return t;
	        var p = (1 - Math.min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / ( 2 * Math.PI ) * Math.asin( 1 );
	        return -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
	      },
	      Back: function(t) { return t * t * ( 3 * t - 2 ); },
	      Bounce: function(t) {
	        var pow2, bounce = 4;
	        while ( t < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
	        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - t, 2 );
	      }
	    }
	    names.forEach(function(name, i) {
	      functions[name] = function(t) {
	        return Math.pow( t, i + 2 );
	      }
	    });
	    Object.keys(functions).forEach(function(name) {
	      var easeIn = functions[name];
	      eases['easeIn' + name] = easeIn;
	      eases['easeOut' + name] = function(t, m) { return 1 - easeIn(1 - t, m); };
	      eases['easeInOut' + name] = function(t, m) { return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2; };
	    });
	    eases.linear = function(t) { return t; };
	    return eases;
	  })();
	
	  // Strings
	
	  var numberToString = function(val) {
	    return (is.string(val)) ? val : val + '';
	  }
	
	  var stringToHyphens = function(str) {
	    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	  }
	
	  var selectString = function(str) {
	    if (is.color(str)) return false;
	    try {
	      var nodes = document.querySelectorAll(str);
	      return nodes;
	    } catch(e) {
	      return false;
	    }
	  }
	
	  // Numbers
	
	  var random = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
	
	  // Arrays
	
	  var flattenArray = function(arr) {
	    return arr.reduce(function(a, b) {
	      return a.concat(is.array(b) ? flattenArray(b) : b);
	    }, []);
	  }
	
	  var toArray = function(o) {
	    if (is.array(o)) return o;
	    if (is.string(o)) o = selectString(o) || o;
	    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
	    return [o];
	  }
	
	  var arrayContains = function(arr, val) {
	    return arr.some(function(a) { return a === val; });
	  }
	
	  var groupArrayByProps = function(arr, propsArr) {
	    var groups = {};
	    arr.forEach(function(o) {
	      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
	      groups[group] = groups[group] || [];
	      groups[group].push(o);
	    });
	    return Object.keys(groups).map(function(group) {
	      return groups[group];
	    });
	  }
	
	  var removeArrayDuplicates = function(arr) {
	    return arr.filter(function(item, pos, self) {
	      return self.indexOf(item) === pos;
	    });
	  }
	
	  // Objects
	
	  var cloneObject = function(o) {
	    var newObject = {};
	    for (var p in o) newObject[p] = o[p];
	    return newObject;
	  }
	
	  var mergeObjects = function(o1, o2) {
	    for (var p in o2) o1[p] = !is.undef(o1[p]) ? o1[p] : o2[p];
	    return o1;
	  }
	
	  // Colors
	
	  var hexToRgb = function(hex) {
	    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
	    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    var r = parseInt(rgb[1], 16);
	    var g = parseInt(rgb[2], 16);
	    var b = parseInt(rgb[3], 16);
	    return 'rgb(' + r + ',' + g + ',' + b + ')';
	  }
	
	  var hslToRgb = function(hsl) {
	    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
	    var h = parseInt(hsl[1]) / 360;
	    var s = parseInt(hsl[2]) / 100;
	    var l = parseInt(hsl[3]) / 100;
	    var hue2rgb = function(p, q, t) {
	      if (t < 0) t += 1;
	      if (t > 1) t -= 1;
	      if (t < 1/6) return p + (q - p) * 6 * t;
	      if (t < 1/2) return q;
	      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	      return p;
	    }
	    var r, g, b;
	    if (s == 0) {
	      r = g = b = l;
	    } else {
	      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      var p = 2 * l - q;
	      r = hue2rgb(p, q, h + 1/3);
	      g = hue2rgb(p, q, h);
	      b = hue2rgb(p, q, h - 1/3);
	    }
	    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
	  }
	
	  var colorToRgb = function(val) {
	    if (is.rgb(val) || is.rgba(val)) return val;
	    if (is.hex(val)) return hexToRgb(val);
	    if (is.hsl(val)) return hslToRgb(val);
	  }
	
	  // Units
	
	  var getUnit = function(val) {
	    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
	  }
	
	  var addDefaultTransformUnit = function(prop, val, intialVal) {
	    if (getUnit(val)) return val;
	    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
	    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
	    return val;
	  }
	
	  // Values
	
	  var getCSSValue = function(el, prop) {
	    // First check if prop is a valid CSS property
	    if (prop in el.style) {
	      // Then return the property value or fallback to '0' when getPropertyValue fails
	      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
	    }
	  }
	
	  var getTransformValue = function(el, prop) {
	    var defaultVal = prop.indexOf('scale') > -1 ? 1 : 0;
	    var str = el.style.transform;
	    if (!str) return defaultVal;
	    var rgx = /(\w+)\((.+?)\)/g;
	    var match = [];
	    var props = [];
	    var values = [];
	    while (match = rgx.exec(str)) {
	      props.push(match[1]);
	      values.push(match[2]);
	    }
	    var val = values.filter(function(f, i) { return props[i] === prop; });
	    return val.length ? val[0] : defaultVal;
	  }
	
	  var getAnimationType = function(el, prop) {
	    if ( is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
	    if ( is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
	    if ( is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
	    if (!is.null(el[prop]) && !is.undef(el[prop])) return 'object';
	  }
	
	  var getInitialTargetValue = function(target, prop) {
	    switch (getAnimationType(target, prop)) {
	      case 'transform': return getTransformValue(target, prop);
	      case 'css': return getCSSValue(target, prop);
	      case 'attribute': return target.getAttribute(prop);
	    }
	    return target[prop] || 0;
	  }
	
	  var getValidValue = function(values, val, originalCSS) {
	    if (is.color(val)) return colorToRgb(val);
	    if (getUnit(val)) return val;
	    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
	    if (!unit && originalCSS) unit = getUnit(originalCSS);
	    return unit ? val + unit : val;
	  }
	
	  var decomposeValue = function(val) {
	    var rgx = /-?\d*\.?\d+/g;
	    return {
	      original: val,
	      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
	      strings: numberToString(val).split(rgx)
	    }
	  }
	
	  var recomposeValue = function(numbers, strings, initialStrings) {
	    return strings.reduce(function(a, b, i) {
	      var b = (b ? b : initialStrings[i - 1]);
	      return a + numbers[i - 1] + b;
	    });
	  }
	
	  // Animatables
	
	  var getAnimatables = function(targets) {
	    var targets = targets ? (flattenArray(is.array(targets) ? targets.map(toArray) : toArray(targets))) : [];
	    return targets.map(function(t, i) {
	      return { target: t, id: i };
	    });
	  }
	
	  // Properties
	
	  var getProperties = function(params, settings) {
	    var props = [];
	    for (var p in params) {
	      if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
	        var prop = is.object(params[p]) ? cloneObject(params[p]) : {value: params[p]};
	        prop.name = p;
	        props.push(mergeObjects(prop, settings));
	      }
	    }
	    return props;
	  }
	
	  var getPropertiesValues = function(target, prop, value, i) {
	    var values = toArray( is.func(value) ? value(target, i) : value);
	    return {
	      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
	      to: (values.length > 1) ? values[1] : values[0]
	    }
	  }
	
	  // Tweens
	
	  var getTweenValues = function(prop, values, type, target) {
	    var valid = {};
	    if (type === 'transform') {
	      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
	      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
	    } else {
	      var originalCSS = (type === 'css') ? getCSSValue(target, prop) : undefined;
	      valid.from = getValidValue(values, values.from, originalCSS);
	      valid.to = getValidValue(values, values.to, originalCSS);
	    }
	    return { from: decomposeValue(valid.from), to: decomposeValue(valid.to) };
	  }
	
	  var getTweensProps = function(animatables, props) {
	    var tweensProps = [];
	    animatables.forEach(function(animatable, i) {
	      var target = animatable.target;
	      return props.forEach(function(prop) {
	        var animType = getAnimationType(target, prop.name);
	        if (animType) {
	          var values = getPropertiesValues(target, prop.name, prop.value, i);
	          var tween = cloneObject(prop);
	          tween.animatables = animatable;
	          tween.type = animType;
	          tween.from = getTweenValues(prop.name, values, tween.type, target).from;
	          tween.to = getTweenValues(prop.name, values, tween.type, target).to;
	          tween.round = (is.color(values.from) || tween.round) ? 1 : 0;
	          tween.delay = (is.func(tween.delay) ? tween.delay(target, i, animatables.length) : tween.delay) / animation.speed;
	          tween.duration = (is.func(tween.duration) ? tween.duration(target, i, animatables.length) : tween.duration) / animation.speed;
	          tweensProps.push(tween);
	        }
	      });
	    });
	    return tweensProps;
	  }
	
	  var getTweens = function(animatables, props) {
	    var tweensProps = getTweensProps(animatables, props);
	    var splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
	    return splittedProps.map(function(tweenProps) {
	      var tween = cloneObject(tweenProps[0]);
	      tween.animatables = tweenProps.map(function(p) { return p.animatables });
	      tween.totalDuration = tween.delay + tween.duration;
	      return tween;
	    });
	  }
	
	  var reverseTweens = function(anim, delays) {
	    anim.tweens.forEach(function(tween) {
	      var toVal = tween.to;
	      var fromVal = tween.from;
	      var delayVal = anim.duration - (tween.delay + tween.duration);
	      tween.from = toVal;
	      tween.to = fromVal;
	      if (delays) tween.delay = delayVal;
	    });
	    anim.reversed = anim.reversed ? false : true;
	  }
	
	  var getTweensDuration = function(tweens) {
	    if (tweens.length) return Math.max.apply(Math, tweens.map(function(tween){ return tween.totalDuration; }));
	  }
	
	  // will-change
	
	  var getWillChange = function(anim) {
	    var props = [];
	    var els = [];
	    anim.tweens.forEach(function(tween) {
	      if (tween.type === 'css' || tween.type === 'transform' ) {
	        props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
	        tween.animatables.forEach(function(animatable) { els.push(animatable.target); });
	      }
	    });
	    return {
	      properties: removeArrayDuplicates(props).join(', '),
	      elements: removeArrayDuplicates(els)
	    }
	  }
	
	  var setWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.willChange = willChange.properties;
	    });
	  }
	
	  var removeWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.removeProperty('will-change');
	    });
	  }
	
	  /* Svg path */
	
	  var getPathProps = function(path) {
	    var el = is.string(path) ? selectString(path)[0] : path;
	    return {
	      path: el,
	      value: el.getTotalLength()
	    }
	  }
	
	  var snapProgressToPath = function(tween, progress) {
	    var pathEl = tween.path;
	    var pathProgress = tween.value * progress;
	    var point = function(offset) {
	      var o = offset || 0;
	      var p = progress > 1 ? tween.value + o : pathProgress + o;
	      return pathEl.getPointAtLength(p);
	    }
	    var p = point();
	    var p0 = point(-1);
	    var p1 = point(+1);
	    switch (tween.name) {
	      case 'translateX': return p.x;
	      case 'translateY': return p.y;
	      case 'rotate': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
	    }
	  }
	
	  // Progress
	
	  var getTweenProgress = function(tween, time) {
	    var elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration);
	    var percent = elapsed / tween.duration;
	    var progress = tween.to.numbers.map(function(number, p) {
	      var start = tween.from.numbers[p];
	      var eased = easings[tween.easing](percent, tween.elasticity);
	      var val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
	      val = tween.round ? Math.round(val * tween.round) / tween.round : val;
	      return val;
	    });
	    return recomposeValue(progress, tween.to.strings, tween.from.strings);
	  }
	
	  var setAnimationProgress = function(anim, time) {
	    var transforms;
	    anim.currentTime = time;
	    anim.progress = (time / anim.duration) * 100;
	    for (var t = 0; t < anim.tweens.length; t++) {
	      var tween = anim.tweens[t];
	      tween.currentValue = getTweenProgress(tween, time);
	      var progress = tween.currentValue;
	      for (var a = 0; a < tween.animatables.length; a++) {
	        var animatable = tween.animatables[a];
	        var id = animatable.id;
	        var target = animatable.target;
	        var name = tween.name;
	        switch (tween.type) {
	          case 'css': target.style[name] = progress; break;
	          case 'attribute': target.setAttribute(name, progress); break;
	          case 'object': target[name] = progress; break;
	          case 'transform':
	          if (!transforms) transforms = {};
	          if (!transforms[id]) transforms[id] = [];
	          transforms[id].push(progress);
	          break;
	        }
	      }
	    }
	    if (transforms) {
	      if (!transform) transform = (getCSSValue(document.body, transformStr) ? '' : '-webkit-') + transformStr;
	      for (var t in transforms) {
	        anim.animatables[t].target.style[transform] = transforms[t].join(' ');
	      }
	    }
	    if (anim.settings.update) anim.settings.update(anim);
	  }
	
	  // Animation
	
	  var createAnimation = function(params) {
	    var anim = {};
	    anim.animatables = getAnimatables(params.targets);
	    anim.settings = mergeObjects(params, defaultSettings);
	    anim.properties = getProperties(params, anim.settings);
	    anim.tweens = getTweens(anim.animatables, anim.properties);
	    anim.duration = getTweensDuration(anim.tweens) || params.duration;
	    anim.currentTime = 0;
	    anim.progress = 0;
	    anim.ended = false;
	    return anim;
	  }
	
	  // Public
	
	  var animations = [];
	  var raf = 0;
	
	  var engine = (function() {
	    var play = function() { raf = requestAnimationFrame(step); };
	    var step = function(t) {
	      if (animations.length) {
	        for (var i = 0; i < animations.length; i++) animations[i].tick(t);
	        play();
	      } else {
	        cancelAnimationFrame(raf);
	        raf = 0;
	      }
	    }
	    return play;
	  })();
	
	  var animation = function(params) {
	
	    var anim = createAnimation(params);
	    var time = {};
	
	    anim.tick = function(now) {
	      anim.ended = false;
	      if (!time.start) time.start = now;
	      time.current = Math.min(Math.max(time.last + now - time.start, 0), anim.duration);
	      setAnimationProgress(anim, time.current);
	      var s = anim.settings;
	      if (s.begin && time.current >= s.delay) { s.begin(anim); s.begin = undefined; };
	      if (time.current >= anim.duration) {
	        if (s.loop) {
	          time.start = now;
	          if (s.direction === 'alternate') reverseTweens(anim, true);
	          if (is.number(s.loop)) s.loop--;
	        } else {
	          anim.ended = true;
	          anim.pause();
	          if (s.complete) s.complete(anim);
	        }
	        time.last = 0;
	      }
	    }
	
	    anim.seek = function(progress) {
	      setAnimationProgress(anim, (progress / 100) * anim.duration);
	    }
	
	    anim.pause = function() {
	      removeWillChange(anim);
	      var i = animations.indexOf(anim);
	      if (i > -1) animations.splice(i, 1);
	    }
	
	    anim.play = function(params) {
	      anim.pause();
	      if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
	      time.start = 0;
	      time.last = anim.ended ? 0 : anim.currentTime;
	      var s = anim.settings;
	      if (s.direction === 'reverse') reverseTweens(anim);
	      if (s.direction === 'alternate' && !s.loop) s.loop = 1;
	      setWillChange(anim);
	      animations.push(anim);
	      if (!raf) engine();
	    }
	
	    anim.restart = function() {
	      if (anim.reversed) reverseTweens(anim);
	      anim.pause();
	      anim.seek(0);
	      anim.play();
	    }
	
	    if (anim.settings.autoplay) anim.play();
	
	    return anim;
	
	  }
	
	  // Remove one or multiple targets from all active animations.
	
	  var remove = function(elements) {
	    var targets = flattenArray(is.array(elements) ? elements.map(toArray) : toArray(elements));
	    for (var i = animations.length-1; i >= 0; i--) {
	      var animation = animations[i];
	      var tweens = animation.tweens;
	      for (var t = tweens.length-1; t >= 0; t--) {
	        var animatables = tweens[t].animatables;
	        for (var a = animatables.length-1; a >= 0; a--) {
	          if (arrayContains(targets, animatables[a].target)) {
	            animatables.splice(a, 1);
	            if (!animatables.length) tweens.splice(t, 1);
	            if (!tweens.length) animation.pause();
	          }
	        }
	      }
	    }
	  }
	
	  animation.version = version;
	  animation.speed = 1;
	  animation.list = animations;
	  animation.remove = remove;
	  animation.easings = easings;
	  animation.getValue = getInitialTargetValue;
	  animation.path = getPathProps;
	  animation.random = random;
	
	  return animation;
	
	}));


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	    65: ['./sounds/tom-analog.wav'],
	    66: ['./sounds/snare-noise.wav'],
	    67: ['./sounds/tom-lofi.wav'],
	    68: ['./sounds/snare-pinch.wav'],
	    69: ['./sounds/snare-electro.wav'],
	    70: ['./sounds/tom-808.wav'],
	    71: ['./sounds/snare-modular.wav'],
	    72: ['./sounds/snare-electro.wav'],
	    73: ['./sounds/perc-808.wav'],
	    74: ['./sounds/openhat-808.wav'],
	    75: ['./sounds/kick-thump.wav'],
	    76: ['./sounds/kick-softy.wav'],
	    77: ['./sounds/kick-slapback.wav'],
	    78: ['./sounds/kick-oldschool.wav'],
	    79: ['./sounds/kick-cultivator.wav'],
	    80: ['./sounds/hihat-reso.wav'],
	    81: ['./sounds/tom-rototom.wav'],
	    82: ['./sounds/snare-brute.wav'],
	    83: ['./sounds/perc-laser.wav'],
	    84: ['./sounds/kick-thump.wav'],
	    85: ['./sounds/clap-slapper.wav'],
	    86: ['./sounds/ride-acoustic02.wav'],
	    87: ['./sounds/tom-fm.wav'],
	    88: ['./sounds/snare-vinyl01.wav'],
	    89: ['./sounds/kick-classic.wav'],
	    90: ['./sounds/kick-tron.wav']
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const ValidKeys = __webpack_require__(5);
	const Sounds = __webpack_require__(3);
	const anime = __webpack_require__(2);
	const Howler = __webpack_require__(6);
	const Track = __webpack_require__(8);
	
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
	
	
	  $(document).keydown(function(e) {
	    if (typing === false) {
	
	    let remove = function() {
	      $('#text').removeClass('pulse');
	    };
	
	    if (e.keyCode === undefined) {
	      let a = window.innerWidth/2 - 100;
	      let b = window.innerHeight/2 - 100;
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
	
	
	      $('#text').addClass('pulse');
	      setTimeout(remove, 300);
	    }
	  }
	  });
	
	    window.addEventListener('resize', setCanvasSize, false);
	
	  return {
	    boom: animateParticules
	  };
	
	});
	
	
	module.exports = fireworks;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = [
	    65, // a
	    66, // b
	    67, // c
	    68, // d
	    69, // e
	    70, // f
	    71, // g
	    72, // h
	    73, // i
	    74, // j
	    75, // k
	    76, // l
	    77, // m
	    78, // n
	    79, // o
	    80, // p
	    81, // q
	    82, // r
	    83, // s
	    84, // t
	    85, // u
	    86, // v
	    87, // w
	    88, // x
	    89, // y
	    90 // z
	];


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 *  howler.js v1.1.29
	 *  howlerjs.com
	 *
	 *  (c) 2013-2016, James Simpson of GoldFire Studios
	 *  goldfirestudios.com
	 *
	 *  MIT License
	 */
	!function(){var e={},o=null,n=!0,r=!1;try{"undefined"!=typeof AudioContext?o=new AudioContext:"undefined"!=typeof webkitAudioContext?o=new webkitAudioContext:n=!1}catch(t){n=!1}if(!n)if("undefined"!=typeof Audio)try{new Audio}catch(t){r=!0}else r=!0;if(n){var a="undefined"==typeof o.createGain?o.createGainNode():o.createGain();a.gain.value=1,a.connect(o.destination)}var i=function(e){this._volume=1,this._muted=!1,this.usingWebAudio=n,this.ctx=o,this.noAudio=r,this._howls=[],this._codecs=e,this.iOSAutoEnable=!0};i.prototype={volume:function(e){var o=this;if(e=parseFloat(e),e>=0&&1>=e){o._volume=e,n&&(a.gain.value=e);for(var r in o._howls)if(o._howls.hasOwnProperty(r)&&o._howls[r]._webAudio===!1)for(var t=0;t<o._howls[r]._audioNode.length;t++)o._howls[r]._audioNode[t].volume=o._howls[r]._volume*o._volume;return o}return n?a.gain.value:o._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(e){var o=this;o._muted=e,n&&(a.gain.value=e?0:o._volume);for(var r in o._howls)if(o._howls.hasOwnProperty(r)&&o._howls[r]._webAudio===!1)for(var t=0;t<o._howls[r]._audioNode.length;t++)o._howls[r]._audioNode[t].muted=e},codecs:function(e){return this._codecs[e]},_enableiOSAudio:function(){var e=this;if(!o||!e._iOSEnabled&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){e._iOSEnabled=!1;var n=function(){var r=o.createBuffer(1,1,22050),t=o.createBufferSource();t.buffer=r,t.connect(o.destination),"undefined"==typeof t.start?t.noteOn(0):t.start(0),setTimeout(function(){(t.playbackState===t.PLAYING_STATE||t.playbackState===t.FINISHED_STATE)&&(e._iOSEnabled=!0,e.iOSAutoEnable=!1,window.removeEventListener("touchend",n,!1))},0)};return window.addEventListener("touchend",n,!1),e}}};var u=null,d={};r||(u=new Audio,d={mp3:!!u.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!u.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(u.canPlayType("audio/x-mp4;")||u.canPlayType("audio/mp4;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")});var l=new i(d),f=function(e){var r=this;r._autoplay=e.autoplay||!1,r._buffer=e.buffer||!1,r._duration=e.duration||0,r._format=e.format||null,r._loop=e.loop||!1,r._loaded=!1,r._sprite=e.sprite||{},r._src=e.src||"",r._pos3d=e.pos3d||[0,0,-.5],r._volume=void 0!==e.volume?e.volume:1,r._urls=e.urls||[],r._rate=e.rate||1,r._model=e.model||null,r._onload=[e.onload||function(){}],r._onloaderror=[e.onloaderror||function(){}],r._onend=[e.onend||function(){}],r._onpause=[e.onpause||function(){}],r._onplay=[e.onplay||function(){}],r._onendTimer=[],r._webAudio=n&&!r._buffer,r._audioNode=[],r._webAudio&&r._setupAudioNode(),"undefined"!=typeof o&&o&&l.iOSAutoEnable&&l._enableiOSAudio(),l._howls.push(r),r.load()};if(f.prototype={load:function(){var e=this,o=null;if(r)return void e.on("loaderror",new Error("No audio support."));for(var n=0;n<e._urls.length;n++){var t,a;if(e._format)t=e._format;else{if(a=e._urls[n],t=/^data:audio\/([^;,]+);/i.exec(a),t||(t=/\.([^.]+)$/.exec(a.split("?",1)[0])),!t)return void e.on("loaderror",new Error("Could not extract format from passed URLs, please add format parameter."));t=t[1].toLowerCase()}if(d[t]){o=e._urls[n];break}}if(!o)return void e.on("loaderror",new Error("No codec support for selected audio sources."));if(e._src=o,e._webAudio)s(e,o);else{var u=new Audio;u.addEventListener("error",function(){u.error&&4===u.error.code&&(i.noAudio=!0),e.on("loaderror",{type:u.error?u.error.code:0})},!1),e._audioNode.push(u),u.src=o,u._pos=0,u.preload="auto",u.volume=l._muted?0:e._volume*l.volume();var f=function(){e._duration=Math.ceil(10*u.duration)/10,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play(),u.removeEventListener("canplaythrough",f,!1)};u.addEventListener("canplaythrough",f,!1),u.load()}return e},urls:function(e){var o=this;return e?(o.stop(),o._urls="string"==typeof e?[e]:e,o._loaded=!1,o.load(),o):o._urls},play:function(e,n){var r=this;return"function"==typeof e&&(n=e),e&&"function"!=typeof e||(e="_default"),r._loaded?r._sprite[e]?(r._inactiveNode(function(t){t._sprite=e;var a=t._pos>0?t._pos:r._sprite[e][0]/1e3,i=0;r._webAudio?(i=r._sprite[e][1]/1e3-t._pos,t._pos>0&&(a=r._sprite[e][0]/1e3+a)):i=r._sprite[e][1]/1e3-(a-r._sprite[e][0]/1e3);var u,d=!(!r._loop&&!r._sprite[e][2]),f="string"==typeof n?n:Math.round(Date.now()*Math.random())+"";if(function(){var o={id:f,sprite:e,loop:d};u=setTimeout(function(){!r._webAudio&&d&&r.stop(o.id).play(e,o.id),r._webAudio&&!d&&(r._nodeById(o.id).paused=!0,r._nodeById(o.id)._pos=0,r._clearEndTimer(o.id)),r._webAudio||d||r.stop(o.id),r.on("end",f)},i/r._rate*1e3),r._onendTimer.push({timer:u,id:o.id})}(),r._webAudio){var s=r._sprite[e][0]/1e3,_=r._sprite[e][1]/1e3;t.id=f,t.paused=!1,p(r,[d,s,_],f),r._playStart=o.currentTime,t.gain.value=r._volume,"undefined"==typeof t.bufferSource.start?d?t.bufferSource.noteGrainOn(0,a,86400):t.bufferSource.noteGrainOn(0,a,i):d?t.bufferSource.start(0,a,86400):t.bufferSource.start(0,a,i)}else{if(4!==t.readyState&&(t.readyState||!navigator.isCocoonJS))return r._clearEndTimer(f),function(){var o=r,a=e,i=n,u=t,d=function(){o.play(a,i),u.removeEventListener("canplaythrough",d,!1)};u.addEventListener("canplaythrough",d,!1)}(),r;t.readyState=4,t.id=f,t.currentTime=a,t.muted=l._muted||t.muted,t.volume=r._volume*l.volume(),setTimeout(function(){t.play()},0)}return r.on("play"),"function"==typeof n&&n(f),r}),r):("function"==typeof n&&n(),r):(r.on("load",function(){r.play(e,n)}),r)},pause:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.pause(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=o.pos(null,e),o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else n.pause();return o.on("pause"),o},stop:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.stop(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=0,o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else isNaN(n.duration)||(n.pause(),n.currentTime=0);return o},mute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.mute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=0:n.muted=!0),o},unmute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.unmute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=o._volume:n.muted=!1),o},volume:function(e,o){var n=this;if(e=parseFloat(e),e>=0&&1>=e){if(n._volume=e,!n._loaded)return n.on("play",function(){n.volume(e,o)}),n;var r=o?n._nodeById(o):n._activeNode();return r&&(n._webAudio?r.gain.value=e:r.volume=e*l.volume()),n}return n._volume},loop:function(e){var o=this;return"boolean"==typeof e?(o._loop=e,o):o._loop},sprite:function(e){var o=this;return"object"==typeof e?(o._sprite=e,o):o._sprite},pos:function(e,n){var r=this;if(!r._loaded)return r.on("load",function(){r.pos(e)}),"number"==typeof e?r:r._pos||0;e=parseFloat(e);var t=n?r._nodeById(n):r._activeNode();if(t)return e>=0?(r.pause(n),t._pos=e,r.play(t._sprite,n),r):r._webAudio?t._pos+(o.currentTime-r._playStart):t.currentTime;if(e>=0)return r;for(var a=0;a<r._audioNode.length;a++)if(r._audioNode[a].paused&&4===r._audioNode[a].readyState)return r._webAudio?r._audioNode[a]._pos:r._audioNode[a].currentTime},pos3d:function(e,o,n,r){var t=this;if(o="undefined"!=typeof o&&o?o:0,n="undefined"!=typeof n&&n?n:-.5,!t._loaded)return t.on("play",function(){t.pos3d(e,o,n,r)}),t;if(!(e>=0||0>e))return t._pos3d;if(t._webAudio){var a=r?t._nodeById(r):t._activeNode();a&&(t._pos3d=[e,o,n],a.panner.setPosition(e,o,n),a.panner.panningModel=t._model||"HRTF")}return t},fade:function(e,o,n,r,t){var a=this,i=Math.abs(e-o),u=e>o?"down":"up",d=i/.01,l=n/d;if(!a._loaded)return a.on("load",function(){a.fade(e,o,n,r,t)}),a;a.volume(e,t);for(var f=1;d>=f;f++)!function(){var e=a._volume+("up"===u?.01:-.01)*f,n=Math.round(1e3*e)/1e3,i=o;setTimeout(function(){a.volume(n,t),n===i&&r&&r()},l*f)}()},fadeIn:function(e,o,n){return this.volume(0).play().fade(0,e,o,n)},fadeOut:function(e,o,n,r){var t=this;return t.fade(t._volume,e,o,function(){n&&n(),t.pause(r),t.on("end")},r)},_nodeById:function(e){for(var o=this,n=o._audioNode[0],r=0;r<o._audioNode.length;r++)if(o._audioNode[r].id===e){n=o._audioNode[r];break}return n},_activeNode:function(){for(var e=this,o=null,n=0;n<e._audioNode.length;n++)if(!e._audioNode[n].paused){o=e._audioNode[n];break}return e._drainPool(),o},_inactiveNode:function(e){for(var o=this,n=null,r=0;r<o._audioNode.length;r++)if(o._audioNode[r].paused&&4===o._audioNode[r].readyState){e(o._audioNode[r]),n=!0;break}if(o._drainPool(),!n){var t;if(o._webAudio)t=o._setupAudioNode(),e(t);else{o.load(),t=o._audioNode[o._audioNode.length-1];var a=navigator.isCocoonJS?"canplaythrough":"loadedmetadata",i=function(){t.removeEventListener(a,i,!1),e(t)};t.addEventListener(a,i,!1)}}},_drainPool:function(){var e,o=this,n=0;for(e=0;e<o._audioNode.length;e++)o._audioNode[e].paused&&n++;for(e=o._audioNode.length-1;e>=0&&!(5>=n);e--)o._audioNode[e].paused&&(o._webAudio&&o._audioNode[e].disconnect(0),n--,o._audioNode.splice(e,1))},_clearEndTimer:function(e){for(var o=this,n=-1,r=0;r<o._onendTimer.length;r++)if(o._onendTimer[r].id===e){n=r;break}var t=o._onendTimer[n];t&&(clearTimeout(t.timer),o._onendTimer.splice(n,1))},_setupAudioNode:function(){var e=this,n=e._audioNode,r=e._audioNode.length;return n[r]="undefined"==typeof o.createGain?o.createGainNode():o.createGain(),n[r].gain.value=e._volume,n[r].paused=!0,n[r]._pos=0,n[r].readyState=4,n[r].connect(a),n[r].panner=o.createPanner(),n[r].panner.panningModel=e._model||"equalpower",n[r].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),n[r].panner.connect(n[r]),n[r]},on:function(e,o){var n=this,r=n["_on"+e];if("function"==typeof o)r.push(o);else for(var t=0;t<r.length;t++)o?r[t].call(n,o):r[t].call(n);return n},off:function(e,o){var n=this,r=n["_on"+e];if(o){for(var t=0;t<r.length;t++)if(o===r[t]){r.splice(t,1);break}}else n["_on"+e]=[];return n},unload:function(){for(var o=this,n=o._audioNode,r=0;r<o._audioNode.length;r++)n[r].paused||(o.stop(n[r].id),o.on("end",n[r].id)),o._webAudio?n[r].disconnect(0):n[r].src="";for(r=0;r<o._onendTimer.length;r++)clearTimeout(o._onendTimer[r].timer);var t=l._howls.indexOf(o);null!==t&&t>=0&&l._howls.splice(t,1),delete e[o._src],o=null}},n)var s=function(o,n){if(n in e)return o._duration=e[n].duration,void c(o);if(/^data:[^;]+;base64,/.test(n)){for(var r=atob(n.split(",")[1]),t=new Uint8Array(r.length),a=0;a<r.length;++a)t[a]=r.charCodeAt(a);_(t.buffer,o,n)}else{var i=new XMLHttpRequest;i.open("GET",n,!0),i.responseType="arraybuffer",i.onload=function(){_(i.response,o,n)},i.onerror=function(){o._webAudio&&(o._buffer=!0,o._webAudio=!1,o._audioNode=[],delete o._gainNode,delete e[n],o.load())};try{i.send()}catch(u){i.onerror()}}},_=function(n,r,t){o.decodeAudioData(n,function(o){o&&(e[t]=o,c(r,o))},function(e){r.on("loaderror",e)})},c=function(e,o){e._duration=o?o.duration:e._duration,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},p=function(n,r,t){var a=n._nodeById(t);a.bufferSource=o.createBufferSource(),a.bufferSource.buffer=e[n._src],a.bufferSource.connect(a.panner),a.bufferSource.loop=r[0],r[0]&&(a.bufferSource.loopStart=r[1],a.bufferSource.loopEnd=r[1]+r[2]),a.bufferSource.playbackRate.value=n._rate};"function"=="function"&&__webpack_require__(7)&&!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return{Howler:l,Howl:f}}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),"undefined"!=typeof exports&&(exports.Howler=l,exports.Howl=f),"undefined"!=typeof window&&(window.Howler=l,window.Howl=f)}();


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Animations = __webpack_require__(4);
	const Howler = __webpack_require__(6);
	
	let trackList = {};
	
	let createTrack = function(track) {
	  trackList[track.id] = track;
	    $("#track-list").append(
	      "<div>" + track.title + " "
	        + "<i class='fa fa-trash-o' id=" + track.id + " aria-hidden='true'></i>"
	        +  "<i class='fa fa-play' id=" + track.id + " aria-hidden='true'></i>"
	        + "</div>");
	
	    $("#" + track.id).click(function(e) {
	      let roll = trackList[track.id].roll;
	      let howls = [];
	      roll.forEach(sound => {
	        let howl = new Howl({
	            urls: sound
	        });
	        howls.push(howl);
	      });
	      playArr(howls);
	  });
	};
	
	let receiveTracks = function(tracks) {
	    tracks.forEach(track => {
	      createTrack(track);
	    });
	};
	
	let recieveOneTrack = function(track) {
	  createTrack(track);
	};
	
	let playArr = function(arr) {
	  if (arr.length === 1) {
	    setTimeout(function() {
	      arr[0].play();
	      }, 300);
	    return;
	  }
	
	  setTimeout(function() {
	    arr[0].play();
	    return playArr(arr.slice(1));
	  }, 300);
	};
	
	const Track = {
	
	  playTrack: function(arr) {
	    playArr(arr);
	  },
	
	  fetchTracks() {
	    $.ajax({
	      url: '/api/tracks',
	      method: 'GET',
	      success(tracks) {
	        receiveTracks(tracks);
	      },
	      error() {
	        console.log("error");
	      },
	      beforeSend(xhr) {xhr.setRequestHeader('X-CSRF-Token',
	        $('meta[name="csrf-token"]').attr('content'));}
	    });
	  },
	
	  saveTrack: function(title, roll) {
	    $.ajax({
	      url: '/api/tracks',
	      method: 'POST',
	      data: JSON.stringify({title: title, roll: roll}),
	      // dataType: JSON,
	      contentType: 'application/json',
	      success(savedTrack) {
	        recieveOneTrack(savedTrack);
	      },
	      error() {
	        console.log("error");
	      },
	      beforeSend(xhr) {xhr.setRequestHeader('X-CSRF-Token',
	        $('meta[name="csrf-token"]').attr('content'));}
	    });
	  }
	
	};
	
	module.exports = Track;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
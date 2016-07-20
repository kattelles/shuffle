const Animations = require("./animations");

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

  saveTrack: function(title, arr) {
    $.ajax({
      url: '/api/tracks',
      method: 'POST',
      data: JSON.stringify({ roll: arr, title: title }),
      dataType: 'json',
      contentType: "application/json",
      beforeSend(xhr) {xhr.setRequestHeader('X-CSRF-Token',
        $('meta[name="csrf-token"]').attr('content'));},
      success(track) {
        console.log("success");
        console.log(track);
      }
    });
  }

};

module.exports = Track;

const Animations = require("./animations");
const Howler = require("./howler.min.js");

let trackList = {};

let simulateBoom = function() {
  $(document).trigger("keydown", ["true"]);
};

let createTrack = function(track) {
  trackList[track.id] = track;
    $("#track-list").append(
      "<div id='main" + track.id + "'>" + track.title + " "
        + "<i class='fa fa-trash-o' id=" + track.id + " aria-hidden='true'></i>"
        +  "<i class='fa fa-play' id=" + track.id + " aria-hidden='true'></i>"
        + "</div>");

    $(".fa-play").click(function(e) {
      let roll = trackList[e.currentTarget.id].roll;
      let howls = [];
      roll.forEach(sound => {
        let howl = new Howl({
            urls: sound
        });
        howls.push(howl);
      });
      playArr(howls);
  });

  $(".fa-trash-o").click(function(e) {
      Track.deleteTrack(e.currentTarget.id);
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
      simulateBoom();
      arr[0].play();
      }, 300);
    return;
  }

  setTimeout(function() {
    simulateBoom();
    arr[0].play();
    return playArr(arr.slice(1));
  }, 300);
};



const Track = {

  playTrack: function(arr) {
    playArr(arr);
  },

  deleteTrack: function(id) {
    $.ajax({
      url: '/api/tracks/' + id,
      method: 'DELETE',
      success(track) {
        // debugger
        $("#main" + track.id).remove();
      },
      beforeSend(xhr) {xhr.setRequestHeader('X-CSRF-Token',
        $('meta[name="csrf-token"]').attr('content'));}

    });
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

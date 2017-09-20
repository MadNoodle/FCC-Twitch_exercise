var twitchUsers = [
  'ESL_SC2',
  'ESL_CSGO',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
  'pink_sparkles',
  'comster404',
  'brunofin',
  'medrybw',
  'monstercat',
  'aces_tv',
  'loserfruit',
  'behkuhtv',
  'fakename',
  'food'
];

var url = 'https://wind-bow.gomix.me/twitch-api/streams/';

var callback = '?callback=?';

var userData = [];

//creation des url
// param : streamers Id

function fetchData() {
  userData = [];

  twitchUsers.forEach(function(user) {
    var URL = url + user;
    $.ajax({
      type: 'GET',
      url: URL,
      dataType: 'jsonp',
      headers: {
        'Client-ID': '9rmhc1p6ac2vtxwwa6k67sksr7htlc'
      },

      success: function(data) {
        var output = '';
        var status = ';'
        console.log(data);
        if (data.stream == null) {
          status = 'OFFLINE';
          output = '<div id="card" class=" offline center-xs center-sm center-md center-lg col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="item"><img src="https://www.twitch.tv/p/assets/uploads/combologo_474x356.png" width="320" height="180" class="article-image img-responsive" ></img>';
          output += '<section class="article-body"><h2 class="article-heading ">' + user + '</h2>';

          output += '<div class="article-status"><a href="https://www.twitch.tv/' + user + '">' + status + '</a></div>';
          $('#result').append(output);
        } else if (data.stream == 'undefined') {
          status = 'USER DELETED'
          console.log(status);
        } else {

          status = 'LIVE';
          output = '<div id="card" class="online center-xs center-sm center-md center-lg col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="item"><img src="' + data.stream.preview.medium + '" class="article-image img-responsive" ></img>';

          output += '<section class="article-body"><h2 class="article-heading ">' + data.stream.channel.display_name + '</h2>';
          output += '<div class="article-game">' + data.stream.channel.game + '</div>';
          output += '<p class="article-tags">' + data.stream.channel.status + '</p>';
          output += '<div class="article-status" ></i><a href="https://www.twitch.tv/' + user + '"><i class="fa fa-rss" ></i>' + status + '</a></div>';
          output += '<a href="' + data.stream._links.self + '"></section></div></div>';
          $('#result').append(output);

          // console.log(data.stream.channel.display_name);
          // console.log(data.stream.game);
          // console.log(data.stream.channel.status);
          console.log(data.stream.preview.medium);
          // console.log(data.stream._links.self);
        }


      }
    });

  });


};

$(document).ready(function() {

  fetchData();
  $('#button').on('click', function(){
      $('#result').removeClass('offline');

  })

});

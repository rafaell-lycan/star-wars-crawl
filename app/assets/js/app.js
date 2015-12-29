;(function() {
  // Trigger Covers

  // Select History

  // Play Music

  var animation = $('.animation');
  var movies = $('.movies');
  var audio = document.querySelector('audio');
  var moviesList = $('.movie-list');
  var jsonData = {};

  moviesList.on('click', '.cover', function(e) {
    var movie = $(this).find('span');
    loadIntro(movie.text());
  });

  function loadJsonData() {
    $.get('./intro.json')
      .then(function(data) {
        jsonData = data;
      });
  }

  function loadIntro(intro) {
    intro = intro.replace(' ', '-');
    var crawl = jsonData[intro];

    animation.find('.episode').text(crawl.episode);
    animation.find('.title').text(crawl.title);
    animation.find('p').remove();

    var history = crawl.history.map(function(p) {
      return '<p>' + p + '</p>';
    });

    animation.find('.history').append(history);

    start();
  }

  function start() {
    movies.toggleClass('hidden');
    animation.toggleClass('hidden');
    audio.play();
  }

  function pause() {
    animation.toggleClass('paused');
    audio.pause();
  }

  function play() {
    animation.toggleClass('paused');
    audio.play();
  }

  loadJsonData();
})();

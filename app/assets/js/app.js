;(function() {
  // Trigger Covers

  // Select History

  // Play Music

  var animation = $('.animation');
  var movies = $('.movies');
  var audio = document.querySelector('audio');
  var moviesList = $('.movie-list');
  var controllers = $('.controllers');
  var jsonData = {};

  moviesList.on('click', '.cover', function(e) {
    var movie = $(this).find('span');
    loadIntro(movie.text());
  });

  controllers.on('click', 'i', function(e) {
    if ($(this).hasClass('play')) {
      toggleAnimation();
      controllers.find('.play').toggleClass('hidden');
    }

    if ($(this).hasClass('home')) {
      changeView();
      controllers.find('.play').toggleClass('hidden');
    }

    if ($(this).hasClass('reset')) {
      // Reset Animation
    }

  });

  audio.addEventListener('ended', changeView);

  function loadJsonData(callback) {
    $.get('./intro.json')
      .then(function(data) {
        jsonData = data;
        if (callback) callback();
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

    changeView();

    audio.play();
  }

  function init() {
    loadJsonData(function() {
      movies.toggleClass('hidden');
    });
  }

  function changeView() {
    movies.toggleClass('hidden');
    animation.toggleClass('hidden');
    audio.pause();
    audio.currentTime = 0;
  }

  function toggleAnimation() {
    if (!audio.paused) return pause();
    play();
  }

  function pause() {
    animation.toggleClass('paused');
    audio.pause();
  }

  function play() {
    animation.toggleClass('paused');
    audio.play();
  }

  init();
})();

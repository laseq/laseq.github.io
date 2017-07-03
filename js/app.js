$(document).ready(function() {
  console.log('Loaded');

  const navbarHeight = $('#myNavbar').height();
  console.log('navbarHeight:', navbarHeight);

  calculatePortfolioCardHeight();

  $(window).resize(function() {
    calculatePortfolioCardHeight();
  });

  // Setting the height of the portfolio card so that
  // it doesn't change dynamically when clicking on different projects
  function calculatePortfolioCardHeight() {
    const projectHeights = [];
    projectHeights[0] = $('#project1').height();
    projectHeights[1] = $('#project2').height();
    projectHeights[2] = $('#project3').height();
    projectHeights[3] = $('#project4').height();
    for (let i=0; i<4; i++) {
      console.log(`projectHeights[${i}]:`, projectHeights[i]);
    }
    const biggestHeight = Math.max(...projectHeights);

    var portfolioCardHeight = $('#portfolioNavTabs').height() + biggestHeight;
    console.log('biggestHeight:', biggestHeight);
    console.log('portfolioCardHeight:', portfolioCardHeight);
    $('#portfolioCard').height(portfolioCardHeight);
  }

  $('body').scrollspy({
    target: '#myNavbar',
    offset: navbarHeight+5
  });

  // Code for smooth scrolling to section
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href="#project1"]')
  .not('[href="#project2"]')
  .not('[href="#project3"]')
  .not('[href="#project4"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
      &&
      location.hostname === this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - navbarHeight
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(':focus')) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });

  // Calling the function after a few seconds because the portfolio size
  // gets messed up on Safari otherwise
  setTimeout( function(){
    calculatePortfolioCardHeight();
  }, 3000 );

});

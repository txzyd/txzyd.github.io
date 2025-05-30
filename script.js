$(document).ready(function() {
  // Preload all GIFs and store their URLs
  const gifUrls = [];
  $('img[data-alt]').each(function() {
    const gifUrl = $(this).data('alt');
    gifUrls.push(gifUrl);
    new Image().src = gifUrl; // Preload
  });

  // Handle click: Play GIF once, then revert
  $(document).on('click', 'figure', function() {
    const $figure = $(this);
    const $img = $figure.find('img');
    const staticSrc = $img.attr('src');
    const gifSrc = $img.data('alt');

    // If already showing GIF, ignore click (prevent restart)
    if ($img.hasClass('is-playing')) return;

    // Switch to GIF
    $img.attr('src', gifSrc).addClass('is-playing');

    // Revert to static image after GIF ends (if known duration)
    // Option 1: Use a fixed delay (e.g., 3 seconds)
    setTimeout(() => {
      $img.attr('src', staticSrc).removeClass('is-playing');
    }, 500); // Adjust time to match your GIF length

    // Option 2 (Advanced): Use GIF.js or a library to detect GIF end
    // See notes below for this approach.
  });
});

$('img').on('dragstart', function(event) { event.preventDefault(); });
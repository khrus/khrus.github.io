$(function() {

  $(window).on('load', function() {

    var imgContainers = $('.uniform');

    imgContainers.each(function(i, container) {

      var images = $(container).find('img'),
          ratiosArr = [],
          count = 0;

      images.each(function(j, img) {
        var ratio = (img.naturalWidth / img.naturalHeight);
        ratiosArr.push(ratio);
        count += ratio;
      });
      images.each(function(j, img) {
        var width = (ratiosArr[j]*100 / count).toFixed(3);
        if (width == 0) $(img).remove();
        $(img).parent().innerWidth(width +'%');
      });
    });
  });
});
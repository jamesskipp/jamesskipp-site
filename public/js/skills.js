
$(document).ready(() => {

  // Toggle for javascript content
  $('#js-button').click(() => {
    $('#js-div').toggle();
    toggleClass('#js-button div span', 'glyphicon-triangle-bottom'
      , 'glyphicon-triangle-top');
    toggleClass('#js-button', 'group-button-inactive', 'group-button-active');
  });

  // Toggle for java content
  $('#java-button').click(() => {
    $('#java-div').toggle();
    toggleClass('#java-button div span', 'glyphicon-triangle-bottom'
      , 'glyphicon-triangle-top');
    toggleClass('#java-button', 'group-button-inactive', 'group-button-active');
  });

  // Toggle for HTML5 / CSS3 Content
  $('#web-button').click(() => {
    $('#web-div').toggle();
    toggleClass('#web-button div span', 'glyphicon-triangle-bottom'
      , 'glyphicon-triangle-top');
    toggleClass('#web-button', 'group-button-inactive', 'group-button-active');
  });
});

var toggleClass = (identifier, removeClass, addClass) => {
  if ($(identifier).hasClass(removeClass)) {
    $(identifier)
      .removeClass(removeClass)
      .addClass(addClass);
  } else {
    $(identifier)
      .removeClass(addClass)
      .addClass(removeClass);
  }
}

var toggleCSS = (identifier, property, removeCSS, addCSS) => {
  if ($(identifier).css(property) == removeCSS) {
    $(identifier).css(property, addCSS);
  } else {
    $(identifier).css(property, removeCSS);
  }
}

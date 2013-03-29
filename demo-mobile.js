var examples = {};

examples['simple'] = function() {
  $('#sphere').earth3d({
    dragElement: $('#locations') // where do we catch the mouse drag
  });
};

function selectExample(example) {
  var $sphere = $('#sphere');
  $sphere.replaceWith($('<canvas id="sphere"></canvas>').attr({
    width: $sphere.width(),
    height: $sphere.height()
  }));
  $('.location').remove();
  $('.flight').remove();
  $('#flights')[0].getContext('2d').clearRect(0, 0, 100, 100);

  examples[example]();
}


$(document).ready(function() {
  selectExample('simple');

  $('#example').change(function() {
    selectExample($(this).val());
  });
});

function addPath() {
  $('#sphere').earth3d('changePaths', {path2: {
    origin: 'obj1',
    destination: 'obj3'
  }});
}

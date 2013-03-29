var examples = {};

examples['simple'] = function() {
  $('#sphere').earth3d({
    dragElement: $('#locations') // where do we catch the mouse drag
  });
};

function selectExample(example) {
  var $sphere = $('#sphere');
  $sphere.earth3d('destroy');
  $sphere.replaceWith($('<canvas id="sphere"></canvas>').attr({
    width: $sphere.width(),
    height: $sphere.height()
  }));
  $('.location').remove();
  $('.flight').remove();
  $('#flights')[0].getContext('2d').clearRect(0, 0, 100, 100);
  if (example == 'simple_mars') {
    $('#glow-shadows').removeClass('earth').addClass('mars');
  } else {
    $('#glow-shadows').removeClass('mars').addClass('earth');
  }
  var code = examples[example].toString();
  code = code.substring(14);
  code = code.substring(0, code.length - 2);
  var lines = code.split("\n");
  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].substring(2);
  }
  code = lines.join("\n");
  $('#example_code').val(code);

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

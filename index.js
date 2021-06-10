var text = "TESTING";

function colorText(color, text) {
  return `<b style='color:${color}'>${text}</b>`;
}

var endText = '';
var flipper = 0;
for(var i = 0; i < text.length; i++) {
  if(text[i] === ' ') {
    endText += ' ';
    continue;
  }
  var color;
  if(flipper % 3 === 0) {
      color = '#D00070';
  } else if (flipper % 3 === 1) {
      color = '#8C4799';
  } else {
      color = '#0032A0';
  }
  endText += colorText(color, text[i]);
  flipper++;
}

console.log(endText);
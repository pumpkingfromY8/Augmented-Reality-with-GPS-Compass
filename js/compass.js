window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
  // Get the device's compass direction (in degrees)
  var compassDirection = event.alpha;
  
  // Do something with the compass direction, such as updating a compass UI element
  updateCompass(compassDirection);
}

function updateCompass(direction) {
var compassElement = document.getElementById('compass');
compassElement.style.transform = 'rotate(' + direction + 'deg)';

// Add arrows for indicating cardinal directions
var arrows = document.querySelectorAll('.arrow');
arrows.forEach(function(arrow) {
var arrowRotation;
switch (arrow.classList[1]) {
  case 'north':
    arrowRotation = 180;
    break;
  case 'east':
    arrowRotation = 270;
    break;
  case 'south':
    arrowRotation = 0;
    break;
  case 'west':
    arrowRotation = 90;
    break;
}
var arrowRotationAdjusted = direction - arrowRotation; // Adjust arrow rotation in reverse
// arrow.style.transform = 'rotate(' + arrowRotationAdjusted + 'deg)';
});
}
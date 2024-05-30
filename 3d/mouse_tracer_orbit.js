const modelViewers = document.getElementsByClassName('Gun');
const content = document.getElementById('video');

// console.log(modelViewers);

content.addEventListener('mousemove', e => {
    const rect = content.getBoundingClientRect();
    const centerX = rect.right - rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate the angle of the camera orbit based on mouse position
    const verticalAngle = -deltaX / rect.width * -360 * .20; // Horizontal orbit angle
    const  horizontalAngle = deltaY / rect.height * 360; // Vertical orbit angle

    // Set the camera orbit angles for each model viewer
    Array.from(modelViewers).forEach(modelViewer => {
        modelViewer.setAttribute('camera-orbit', `${verticalAngle}deg ${horizontalAngle}deg`);
    });
});

// Assuming delay is a function you defined elsewhere
// setInterval(delay, 3000);

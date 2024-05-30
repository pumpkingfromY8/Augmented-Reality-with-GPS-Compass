const video = document.getElementById('video');
const myModelViewer = document.getElementById('myModelViewer');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => console.error(err));
}

function calculateAngle(landmark1, landmark2) {
  const dx = landmark2.x - landmark1.x;
  const dy = landmark2.y - landmark1.y;
  return Math.atan2(dy, dx) * 180 / Math.PI;
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // Update model-viewer to cover the detected face(s) and rotate based on landmarks
    if (resizedDetections.length > 0) {
      const box = resizedDetections[0].detection.box;
      const landmarks = resizedDetections[0].landmarks;
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();
      const nose = landmarks.getNose();
      const jaw = landmarks.getJawOutline();

      // Calculate rotation angles
      const yaw = calculateAngle(leftEye[0], rightEye[3]); // Yaw based on eye positions
      const pitch = calculateAngle(nose[0], jaw[8]); // Pitch based on nose to jaw line

      myModelViewer.style.display = 'block';
      myModelViewer.style.left = `${video.offsetLeft + box.x}px`;
      myModelViewer.style.top = `${video.offsetTop + box.y}px`;
      myModelViewer.style.width = `${box.width}px`;
      myModelViewer.style.height = `${box.height}px`;

      myModelViewer.setAttribute('camera-orbit', `${0}deg ${90}deg`);
      // Update model-viewer rotation
      // myModelViewer.setAttribute('camera-orbit', `${yaw}deg ${pitch}deg`);
    } else {
      myModelViewer.style.display = 'none';
    }
  }, 100);
});
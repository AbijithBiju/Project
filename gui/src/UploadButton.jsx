import React, { useState } from 'react';

function UploadButton() {
  const [videoSrc, setVideoSrc] = useState('');
  const [videoName, setVideoName] = useState('');

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setVideoSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setVideoName(file.name); // set the video name state variable
    };
    input.click();
  };

  const handleVideoClose = () => {
    setVideoSrc('');
    setVideoName('');
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload Video</button>
      {videoSrc && (
        <div>
          <video width="320" height="240" controls onEnded={handleVideoClose}>
            <source src={videoSrc} type="video/mp4" />
          </video>
          <p>Video Name: {videoName}</p> {/* display the video name */}
          <button onClick={handleVideoClose}>Close Video</button>
        </div>
      )}
    </div>
  );
}

export default UploadButton;

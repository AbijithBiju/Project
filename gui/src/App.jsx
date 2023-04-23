import { useState } from "react";
import "./App.css";

function App() {



  const [segments, setSegments] = useState();
  const preview = (e) => {
    e.preventDefault();
  };

  const submit = async (e) => {
    e.preventDefault();

    const file = document.getElementById("file").value;
    const filePath = file.replace(/\\/g, "/");
    console.log(filePath);

    var formdata = new FormData();
    formdata.append("path", filePath);
    formdata.append("type", "violence");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch("http://127.0.0.1:5000", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSegments(result);
      })
      .catch((error) => console.log("error", error));

    for (let i of segments) {
      let segment = new FormData();
      segment.append("segment", i);
      let segmentOptions = {
        method: "POST",
        body: segment,
        redirect: "follow",
      };
      await fetch("http://127.0.0.1:5000/segment", segmentOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };


  const [videoSrc, setVideoSrc] = useState('');

  const handleUpload = () => {
    setVideoSrc('');
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
    };
    input.click();
  };


  return (
    <>
      <h1>Violence Detection</h1>
      <div className="card">
        <span className="video-container">
        {videoSrc && (
        <video width="320" height="240" controls autoPlay>
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
          {/* <div class="controls">
            <button
              class="play"
              data-icon="P"
              aria-label="play pause toggle"
            ></button>
            <button class="stop" data-icon="S" aria-label="stop"></button>
            <div class="timer">
              <div></div>
              <span aria-label="timer">00:00</span>
            </div>
            <button class="rwd" data-icon="B" aria-label="rewind"></button>
            <button
              class="fwd"
              data-icon="F"
              aria-label="fast forward"
            ></button>
          </div> */}
        </span>
        <span className="control-suite">
          <input placeholder="upload file path" id="file" type="text" />
          <button onClick={submit}>Upload</button>
        </span>
      </div>

      <button onClick={handleUpload}>Preview</button>
    </>
  );
}

export default App;

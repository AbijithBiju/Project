import { useState } from 'react'
import './App.css'


function App() {
  const [segments, setSegments] = useState()
  const preview=(e)=>{
	e.preventDefault()

  }

  const submit=async(e)=>{
    e.preventDefault()
    
    const file = document.getElementById('file').value
    const filePath = file.replace(/\\/g, "/")
    console.log(filePath)

    var formdata = new FormData();
    formdata.append("path", filePath);
    formdata.append("type", "violence");

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    await fetch("http://127.0.0.1:5000", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setSegments(result)
      })
      .catch(error => console.log('error', error));

    for(let i of segments){
      let segment = new FormData()
      segment.append('segment',i)
      let segmentOptions = {
        method: 'POST',
        body: segment,
        redirect: 'follow'
      };
      await fetch("http://127.0.0.1:5000/segment", segmentOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log('error', error));
    }
  }

  return (
    <>
      <h1>Violence Detection</h1>
      <div className="card">
        <label>upload file path </label>
        <input id='file' type='text'/>
        <button onClick={preview}>Preview</button>
        <button onClick={submit}>Upload</button>
      </div>
    </>
  )
}

export default App

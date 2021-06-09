import React from "react";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
function Prueba() {
  // State to store uploaded file
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }

  return (
    <div id="upload-box">
      <input type="file" onChange={handleUpload} />
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      {JSON.stringify(file)}
    </div>
  );
}

export default Prueba;
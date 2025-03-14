import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import FaceResults from './components/FaceResults';
import './styles/modern.css';

function App() {
  const [faceResults, setFaceResults] = useState([]);

  const handleResults = (results) => {
    setFaceResults(results);
  };

  return (
    <div className="app-container">
      <h1 className="title">Face Detection AI</h1>
      <UploadForm onResults={handleResults} />
      <FaceResults results={faceResults} />
    </div>
  );
}

export default App;

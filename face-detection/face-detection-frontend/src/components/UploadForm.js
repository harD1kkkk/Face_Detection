import React, { useState } from 'react';
import { detectFaces } from '../services/api';

function UploadForm({ onResults }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const data = await detectFaces(file);
      onResults(data);
    } catch (err) {
      setError(err.message);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form fade-in">
      <form onSubmit={handleSubmit}>
        <div className="file-input-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Analyzing Image...' : 'Detect Faces'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UploadForm;

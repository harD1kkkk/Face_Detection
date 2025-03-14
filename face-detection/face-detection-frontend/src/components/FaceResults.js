import React from 'react';

function FaceResults({ results }) {
  if (!results || results.length === 0) {
    return <p className="results-container">No faces detected.</p>;
  }

  return (
    <div className="results-container fade-in">
      <h2 className="title">Detection Results</h2>
      {results.map((face, index) => (
        <div key={index} className="face-card">
          <h3>Face #{index + 1}</h3>
          <p><strong>Face ID:</strong> {face.FaceId}</p>
          <p><strong>Age:</strong> {face.Age}</p>
          <p><strong>Gender:</strong> {face.Gender}</p>
          <h4>Emotions:</h4>
          {Array.isArray(face.Emotions) ? (
            <div className="emotions-list">
              {face.Emotions.map((emotion, idx) => (
                <div key={idx} className="emotion-item">
                  <strong>{emotion.Key}:</strong> {emotion.Value}%
                </div>
              ))}
            </div>
          ) : (
            <p>No emotion data</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaceResults;

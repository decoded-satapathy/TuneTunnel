import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Base64Stream = () => {
  const { videoId } = useParams(); // Get videoId from the URL params
  const [audioSrc, setAudioSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAudio = () => {
    if (!videoId) {
      setError('No videoId provided');
      return;
    }

    setLoading(true);
    setError(null); // Reset error state before new fetch

    try {
      // Construct the stream URL with videoId
      const audioUrl = `http://localhost:3001/api/v1/streamBinary?videoId=${videoId}`;

      // Set the audio source directly from the stream URL
      setAudioSrc(audioUrl);
      setLoading(false);
    } catch (err) {
      setError('Failed to load the audio stream');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Streaming Audio for Video ID: {videoId}</h1>

      {!audioSrc && (
        <button onClick={fetchAudio} disabled={loading}>
          {loading ? 'Loading audio...' : 'Load Audio'}
        </button>
      )}

      {error && <p>Error: {error}</p>}

      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

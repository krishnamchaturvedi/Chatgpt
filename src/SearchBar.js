import React, { useState } from 'react';

const SearchBar = ({ searchQuery, onSearch }) => {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleSearchInput = (event) => {
    const query = event.target.value;
    onSearch({ detail: { source: query } });
  };

  const toggleSpeechRecognition = () => {
    if (!recognition) {
      const recognitionInstance =
        new (window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition)();
      recognitionInstance.lang = "en-US";
      setRecognition(recognitionInstance);

      recognitionInstance.onstart = () => {
        setListening(true);
      };

      recognitionInstance.onend = () => {
        setListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSearch({ detail: { source: transcript } });
      };
    }
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleImageScannerClick = () => {
    const inputElement = document.getElementById('imageInput');
    inputElement.click();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Perform image processing logic here, if needed
    }
  };

  return (
    <div className="search-bar">
      <img src="/bird.png" alt="Search Icon" className="search-icon" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="Search for Schools, Colleges and More..."
      />
      <button className="speech-button" onClick={toggleSpeechRecognition}>
        {listening ? "Listening..." : "Speak"}
      </button>
      <button className="image-button" onClick={handleImageScannerClick}>
        <img src="/camera.png" alt="Camera Icon" className="camera-icon" />
      </button>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </div>
  );
};

export default SearchBar;

import React from 'react';
import dropIcon from './drop.svg';
import styles from './FileDropArea.module.css';

const FileDropArea = ({ onFileLoad, showToast }) => {
  const fileInputRef = React.createRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    loadFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    loadFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const loadFile = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        onFileLoad(json);
      } catch (err) {
        showToast('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        border: '2px dashed #333',
        padding: '1rem',
      }}
    >
      <span>
        <figure className={styles.figure}>
          <img
            className={styles.img}
            style={{ width: '40px' }}
            src={dropIcon}
            alt="Drop your JSON file here"
          />
          <figcaption>Drop your JSON file here!</figcaption>
        </figure>
        <p className={styles.p}>
          This will break your JSON down into a tree view below, allowing you to
          select paths from within it
        </p>
      </span>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default FileDropArea;

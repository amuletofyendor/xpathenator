import React from 'react';
import copyIcon from './copyXPath.svg';
import styles from './XPathGenerator.module.css';

const XPathGenerator = ({ selectedNodes, showToast, onPathSelect }) => {
  const handleCopyClick = async () => {
    const xpathText = document.getElementById('xpath-text');
    try {
      await navigator.clipboard.writeText(xpathText.innerText);
      showToast('Copied to clipboard!', 3000);
    } catch (err) {
      showToast(
        'Sorry, couldn&apos;t copy automatically--just select and copy with ctrl+c',
        3000
      );
    }
  };

  return (
    <div className={styles.xPathControl}>
      <div className={styles.xPathControlBox}>
        <div
          contentEditable={false}
          id="xpath-text"
          className={styles.xPathContainer}
        >
          {selectedNodes.map((path, index) => (
            <p
              key={index}
              className={styles.xPathLine}
              onClick={() => onPathSelect(path)}
            >
              {path}
            </p>
          ))}
        </div>
        <button className={styles.xPathButton} onClick={handleCopyClick}>
          <img
            style={{ width: '20px' }}
            src={copyIcon}
            alt="Copy to clipboard"
          />
        </button>
      </div>
    </div>
  );
};

export default XPathGenerator;

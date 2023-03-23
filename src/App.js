import React, { useState, useRef, useEffect } from 'react';
import FileDropArea from './FileDropArea';
import JSONTree from './JSONTree';
import XPathGenerator from './XPathGenerator';
import styles from './App.module.css';

const App = () => {
  const [json, setJson] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [focusPath, setFocusPath] = useState('');

  const jsonTreeRef = useRef(null);

  const handleFileLoad = (loadedJson) => {
    setJson(loadedJson);
  };

  const handleNodeSelect = (path, isSelected) => {
    setSelectedNodes((prev) => {
      if (isSelected) {
        return prev.includes(path) ? prev : [...prev, path];
      } else {
        return prev.filter((node) => node !== path);
      }
    });
  };

  const handlePathSelect = (path) => {
    setFocusPath(path);
  };

  const showToast = (message, duration = 3000) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, duration);
  };

  useEffect(() => {
    if (jsonTreeRef.current && focusPath !== '') {
      const node = jsonTreeRef.current.querySelector(
        `[data-path="${focusPath}"]`
      );
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setFocusPath('');
    }
  }, [focusPath]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <FileDropArea
        onFileLoad={handleFileLoad}
        showToast={showToast}
        style={{ flexBasis: '20%' }}
      />
      {json && (
        <div style={{ flexBasis: '80%', display: 'flex', overflow: 'hidden' }}>
          <div className={styles.jsonTreeContainer}>
            <JSONTree
              ref={jsonTreeRef}
              json={json}
              onNodeSelect={handleNodeSelect}
              focusPath={focusPath}
              selectedNodes={selectedNodes}
            />
          </div>
          <div className={styles.xPathGeneratorContainer}>
            <XPathGenerator
              selectedNodes={selectedNodes}
              onPathSelect={handlePathSelect}
              showToast={showToast}
            />
          </div>
        </div>
      )}
      <div className={styles.toast + ' ' + (toastMessage ? styles.show : '')}>
        {toastMessage}
      </div>
    </div>
  );
};

export default App;

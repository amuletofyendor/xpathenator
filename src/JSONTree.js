import React, { useState, forwardRef } from 'react';
import styles from './JSONTree.module.css';

const JSONNode = ({
  keyName,
  value,
  path,
  focusPath,
  onNodeSelect,
  selectedNodes,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isSelected = selectedNodes.includes(path);
  const isExpandable =
    typeof value === 'object' || (Array.isArray(value) && value.length > 0);
  const maxLeafLength = 30;

  const handleClick = () => {
    if (isExpandable) {
      setExpanded(!expanded);
    }
  };

  const handleNodeSelect = (e) => {
    e.stopPropagation();
    if (isSelected) {
      onNodeSelect(path, false);
    } else {
      onNodeSelect(path, true);
    }
  };

  const escapeXPathKey = (key) => {
    return key.replace(/([\\'\(\)\[\]\{\}:\"\#\@\|\/\.])/g, '\\$1');
  };

  let subItems = null;

  if (
    !expanded &&
    isExpandable &&
    focusPath.substring(0, path.length) === path
  ) {
    setExpanded(true);
  }

  if (expanded) {
    subItems = (
      <ul className={styles.jsonTree}>
        {Object.keys(value).map((key) => (
          <JSONNode
            key={key}
            keyName={key}
            value={value[key]}
            path={
              Array.isArray(value)
                ? path + '[' + (Number(key) + 1) + ']'
                : path + '/' + escapeXPathKey(key)
            }
            focusPath={focusPath}
            onNodeSelect={onNodeSelect}
            selectedNodes={selectedNodes}
          />
        ))}
      </ul>
    );
  }

  return (
    <li>
      <div
        className={styles.node + ' ' + (isSelected ? styles.selected : '')}
        onClick={handleClick}
        data-path={path}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleNodeSelect}
          className={styles.checkbox}
        />
        {keyName}
        {!isExpandable && (
          <span className={styles.leaf}>
            {value.toString().length > maxLeafLength
              ? value.toString().substring(0, maxLeafLength) + '...'
              : value.toString()}
          </span>
        )}
        {isExpandable && (
          <span className={styles.toggle} onClick={handleClick}>
            {' '}
            {expanded ? '▼' : '▶'}
          </span>
        )}
      </div>
      {subItems}
    </li>
  );
};

const JSONTree = forwardRef(function JSONTree(
  { json, path = '', focusPath = '', onNodeSelect, selectedNodes },
  ref
) {
  return (
    <ul ref={ref} className={styles.jsonTree}>
      {Object.keys(json).map((key) => (
        <JSONNode
          key={key}
          keyName={key}
          value={json[key]}
          path={path + '/' + key}
          focusPath={focusPath}
          onNodeSelect={onNodeSelect}
          selectedNodes={selectedNodes}
        />
      ))}
    </ul>
  );
});

export default JSONTree;

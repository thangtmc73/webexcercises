import React, { useState, useEffect } from 'react';
import ChildInput from './child-input';
import Node from './node';

import './styles.css';

function Ex1() {
  const [mapData, setMapData] = useState({ 0: { children: [] }});
  const [latestId, setLatestId] = useState(1);
  const [newChildValue, setNewChildValue] = useState('');
  const [newChildParentId, setNewChildParentId] = useState('');

  function handleOnNewChildValueChangeText(event) {
    setNewChildValue(event.target.value);
  }

  function handleOnNewChildParentIdChangeText(event) {
    setNewChildParentId(event.target.value);
  }

  function handleOnAddButtonClick() {
    let parentId = !!mapData[newChildParentId] ? Number(newChildParentId) : 0;
    let parentItem = mapData[parentId];
    parentItem.children.push(latestId);
    const newMapData = {
      ...mapData,
      [parentId]: parentItem,
      [latestId]: {
        value: newChildValue || `dump${latestId}`,
        parentId,
        children: []
      }
    };
    setMapData(newMapData);
    window.localStorage.setItem('ex1-map-data', JSON.stringify(newMapData));
    setLatestId(latestId + 1);
  }

  function handleOnClearAllButtonClick() {
    window.localStorage.removeItem('ex1-map-data');
    setMapData({ 0: { children: [] }});
    setLatestId(1);
  }

  function updateNewParent(id, parentId) {
    const dropNode = mapData[id];
    const previousParentId = dropNode.parentId;
    const previousParent= mapData[previousParentId];
    const newParent = mapData[parentId];
    previousParent.children = previousParent.children.filter(child => child !== id);
    dropNode.parentId = parentId;
    newParent.children.push(id);
    const newMapData = {
      ...mapData,
      [parentId]: { ...newParent },
      [previousParentId]: { ...previousParent },
      [id]: { ...dropNode }
    };
    setMapData(newMapData);
    window.localStorage.setItem('ex1-map-data', JSON.stringify(newMapData));
  }

  useEffect(() => {
    const oldData = window.localStorage.getItem('ex1-map-data');
    if (!!oldData) {
      const parseData = JSON.parse(oldData);
      setMapData(parseData);
      setLatestId(Object.keys(parseData).length)
    } else {
      setMapData({ 0: { children: [] }});
    }
  }, []);
  return (
    <div className="ex1">
      <div className="header">
        <ChildInput
          id={latestId}
          onValueChangeText={handleOnNewChildValueChangeText}
          value={newChildValue}
          onParentIdChangeText={handleOnNewChildParentIdChangeText}
          parentId={newChildParentId}
        />
        <button onClick={handleOnAddButtonClick}>Thêm</button>
        <button onClick={handleOnClearAllButtonClick}>Xoá hết dữ liệu</button>
      </div>
      <div>
        <Node
          mapData={mapData}
          id={0}
          updateNewParent={updateNewParent}
        />
      </div>
    </div>
  );
}

export default Ex1;
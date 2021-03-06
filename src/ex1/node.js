import React from 'react';

function Node(props) {
  const { id, mapData, updateNewParent } = props;
  const data = mapData[id];

  function handleOnNodeDragOver(ev) {
    ev.preventDefault();
  }

  function handleOnNodeDragStart(ev) {
    ev.dataTransfer.setData("id-drag", id);
  }

  function handleOnNodeDrop(ev) {
    ev.preventDefault();
    const idDrag = Number(ev.dataTransfer.getData("id-drag"));
    if (id !== idDrag && !isChildOf(id, idDrag)) {
      updateNewParent(idDrag, id);
    }
  }

  function isChildOf(currentId, parentId) {
    const parentNode = mapData[parentId];
    if (parentNode.children.includes(currentId)) {
      return true;
    }
    return (parentNode.children.map(
        item => isChildOf(currentId, item)
      ).filter(
        item => item === true
      ).length !== 0);
  }

  const { value, children } = data;
  return (
    <div
      className="node"
    >
      {value && 
        <div
          className="name"
          draggable={true}
          onDragStart={handleOnNodeDragStart}
          onDrop={handleOnNodeDrop}
          onDragOver={handleOnNodeDragOver}
        >
          <span>{value} ({id})</span>
        </div>
      }
      <div className="node-children-wrapper">
        {children.map(childId =>
          <Node
            id={childId}
            mapData={mapData}
            key={childId}
            updateNewParent={updateNewParent}
          />
        )}
      </div>
    </div>
  );
}

Node.defaultProps = {
  id: 0,
  mapData: {}
}

export default Node;
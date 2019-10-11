import React from 'react';

function Node(props) {
  const { id, mapData } = props;
  const data = mapData[id];

  const { value, children } = data;
  return (
    <div className="node">
      {value && <span>{value} ({id})</span>}
      <div className="node-children-wrapper">
        {children.map(childId =>
          <Node
            id={childId}
            mapData={mapData}
            key={childId}
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
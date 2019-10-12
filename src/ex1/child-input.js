import React from 'react';

function ChildInput({ id, onValueChangeText, value, onParentIdChangeText, parentId }) {
  return (
    <div className="child-input">
      <span>Latest ID: {id}</span>
      <input
        className="value-input"
        placeholder="Giá trị (có thể bỏ trống)"
        onChange={onValueChangeText}
        value={value}
      />
      <input
        className="parent-input" 
        placeholder="Con ai - Id? (default = 0)"
        onChange={onParentIdChangeText}
        value={parentId}
      />
    </div>
  )
}

ChildInput.defaultProps = {
  id: 1
}

export default ChildInput;
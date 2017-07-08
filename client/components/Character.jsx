import React from 'react';

const Character = (props) => {
  return (
    <div className={"character"+props.jump}>
      <img src="assets/princess_peach.gif" alt=""/>
    </div>
  )
}

export default Character;

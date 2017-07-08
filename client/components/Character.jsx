import React from 'react';

const Character = (props) => {
  const style = props.jump ? ' jump' : '' ;
  return (
    <div className={"character" + style}>
      <img src="assets/princess_peach.gif" alt=""/>
    </div>
  )
}

export default Character;

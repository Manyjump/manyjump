import React from 'react';

const Character = (props) => {
  const jump = props.jump ? ' jump' : '' ;
  const style = {
    filter: `hue-rotate(${props.colorRotation})`,
  };
  return (
    <div className={"character" + jump}>
      <img src="assets/princess_peach.gif" alt="" style={style}/>
    </div>
  )
}

export default Character;

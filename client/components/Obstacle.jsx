import React from 'react';

const Obstacle = (props) => {
  return (
    <div className="obstacle" style={{right: props.pigX}}>
      <img src="assets/ninja.gif" />
    </div>
  )
}

export default Obstacle;

import React from 'react';

const Background = (props) => {
  return (
    <div id='imgContainer'>
      <img id='backgrImg1' src='assets/mountains-back.png' style={{ height:'400px', left:props.bkgr1PosX }}/>
      <img id='backgrImg2' src='assets/mountains-back.png' style={{ height:'400px', left:props.bkgr2PosX }}/>
    </div>
  );
}

export default Background;

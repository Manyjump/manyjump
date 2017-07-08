import React, { Component } from 'react';
import Character from './Character.jsx';
import Background from './Background.jsx';

function getInitialState() {
  return {
    jump: false,
    lastJumpTime: 0,
    bkgr1PosX: '0px',
    bkgr2PosX: '916px',
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.setFalse = this.setFalse.bind(this);
    this.update = this.update.bind(this);
    this.state = getInitialState();
  }

  handleKey(value, e) {
    let jump = this.state.jump;
    let lastJumpTime = this.state.lastJumpTime
    if(e.keyCode === 32 && !jump && (Date.now() - lastJumpTime) >= 1500) {
      setTimeout(this.setFalse, 1200);
      this.setState({
        jump: true,
        lastJumpTime: Date.now()
      });
    }

  }

  setFalse() {
    if (this.state.jump) this.setState({jump : false});
  }

  update() {
    console.log('in update');

    this.setState((prevState) => {
      const prevX1 = Number(prevState.bkgr1PosX.slice(0, -2));
      const prevX2 = Number(prevState.bkgr2PosX.slice(0, -2));
      let newX1;
      let newX2;
      if (prevX1 === -915) {
        newX1 = '916px';
        newX2 = prevX2 - 1 + 'px';
      } else if (prevX2 === -915) {
        newX1 = prevX1 - 1 + 'px';
        newX2 = '916px';
      } else {
        newX1 = prevX1 - 1 + 'px';
        newX2 = prevX2 - 1 + 'px';
      }
      return {
        bkgr1PosX: newX1,
        bkgr2PosX: newX2,
      }
    });
  }

  componentDidMount() {
    // window.addEventListener('keyup',   this.handleKey.bind(this, false));
    window.addEventListener('keypress', this.handleKey.bind(this, true));
    setInterval(this.update, 10);
  }

  render() {

    // document.body.onkeyup = this.handleKey;
    const style = this.state.jump ? ' jump' : '' ;
    const { bkgr1PosX, bkgr2PosX } = this.state;

    return (
      <div id='background'>
        <Background bkgr1PosX={bkgr1PosX} bkgr2PosX={bkgr2PosX} />
        <Character jump={style} />
      </div>
    )
  }
}

export default App

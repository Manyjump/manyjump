import React, { Component } from 'react';
import Character from './Character.jsx';

function getInitialState() {
  return {
    jump: false,
    lastJumpTime: 0
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.setFalse = this.setFalse.bind(this);
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


  componentDidMount() {
    // window.addEventListener('keyup',   this.handleKey.bind(this, false));
    window.addEventListener('keypress', this.handleKey.bind(this, true));
  }

  render() {

    // document.body.onkeyup = this.handleKey;
    const style = this.state.jump ? ' jump' : '' ;

    return (
      <Character jump={style} />
    )
  }
}

export default App

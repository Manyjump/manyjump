import React from 'react';

const Notifications = (props) => {

  // Create jsx for each message
  // Apply styling based on the type of message
  const users = Object.keys(props.users).map((id) => {

    const style = {
      color: 'pink',
      filter: `hue-rotate(${props.users[id].colorRotation}) saturate(200%) brightness(75%)`,
      fontWeight: 'bold'
    }

    return <li key={id}><span style={style}>{props.users[id].name}</span> has joined!</li>
  });

  return (
    <ul className='notifications'>
      {users}
    </ul>
  )
}

export default Notifications;

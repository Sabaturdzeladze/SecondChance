import React from 'react';
import spinner from './spinner.gif';

const Spinner = ({width, margin, display}) => {
  return (
    <div>
      <img src={spinner} alt="Loading" style={{width, margin, display}} />
    </div>
  )
}

Spinner.defaultProps = {
  width: '200px',
  margin: 'auto',
  display: 'block'
}

export default Spinner
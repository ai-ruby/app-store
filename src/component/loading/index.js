import React from 'react'
import './index.scss';

class loading extends React.Component {
  render() {
    const { data } = this.props
    return (
      <div className="loading">
        { data ? data : ('loading...') } 
      </div>
    )
  }
}

export default loading

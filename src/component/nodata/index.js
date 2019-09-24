import React from 'react'
import './index.scss';

class NoData extends React.Component {
  render() {
    const { data } = this.props
    return (
      <div className="no-data">
        { data ? data : ('暂无更多信息哦...') } 
      </div>
    )
  }
}

export default NoData

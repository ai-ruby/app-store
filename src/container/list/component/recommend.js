import React from 'react'
import { connect } from 'react-redux'
import { getRecommendList } from '@/redux/recommend.redux'
import NoData from '@/component/nodata';
import Loading from '@/component/loading';
import './recommend.scss';

@connect(
  state => state.recommendList,
  { getRecommendList }
)

class RecommendList extends React.Component {
  static defaultProps = { 
      recommendList: []
  }
  
  componentDidMount() {
    const { getRecommendList } = this.props
    getRecommendList()
  }

  renderRow = (item, idx) => {
    return (
      <div className="media-list" key={`recommend-${idx}`}>
        <div className="media-list-body media-list-row">
          <div className="media-list-body-hd media-list-row-hd">
            <img src={ null || item['im:image'][0].label } alt=""/>
          </div>
          <div className="media-list-body-bd media-list-row-bd">
            <div className="media-list-body-title">{ null || item['im:name'].label }</div>
            <div className="media-list-row-subtitle">{ null || item.category.attributes.label } </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { recommendList, searchRecommendList, searchValue } = this.props
    return (
      <div className="media-container">
        <div className="title">推介</div>
        <div className="recommend-list">
          {
            searchValue && (
              searchRecommendList && searchRecommendList.length !== 0 ? (
                searchRecommendList.map((item, idx) => {
                  return this.renderRow(item, idx)
                })) : <NoData />
            )
          }

          {
            !searchValue && (
              recommendList.length === 0 ? (
                <Loading/>
              ) : (
                recommendList.map((item, idx) => {
                  return this.renderRow(item, idx)
                })
              )
            )
          }
        </div>
      </div>
    )
  }
}

export default RecommendList

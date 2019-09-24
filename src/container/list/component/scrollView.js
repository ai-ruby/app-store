import React,{ Component } from 'react'
import ReactDOM from 'react-dom' 
import { connect } from 'react-redux'
import { PullToRefresh, ListView } from 'antd-mobile';
import { getAppList } from '@/redux/appList.redux'
import NoData from '@/component/nodata';
import './scrollView.scss'
 
@connect(
	state => state.appList,
	{ getAppList }
)

class ScrollView extends Component {
  constructor(props) {
    super(props);
    
    this.pageNo = 0  
    this.state = {
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      hasMore: true
    };
  }
 
  async componentDidMount() {
    const { getAppList } = this.props;
    const hg = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    await getAppList()
    
    this.setState({
      height: hg,
      refreshing: false,
      isLoading: false,
    });
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <div className="media-list">
        <div className="serial-number">{ `${rowID * 1 + 1} ` }</div>
        <div className="media-list-body media-list-column">
          <div className="media-list-body-hd media-list-column-hd">
            <img src={ rowData['im:image'][0].label } alt=""/>
          </div>
          <div className="media-list-body-bd media-list-column-bd">
            <div className="media-list-body-title">{ rowData['im:name'].label }</div>
            <div className="media-list-column-subtitle">{ rowData.category.attributes.label } </div>
            <div>
              { rowData.category.attributes.term }
              <span className="media-list-column-stars">{ rowData.category.attributes['im:id'] } </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
 
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const { appList } = this.props
    const { refreshing, isLoading } = this.state

    return (
      <ListView
        key={'scrollView'}
        ref={el => this.lv = el}
        dataSource={ds.cloneWithRows(appList)}
        renderFooter={
          () => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              { isLoading ? 'Loading...' : <NoData data='加载完毕...' /> }
            </div>
          )
        }
        renderRow={this.renderRow}
        useBodyScroll
        className="scroll-view"
        pullToRefresh={<PullToRefresh
          refreshing={ refreshing }
          />}
        pageSize={10} 
      />
    );
  }
}
 
export default ScrollView
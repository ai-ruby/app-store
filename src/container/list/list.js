import React,{ Component } from 'react'
import { connect } from 'react-redux'
import SearchBar from '@/component/search/searchBar'
import RecommendList from './component/recommend'
import ScrollView from './component/scrollView';
import './list.scss'
 

@connect(
	state => state,
)

class ListContainer extends Component {
  render() {
    const  {search: { searchValue } } = this.props
    return (
      <div className="list">
        <SearchBar />
        <RecommendList searchValue={searchValue} />
        <ScrollView />
      </div>
    );
  }
}
 
export default ListContainer
import React from 'react'
import { SearchBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { searchValueDispatch } from '@/redux/search.redux'
import { searchRecommendList } from '@/redux/recommend.redux'
import { searchAppList } from '@/redux/appList.redux'
import './search.scss'

@connect(
  state => state.search,
  { searchValueDispatch },
)

@connect(
  state => state.recommendList,
  { searchRecommendList },
)

@connect(
  state => state.appList,
  { searchAppList },
)

class Search extends React.Component {

  onChange= (value) => {
    const {  searchValueDispatch ,searchRecommendList, recommendList, searchAppList }   = this.props
    searchValueDispatch(value)
    searchRecommendList(recommendList, value)
    searchAppList(value)
  };

  render() {
    const {  searchValue }  = this.props

    return (
      <div >
        <SearchBar 
          className="search-bar" 
          style={{ position: searchValue ? 'fixed' : 'absolute' }}
          placeholder="搜索" 
          value={searchValue} 
          onChange={val => this.onChange(val) 
        } />
      </div>
    )
  }
}

export default Search

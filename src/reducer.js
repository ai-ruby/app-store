import { combineReducers } from 'redux'
import { appList } from './redux/appList.redux'
import { search } from './redux/search.redux'
import { recommendList } from './redux/recommend.redux'
export default combineReducers({ search, appList, recommendList })

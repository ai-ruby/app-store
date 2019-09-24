// import request from '../utils/fetch'
import axios from 'axios'

const APP_LIST = 'APP_LIST'
const SEARCH_APP_LIST = 'SEARCH_APP_LIST'

const initState = {
  appList: [],
  searchList: []
}

export function appList(state = initState, action) {
  switch (action.type) {
    case APP_LIST:
      return { ...state, appList: action.payload }
    case SEARCH_APP_LIST:
      return { ...state, searchList: action.payload }
    default:
      return state
  }
}

export function getAppList(type) {
  let topfreeapplications = localStorage.topfreeapplications
  return async dispatch => {
    if( !topfreeapplications ) {
      const response = await axios.get('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
      localStorage.setItem('topfreeapplications', JSON.stringify(response.data.feed.entry))
      topfreeapplications = JSON.stringify(response.data.feed.entry)
    }
    dispatch({
      type: 'APP_LIST',
      payload: JSON.parse(topfreeapplications)
    })
  }
}



function searchApp(list){
	return { type: APP_LIST, payload:list }
}

export function searchAppList(value){
  return dispatch => {
    const appList = JSON.parse(localStorage.getItem('topfreeapplications'))
    const newAppList = appList.filter(item => {
      const title = item['im:name'].label
      const titleToUpperCase = title.toUpperCase()
      const valueToUpperCase = value.toUpperCase()
      if(titleToUpperCase.split(valueToUpperCase).length > 1) {
        return item
      }
      return ''
    })
    dispatch(searchApp(newAppList))
  }
}
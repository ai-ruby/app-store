import request from '../utils/fetch'

const RECOMMEND_LIST = 'RECOMMEND_LIST'
const SEARCH_RECOMMEND_LIST = 'SEARCH_RECOMMEND_LIST'

const initState = {
  recommendList: [],
  searchRecommendList: []
}

export function recommendList(state = initState, action) {
  switch (action.type) {
    case RECOMMEND_LIST:
      return { ...state, recommendList: action.payload}
    case SEARCH_RECOMMEND_LIST:
    return { ...state, searchRecommendList: action.payload}
    default:
      return state
  }
}


function searchRecommend(list){
	return { type: SEARCH_RECOMMEND_LIST, payload:list }
}

export function searchRecommendList(list, value){
  return dispatch => {
    const newList = list.filter(item => {
      const title = item['im:name'].label
      const titleToUpperCase = title.toUpperCase()
      const valueToUpperCase = value.toUpperCase()
      if(titleToUpperCase.split(valueToUpperCase).length > 1) {
        return item
      }
      return ''
    })
    dispatch(searchRecommend(newList))
  }
}

export function getRecommendList(value) {
  return async dispatch => {
    const response = await request('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json', {}, 'GET')
    dispatch({
      type: 'RECOMMEND_LIST',
      payload: response.feed.entry
    })
  }
}

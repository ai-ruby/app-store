const SEARCH_LIST = 'SEARCH_LIST'
const SEARCH_VALUE = 'SEARCH_VALUE'
const SEARCH_APP_LIST = 'SEARCH_APP_LIST'

const initState = {
  searchList:[],
  searchValue: '',
  searchAppList: [],
  searchRecommendList: [],
}

export function search(state = initState, action){
	switch ( action.type ){
		case SEARCH_VALUE:
			return {...state, searchValue: action.payload }
		case SEARCH_LIST:
			return {...state, searchList: action.payload }
		case SEARCH_APP_LIST:
			return {...state, searchAppList: action.payload }
		default:
			return state
	}
}

export function setSearchValue(value){
	return { type: SEARCH_VALUE, payload: value }
}

export function searchValueDispatch(value) {
  return dispatch => {
    dispatch(setSearchValue(value))
  }
}

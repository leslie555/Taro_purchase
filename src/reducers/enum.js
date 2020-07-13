import { handleActions } from 'redux-actions'
import { GET_ENUM } from '@/constants/enum'
const initState = {
  enumList: []
}

const enumList = handleActions(
  {
    [GET_ENUM]: (state, action) => ({
      ...state,
      enumList: action.payload
    })
  },
  initState
)
export default enumList
import { createSlice } from '@reduxjs/toolkit'
import { getHomeData } from '@/api/api'

const channelstore = createSlice({
  name: 'counter',
  initialState: {
    channelList: []
  },
  reducers: {
    setChannels(state, action) {
      state.channelList = action.payload
    }
  }
});
// 异步请求
const { setChannels } = channelstore.actions
const fetchChannlList = () => {
  return async (dispatch: any) => {
    let res = await getHomeData()
    dispatch(setChannels(res.data))
  }
}

export { fetchChannlList }
const reducer = channelstore.reducer
export default reducer
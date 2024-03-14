import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
}

const counterStore = createSlice({
  name: 'counter',
  // 初始化state
  initialState: {
    count: 0
  } as CounterState,
  reducers: {
    // 修改状态的方法 同步方法 支持直接修改
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    addToNum(state, action) {
      state.count = action.payload
    }
  }
});

// 结构出来actionCreater函数
const { increment, decrement, addToNum } = counterStore.actions;

// 获取reducer
const reducer = counterStore.reducer;

// 以按需导入的方式导出actionCreater
export { increment, decrement, addToNum };

export default reducer
import { createStore } from 'redux'

const initailState = {
  count: 0
}

const store = createStore(() => {

}, initailState)

export default store;
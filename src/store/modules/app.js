
const state = {
  size: ''
}

const mutations = {
  SET_SIZE: (state, size) => {
    state.size = size
  }
}

const actions = {
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

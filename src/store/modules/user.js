import { login, logout, getInfo } from '@/api/user'
import { getId, getToken, setToken, removeToken, setId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    id: getId(),
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, roleId } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, roleId: roleId }).then(response => {
        const data = response.result
        commit('SET_TOKEN', data.token)
        commit('SET_ID', data.id)
        commit('SET_NAME', data.username)
        commit('SET_AVATAR', data.icon)
        setToken(data.token)
        setId(data.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.id).then(response => {
        const data = response.result
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, icon } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', icon)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


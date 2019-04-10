/**
 * @file 用户数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */
import { logout } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth' // 从cookie中获取token getToken
import { loginByUserName } from '~/api/login'
import { setToken } from '@/utils/auth'

export const state = () => {
  return {
    token: '',
    fetching: false,
    data: [],
    state: ''

  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action.data
  },
  SET_TOKEN(state, token) {
    state.token = token
  }

}

export const actions = {

  /*   fetchList({ commit }) {
    commit('updateFetching', true)
    return this.$axios.$get(`/tag`, { params: { cache: 1 }})
      .then(response => {
        console.error(response)
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(error => {
        console.error(error)
        commit('updateFetching', false)
      })
  }, */

  /**
   * 更新用户状态
   * @param {d} param0
   */
  toggleLoginStatus({ commit }) {
    commit('SET_TOKEN', getToken())
  },

  // 用户名登录
  LoginByUsername({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      loginByUserName(username, userInfo.password).then(response => {
        console.error('55')

        if (response.code === 20000) {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 退出
   * @param {d} param0
   */
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        alert('55')
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

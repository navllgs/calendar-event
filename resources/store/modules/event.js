import Vue from 'vue'
import Axios from 'axios'
import { endpoints } from '../../js/endpoints'

export default {
  namespaced: true,
  state:{
    event: null
  },
  getters:{
    latestEvent: state => {
      return state.event
    }
  },
  mutations:{
    setEvent(state,v){
      Vue.set(state,'event',v)
    }
  },
  actions:{
    getLatestEvent({commit}){
      return new Promise((resolve,reject)=>{
        Axios.get(endpoints.event + '/latest').then(
          res => {
            commit('setEvent', res.data)
            resolve(res.data)
          },
          err =>{
            reject(err)
          }
        )
      })
    },
    createEvent({state},params){
      return new Promise((resolve,reject)=>{
        Axios.post(endpoints.event + '/create',params).then(
          res=>{
            resolve(res.data)
          },
          err=>{
            reject(err)
          }
        )
      })
    }
  }
}
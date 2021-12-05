import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import MyProfile from './pages/MyProfile.vue'
import Profile from './pages/Profile.vue'
import Friends from './pages/Friends.vue'
import Chats from './pages/Chats.vue'
import Dialogue from './pages/Dialogue.vue'
import Login from './pages/Login.vue'
import { auth, providerGoogle, firestore, timestamp, storage } from './config/firebase.js'
import axios from 'axios'
import '/someLight.css'


Vue.use(Vuex)
Vue.use(VueRouter)

const users = {
  namespaced: true,
  state: {
    loggedUser: null,
    userData: null,
    userIdentifier:null,
    loadedPosts: null,
    lightMode: false
  },
  
  actions: {

      //USANDO API REST
      // eslint-disable-next-line no-unused-vars
      async putState({commit},payload){
        const nova = await axios.get(
          "https://beyondvndergrovnd-odiovqtb5q-uc.a.run.app/load",
        {
          headers: {
            Authorization: "Bearer autenticado"
          },
        })
        commit('loadPosts', nova.data)
      },

      //USANDO API REST
      // eslint-disable-next-line no-unused-vars
      async sendMsg({ commit }, payload) {
        try {
          if(payload.file){
            const upload = await storage.ref().child(`${payload.from}/${payload.to}/${+ new Date()}`).put(payload.file)
            payload.fileUrl = await upload.ref.getDownloadURL()
            payload.file = true
          }
          payload.createdAt = timestamp
          await firestore.collection('messages').add(payload)

          if(payload.text === "me motive!"){
            const motivationReq = await axios.get(
              "https://beyondvndergrovnd-odiovqtb5q-uc.a.run.app/affirmations",
              {
                headers: {
                  Authorization: "Bearer autenticado"
                },
            })
            const motivationText = motivationReq.data.affirmation
            let message = {
              from: payload.to,
              to: payload.from,
              text: motivationText,
              file: null,
              de: payload.para,
              para: payload.de,
              nameSender: "DEV Fairy of Wishes",
              createdAt: timestamp
            } 
            await firestore.collection('messages').add(message)  
          }
        } 
        catch (error) {
          console.log(error)
        }
      },

      //USANDO API REST
      // eslint-disable-next-line no-unused-vars
      async createPostage({commit}, payload){
        try {
          if(payload.image){
            const upload = await storage.ref().child(`${payload.user}/${+ new Date()}`).put(payload.image)
            payload.fileUrl = await upload.ref.getDownloadURL()
            payload.image = true

          }
          var time = Date.now()
          payload.createdAt = time          
          await axios.post(
            "https://beyondvndergrovnd-odiovqtb5q-uc.a.run.app/postage", payload,
            {
            headers: {
              Authorization: "Bearer autenticado"
            },
          })
        }
        catch (error) {
          console.log(error)
        }
      },

      logOut({commit}, payload){
        commit('doLogOut', payload)
      },

      //eslint-disable-next-line no-unused-vars
      create( {commit}, payload){
        const {name,email,password} = payload
        auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          let data = {
            uid: res.user.uid,
            name: name,
            phone: '',
            address: '',
            company: '',
            age: '',
            email: res.user.email
          }
          try {
            firestore.collection('users').add(data)
          }
          catch (error) {
            console.log(error)
          }
          commit('setUser', res.user)
          router.push('/home') 
        })
        .catch(err => {
          store.state.users.noErrorMsg = false
          alert(err.message)
        })
      },

      authenticate ({commit}, payload) {
        const {email, password} = payload
        auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          commit('setUser', res.user)
          router.push('/home')
        })
        .catch(err => {
          alert(err.message)
          router.go()
        })
      },

      loginGoogle({commit}){
        auth.signInWithPopup(providerGoogle)
        .then(res => {
          let data = {
            uid: res.user.uid,
            name: res.user.displayName,
            phone: '',
            address: '',
            company: '',
            age: '',
            email: res.user.email,
            image: res.user.photoURL
          }
          firestore.collection('users').where('uid', '==', res.user.uid).get()
            .then(snap => {
              if(snap.empty){
                firestore.collection('users').add(data)
              }
            })
          commit('setUser', res.user)
          router.push('/home')
        })
        .catch(e => {
          alert(e.message)
          router.go()
        })
      },

      goLight({commit}){
        commit('enlighten')
      }

  },

  mutations: {

      loadPosts(state, posts){
        state.loadedPosts = []
        state.loadedPosts = posts
      },

      setUser(state, user){
        state.userData = user
        state.userIdentifier = user.uid
      },

      doLogOut(state){
        auth.signOut()
        .then(() => {
          state.userData = null
          state.userIdentifier = null 
          router.push('/')
        })
        .catch(e => {
          alert(e.message)  
        })
      },

      enlighten(state){
        state.lightMode = !state.lightMode
      }

  }
}

const store = new Vuex.Store({
  modules:{
    users: users
  },

  plugins: [
    new VuexPersistence().plugin
  ]
}) 

function checkLog(to,from,next){
  if(store.state.users.userData){
    next()
  }else{  
    next('/')
  }
}

const routes = [{
  path: '/home',
  component: Home,
  beforeEnter: checkLog
},
{
  path: '/myProfile',
  component: MyProfile,
  beforeEnter: checkLog
},
{
  path: '/profile/:id',
  component: Profile,
  beforeEnter: checkLog
},
{
  path: '/friends',
  component: Friends,
  beforeEnter: checkLog
},
{
  path: '/chats',
  component: Chats,
  beforeEnter: checkLog
},
{
  path: '/dialogue/:id',
  component: Dialogue,
  beforeEnter: checkLog 
},
{
  path: '/',
  component: Login
}]

const router = new VueRouter({
  routes 
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

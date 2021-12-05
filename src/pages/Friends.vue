<template>
  
  <div id="app"  :class="this.$store.state.users.lightMode ? 'lighter' : 'background'"> 
    <v-app id="forceBackground">
      <v-main> 
        <v-app-bar  :id="this.$store.state.users.lightMode ? 'lighter-topbar' : 'title'"  fixed>
          <v-btn icon @click="goToHome()" color=white style="margin-right:16px">
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-btn>
          VNDERGROVND / vndergrovnders
          
          <v-spacer/>
          <v-flex xs1 md1>
              <v-btn @click="toggleTheme()" rounded small fab elevation="0" :style="this.$store.state.users.lightMode ? 
                      'padding:22px;background-color:#772206' : 
                      'padding:22px;background-color:#1d1412'">
                  <v-icon :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-brightness-4</v-icon>
              </v-btn>
          </v-flex>
        </v-app-bar>
        <div style="margin-top:65px">
          <center>
            <v-progress-circular v-if="loading" indeterminate :size="100" id='prog' :width="10" color='#c02d00ee' />
          </center>
          <div  v-for="(user, index) in users" :key="index">
            <friend-card v-if="user.uid!=$store.state.users.userIdentifier" :friendProp="user" @created="loading = false"/> 
          </div>
        </div>
      </v-main>
    </v-app>
  </div>

</template>


<script>

  import FriendCard from '../components/FriendCard.vue'
  import { firestore } from '../config/firebase.js'

  export default{    
    components: {
      FriendCard
    },

    data(){
      return {
        users: [],
        loading: true
      }
    },

    created(){
        firestore.collection('users')
        .onSnapshot(snap => {
          snap.forEach(doc => {
            if(!doc.empty){   
            this.users.push(doc.data())
            }
          })
        })
      },

    methods:{
      goToHome(){
          this.$router.push('/home')
      },
      toggleTheme(){
        this.$store.dispatch('users/goLight')
      }
    }
  }

</script>


<style scoped>

#prog{
  margin:50px
}

@import '/someLight.css';

</style>
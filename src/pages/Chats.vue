<template>

  <div id="app"  :class="this.$store.state.users.lightMode ? 'lighter' : 'background'"> 
    <v-app id="forceBackground">
      <v-main> 
        <v-app-bar :id="this.$store.state.users.lightMode ? 'lighter-topbar' : 'title'"  fixed>
          <v-btn icon @click="goToHome()" color=white style="margin-right:16px">
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-btn>
          VNDERGROVND / Chats
          <v-spacer/>
          <v-flex xs1 md1>
              <v-btn @click="toggleTheme()" rounded small fab elevation="0" :style="this.$store.state.users.lightMode ? 
                      'padding:22px;background-color:#772206' : 
                      'padding:22px;background-color:#1d1412'">
                  <v-icon :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-brightness-4</v-icon>
              </v-btn>
          </v-flex>
        </v-app-bar>
        <center>
          <v-progress-circular v-if="loading" indeterminate :size="100" id='prog' :width="10" color='#c02d00ee' />
        </center>
        <div style="margin-top:65px">  
          <div  v-for="(users, index) in usersWithChats" :key="index">            
            <chats-card :friendProp="users" :nameProp="namedUsers[index]" @created="loading = false"/> 
          </div>
        </div>
        <div align="center" id="hint">Para iniciar uma conversa clique no ícone de mensagem no perfil do usuário</div>
      </v-main>
    </v-app>
  </div>

</template>


<script>

  import ChatsCard from '../components/ChatsCard.vue'
  import { firestore } from '../config/firebase.js'

  export default{
    components: {
      ChatsCard
    },

    data(){
      return {
        usersWithChats: [],
        namedUsers: [],
        loading: true
      }
    },

    created(){
        firestore.collection('messages')
        .where('from', '==', this.$store.state.users.userIdentifier)         
        .onSnapshot(snap => {
          snap.forEach(doc => {
            this.namedUsers.push(doc.data().para)
            this.usersWithChats.push(doc.data().to)
            let uniqueNames = [...new Set(this.namedUsers)]
            let uniqueUsers = [...new Set(this.usersWithChats)]
            this.namedUsers = uniqueNames
            this.usersWithChats = uniqueUsers
          })
        })

        firestore.collection('messages')
        .where('to', '==', this.$store.state.users.userIdentifier)         
        .onSnapshot(snap => {
          snap.forEach(doc => {
            this.namedUsers.push(doc.data().de)
            this.usersWithChats.push(doc.data().from)
            let uniqueNames = [...new Set(this.namedUsers)]
            let uniqueUsers = [...new Set(this.usersWithChats)]
            this.namedUsers = uniqueNames
            this.usersWithChats = uniqueUsers 
          })
          this.loading = false
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
  margin-top:100px
}

#hint{
  padding:15px;
  margin:15px;
  margin-top:20px;
  background-color: rgba(34, 16, 4, 0.692);
  color:white;
  font-size:13px;
  
}

@import '/someLight.css';

</style>

<template>

  <div id="app"  :class="this.$store.state.users.lightMode ? 'lighter' : 'background'">
    <v-app id="forceBackground">
      <v-main> 
        <v-app-bar  :id="this.$store.state.users.lightMode ? 'lighter-topbar' : 'title'"  fixed>
          <v-btn icon @click="goToChats()" color=white style="margin-right:16px">
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-btn>
          VNDERGROVND / Conversa
          <v-spacer/>
          <v-flex xs1 md1>
              <v-btn @click="toggleTheme()" rounded small fab elevation="0" :style="this.$store.state.users.lightMode ? 
                      'padding:22px;background-color:#772206' : 
                      'padding:22px;background-color:#1d1412'">
                  <v-icon :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-brightness-4</v-icon>
              </v-btn>
          </v-flex>
          </v-app-bar>
          <sub-bar-talk id="subbarfriends"/>
          <center>
            <v-progress-circular v-if="loading" indeterminate :size="100" id='prog' :width="10" color='#c02d00ee' />
          </center>
          <div class="posts-container" id="space" >  
            <div v-for="(messages, index) in newOrderMsg" :key="index">    
              <post-card-chat :postProp="messages" @created="loading = false"/> 
            </div>
          </div>        
          <bottom-bar-2 @send="sendMessage($event)"/>      
          <a id="anchor" v-if="!this.loading"/>
      </v-main>
    </v-app>
  </div>

</template>


<script>

  import PostCardChat from '../components/PostCardChats.vue'
  import SubBarTalk from '../components/SubBarTalk.vue'
  import BottomBar2 from '../components/BottomBar2.vue'
  import { firestore } from '../config/firebase.js'

  export default{
    components: {
      PostCardChat,
      SubBarTalk,
      BottomBar2
    },

    data(){
      return {
        messages: [],
        newOrderMsg: [],
        loading: true,
        destinatario: ''
      }
    },

  created(){
    
        firestore.collection('messages')
        .where('from', '==', this.$store.state.users.userIdentifier)
        .where('to', '==', this.$route.params.id)
        .orderBy('createdAt', 'asc')
        .onSnapshot(snap => {
          this.messages = []
          if(!snap.empty){
          snap.forEach(doc => {
             this.messages.push(doc.data())
          })
          }else{
             this.loading = false
          }
        })

        firestore.collection('messages')
        .where('from', '==', this.$route.params.id)
        .where('to', '==', this.$store.state.users.userIdentifier)
        .orderBy('createdAt', 'asc')
        .onSnapshot(snap => {
          if(!snap.empty){
          snap.forEach(doc => {
            this.messages.push(doc.data()) 
          })
          }else{
             this.loading = false
          }
          this.newOrderMsg = this.messages.sort(function (a, b) {
                if (a.createdAt > b.createdAt) {
                  return 1;
                }
                if (a.createdAt < b.createdAt) {
                  return -1;
                }
                return 0;
              });
        })
        firestore.collection('users')
        .where('uid', '==', this.$route.params.id)
        .onSnapshot(snap => {
          snap.forEach(doc => {
            this.destinatario = doc.data().name
          })
        })        
    }, 

    methods:{

      scrollToEnd(){
        var el = document.getElementById("anchor")
        el.scrollIntoView(true)
      },
      
      goToChats(){
          this.$router.push('/chats')
      },

      async sendMessage(event){
        if(event.text!='' | event.file!=null){
            const msg = {
            from: this.$store.state.users.userIdentifier,
            to: this.$route.params.id,
            text: event.text,
            file: event.file || null,
            de: this.$store.state.users.userData.name,
            para: this.destinatario,
            nameSender: this.$store.state.users.userData.email
          }
          await this.newOrderMsg.push(msg)
          this.$store.dispatch('users/sendMsg', msg)
          this.scrollToEnd()
        }
      },
      toggleTheme(){
        this.$store.dispatch('users/goLight')
      }
    }
  }

</script>


<style scoped>

#scroller{
  overflow-anchor: none;
}

#anchor{
  overflow-anchor: auto;
  height: 1px
}

#prog{
  margin:50px;
  margin-right:115px
}

@import '/someLight.css';

</style>
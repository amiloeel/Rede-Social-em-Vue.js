<template>

  <div id="app"  :class="this.$store.state.users.lightMode ? 'lighter' : 'background'">
    <v-app id="forceBackground">
      <v-main> 
        <v-app-bar  :id="this.$store.state.users.lightMode ? 'lighter-topbar' : 'title'"  fixed>
          <v-btn icon @click="$router.go(-1)" color=white style="margin-right:16px">
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-btn>
          VNDERGROVND / Perfis
          <v-spacer/>
          <v-flex xs1 md1>
              <v-btn @click="toggleTheme()" rounded small fab elevation="0" :style="this.$store.state.users.lightMode ? 
                      'padding:22px;background-color:#772206' : 
                      'padding:22px;background-color:#1d1412'">
                  <v-icon :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-brightness-4</v-icon>
              </v-btn>
          </v-flex>
        </v-app-bar>       
        <sub-bar-friends :propData="this.profileData" :propNum="postages.length" :id="this.$store.state.users.lightMode ? 'lighter-subbarfriends' : 'subbarfriends'" />
        <sub-bar-friends-info  :propData="this.profileData" :id="this.$store.state.users.lightMode ? 'lighter-subbarfriendsinfo' : 'subbarfriendsinfo'" />    
        <center>
          <v-progress-circular v-if="loading" indeterminate :size="100" id='prog' :width="10" color='#c02d00ee' />
        </center>
        <div class="posts-container" id="space">
          <br><br>
            <div v-for="(postage, index) in postages" :key="index">           
              <post-card-friend :postProp="postage"  @created="loading = false"/>
            </div> 
            <center>
              <v-card id="hint" v-if="loading==false && postages.length==0">Nada postado por aqui!</v-card> 
            </center>      
        </div>
      </v-main>
    </v-app>
  </div>

</template>


<script>

  import PostCardFriend from '../components/PostCardFriend.vue'
  import SubBarFriends from '../components/SubBarFriends.vue'
  import SubBarFriendsInfo from '../components/SubBarFriendsInfo.vue'
  import { firestore } from '../config/firebase.js'
 
  export default{
    components: {
      PostCardFriend,
      SubBarFriends,
      SubBarFriendsInfo
    },

    data(){
      return {
        profileData: [],
        postages: [],
        loading: true,
        
      }
    },

    created(){
        firestore.collection('users')
        .where('uid', '==', this.$route.params.id)
        .onSnapshot(snap => {
          snap.forEach(doc => {
            this.profileData.push(doc.data())
            const temp = doc.data().name
            const allias = temp.charAt(0) + temp.substr(temp.indexOf(' ')+1).charAt(0)
            this.profileData.push(allias)
          })
        })
        firestore.collection('postages')
        .where('user', '==', this.$route.params.id)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snap => {
          snap.forEach(doc => {
            this.postages.push(doc.data()) 
          })
          this.loading = false
        })
    },

    methods: {
      toggleTheme(){
        this.$store.dispatch('users/goLight')
      }
    }
  }

</script>


<style scoped>

#prog{
  margin-top:120px;
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
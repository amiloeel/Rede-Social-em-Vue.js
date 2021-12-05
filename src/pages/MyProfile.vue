<template>

  <div id="app"  :class="this.$store.state.users.lightMode ? 'lighter' : 'background'">
    <v-app id="forceBackground">
      <v-main> 
        <v-app-bar :id="this.$store.state.users.lightMode ? 'lighter-topbar' : 'title'" fixed>
          <v-btn icon @click="goToHome()" color=white style="margin-right:16px">
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-btn>
            VNDERGROVND / Suas Postagens
            <v-spacer/>
          <v-flex xs1 md1>
              <v-btn @click="toggleTheme()" rounded small fab elevation="0" :style="this.$store.state.users.lightMode ? 
                      'padding:22px;background-color:#772206' : 
                      'padding:22px;background-color:#1d1412'">
                  <v-icon :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-brightness-4</v-icon>
              </v-btn>
          </v-flex>
        </v-app-bar>   
        <sub-bar :id="this.$store.state.users.lightMode ? 'lighter-subbar' : 'subbar'" :propUser="$store.state.users.userData" :propNum="this.postages.length" @erase="killData()"/>
        <post-bar @newpost="addPost($event)" />
        <center>
          <v-progress-circular v-if="loading" indeterminate :size="100" id='prog' :width="10" color='#c02d00ee' />
        </center> 
          <div class="posts-container" id="space">              
            <div v-for="(post, index2) in postages" :key="index2">
              <post-card :postProp="post"  @newInfo="updateData($event)" @deleting="erase($event)" @created="loading = false"/> 
            </div>
          </div>
      </v-main>
    </v-app>
  </div>

</template>


<script>

  import PostCard from '../components/PostCard.vue'
  import PostBar from '../components/PostBar.vue'
  import SubBar from '../components/SubBar.vue'
  import { firestore } from '../config/firebase.js'

  export default{
    components: {
      PostCard,
      PostBar,
      SubBar
    },

     data(){
      return{
        name: this.$store.state.users.userData.name,
        postages: [],
        loading: true
      }
    },
    
    created(){
        firestore.collection('postages')
        .where('user', '==', this.$store.state.users.userIdentifier)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snap => {
         this.postages = []
          snap.forEach(doc => {
            var post = {
              fileUrl: doc.data().fileUrl,
              image: doc.data().image,
              text: doc.data().text,
              createdAt: doc.data().createdAt,
              user: doc.data().user,
              id: doc.id
            }
            this.postages.push(post)
          })
          this.loading = false
        })
      },

    methods:{

      //USANDO API REST
      addPost(event){
        if(event.text!='' | event.image!=null){
            this.$store.dispatch('users/createPostage', event)
        }
      },
      
      killData(){
          firestore.collection('postages').where('user', '==', this.$store.state.users.userIdentifier).get()
          .then(snap => {
            if(!snap.empty){
              var etc = snap.docs
              etc.forEach(doc => {
                doc.ref.delete()
              })
            }else{
              console.log(snap)
            }
          })
      },

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

</style>
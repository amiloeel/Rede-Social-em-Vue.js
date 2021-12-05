<template>

  <!-- div necessária para setar BG do v-app -->
  <div :class="this.$store.state.users.lightMode ? 'lighter' : 'background'" >
    <!-- classe para forçar remoção do BG do v-app -->
    <v-app id="forceBackground">
      <v-main>  
        <v-app-bar :id="this.$store.state.users.lightMode ? 'lighter-topbar' : 'title'"  fixed>
          VNDERGROVND
          <v-container>
            <v-layout row wrap justify-end>
              <v-flex xs3 md1 sm1>
                <v-btn icon color="grey" @click="logout" id="out" style="margin-right:-80px">
                  <v-icon color="grey" style="margin-right:8px">mdi-close-circle</v-icon> 
                   SAIR
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-app-bar>
        <v-dialog v-model="firsttime" width="500">                      
          <!-- NOVA CONTA -->
          <v-card dark id="new" elevation="8">          
              <v-card-title style="color:#FF9E80;margin-bottom:35px;margin-top:-10px" class="justify-center">FALE MAIS SOBRE VOCÊ!</v-card-title><br> 
              <!-- NOVAS CREDENCIAIS -->
              <v-card-subtitle id='subs'>                      
                Cidade/Estado
              </v-card-subtitle>
              <v-text-field dark class="centered-input"  v-model="address" clearable style="margin:20px;margin-top:-15px;margin-bottom:35px"/>
              <v-card-subtitle id='subs'>                      
                Idade
              </v-card-subtitle>
              <v-text-field dark class="centered-input"  v-model="age" clearable style="margin:20px;margin-top:-15px;margin-bottom:35px"/>
              <v-card-subtitle id='subs'>
                Empresa
              </v-card-subtitle>
              <v-text-field dark class="centered-input"  v-model="company" clearable style="margin:20px;margin-top:-15px;margin-bottom:35px"/>
              <v-card-subtitle id='subs'>                      
                Telefone
              </v-card-subtitle>
              <v-text-field dark class="centered-input"  v-model="phone" clearable style="margin:20px;margin-top:-15px;margin-bottom:35px"/>                              
              <v-card-subtitle id='subs2'>
                Mostrar informações no perfil?
              </v-card-subtitle>
              <div  class="flex-center">
                <v-radio-group v-model="privacy">
                    <v-radio color="white"  label="Sim - Perfil público" value="0" style="float:left;" ></v-radio>
                    <v-radio color="white"  label="Não - Perfil privado" value="1"  style="float:left"></v-radio>
                </v-radio-group>
              </div>
              <center>
                <v-btn class='btn2' large text @click="updateData(), firsttime = false">
                  atualizar
                </v-btn>
              </center>          
          </v-card>
        </v-dialog>     
        <home-bar :id="this.$store.state.users.lightMode ? 'lighter-subbar2' : 'subbar'" class="justify-center" fixed @light="light()"/>
        <post-bar @newpost="addPost($event)" style="margin-top:120px" />
        <center>
          <v-progress-circular v-if="loading" indeterminate :size="100" id='prog' :width="10" color='#c02d00ee' />
        </center>
        <div class="posts-container" id="space">  
          <div v-for="(post, index2) in postages" :key="index2">
            <post-card-home :postProp="post"  @newInfo="updatePostData($event)" @deleting="erase($event)" @created="loading = false" @changes="refresh()"/> 
          </div>    
        </div>
      </v-main>
    </v-app>
  </div>

</template>


<script>

  import PostCardHome from '../components/PostCardHome.vue'
  import PostBar from '../components/PostBar.vue'
  import HomeBar from '../components/HomeBar.vue'
  import { firestore } from '../config/firebase.js'

  export default{
    components: {
      PostCardHome,
      PostBar,
      HomeBar
    },
    
    data(){
      return{ 
        name:'',
        firsttime: false,
        age: '',
        company:'',
        address:'',
        phone:'',
        privacy: '0',
        postages: [],
        loading: true,
        profileAvatar: ''
      }
    },

    created(){
        firestore.collection('users')
        .where('uid', '==', this.$store.state.users.userIdentifier)
        .onSnapshot(snap => {
          snap.forEach(doc => {
            this.$store.state.users.userData = doc.data()
            this.name = doc.data().name
              if(this.$store.state.users.userData.company==''){
                this.firsttime = true
              }
          })
        })
        this.refresh()
      },

    methods:{

      async refresh(){
        this.loading = true
        await this.$store.dispatch('users/putState')
        this.postages = this.$store.state.users.loadedPosts
        this.loading = false
      },

      updateData(){
        firestore.collection('users').where('uid', '==', this.$store.state.users.userIdentifier).get()
          .then(snap => {
            if(!snap.empty){
              var etc = snap.docs[0]
              if(this.privacy=='0'){
                this.privacy = false
              }else{
                this.privacy = true
              }
              etc.ref.update({
                company: this.company,
                address: this.address,
                age: this.age,
                phone: this.phone,
                privacy: this.privacy
              })
            }else{
              console.log(snap)
            }
          })  
      },

      //USANDO API REST
      async addPost(event){
        this.loading = true
        if(event.text!='' | event.image!=null){
            //this.postages.push(event)
            await this.$store.dispatch('users/createPostage', event)
        }else{
          alert("Impossível atualizar - Mensagem vazia")
        }
        await this.refresh()
      },

      logout(){
        this.$store.dispatch('users/logOut')
      },

      light(){
        this.$store.dispatch('users/goLight')
      },

    }
  }

</script>


<style lang="scss">

#postbar {
  background-color: rgba(95, 65, 55, 0.747);
  height: auto
}

#cardPost {
  margin-top:10px;
  margin-left:15px;
  margin-right:15px;
  background-color:#584840aa;
}

#title {
  color:white;
  background-color:#1d1412;
  margin-bottom:0px
}

#msg {
  color:white;
  font-size:19px;
}

.background {
  background: fixed center;
  background-image: url('../img/background.jpg');
  background-size: cover;
}

/*necessário pra modificar o BG do v-app*/
#forceBackground{ 
  background:none;
}

/*necessário para espaçar o cointainer de mensagens do app-bar e do bottom-bar*/
#space{ 
 margin-bottom:70px;
 margin-top:20px;
}

#images{
  margin-top:8px;
  margin-left:15px;
  margin-right:15px
}

#subbar{
  background-color:#9b2501aa;
  margin-top:60px;
  height:85px;
  padding:0px
}

#subbarfriends{
  background-color:#1d100caa;
  margin-top:60px;
  height:85px;
  padding:0px
}

#subbarfriendsinfo{
  background-color:#df340088;
  height:85px;
  padding:0px
}

#new{
  height:auto;
  margin:0px;
  background-color:#611a06f1;
  padding:10px
}

#subs{
  color:white;
  margin-bottom:-30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size:18px;
  margin-top:-40px
}

.centered-input >>> input {
  margin-left:30px;
  text-align: center 
}

.btn2{
  color:white;
  background-color:#33150bee;
  height: 30px; 
  margin-bottom:15px
}

#subs2{
  color:white;
  margin-bottom:-20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size:18px;
  margin-top:-40px;
}

.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#prog{
  margin-top:100px
}

</style>
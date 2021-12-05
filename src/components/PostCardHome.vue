<template>

    <v-card elevation="5" outlined :id="postProp.user==this.$store.state.users.userIdentifier ? 'homecardMe' : 'homecardUser'" class='homecard'>
        <!-- SELO DE DATA/HORA -->
        <v-avatar id="avatarhome" :color="this.$store.state.users.lightMode ? '#772206' : '#1d1412'" size="30">
          <v-icon xSmall color="grey">
            {{allias}}
          </v-icon>
        </v-avatar>
        <v-btn id="nick" @click="goToProfile(postProp.user)" rounded elevation="">
            <v-card-subtitle :id="this.$store.state.users.lightMode ? 'lighter-subname' : 'subname'" class="font-weight-bold" >
              {{postProp.whoPosted}}
            </v-card-subtitle>
        </v-btn>
        <v-card-subtitle :id="this.$store.state.users.lightMode ? 'lighter-stamp' : 'stamp'" class="font-weight-bold" >
          {{defineDate(postProp.createdAt)}}
        </v-card-subtitle>
        <center>
            <v-img id="images" v-if="postProp.image" :src="postProp.fileUrl" max-width="300px"/>
            <v-card-text id="msg" style="text-shadow:2px 2px #00000075">{{postProp.text}}</v-card-text>
        </center>
        <div v-if="postProp.user==this.$store.state.users.userIdentifier">
            <v-card-actions>
                <v-spacer/>
                <!-- BOTÃO DE EDITAR -->
                <v-btn style="float:left;margin-bottom:-17px" v-if="!editing" @click="edit()" icon >  
                    <v-icon color="white">mdi-pencil-outline</v-icon>
                </v-btn>
                <!-- BOTÃO DE EXCLUIR -->
                <v-btn v-if="!editing" @click="deletion=true" icon style="margin-bottom:-17px"> 
                    <v-icon color="white">mdi-trash-can-outline</v-icon>
                </v-btn>
            <v-dialog v-model="deletion" width="600">          
              <v-card dark id="new" elevation="8">          
                <v-card-title style="color:#FF9E80" class="justify-center">
                  Confirmar exclusão?</v-card-title><br> 
                <center>
                  <v-btn class='btn2' style="margin-right:15px" large text @click="erase()">
                    excluir
                  </v-btn>
                  <v-btn class='btn2' large text @click="deletion=false">
                    cancelar
                  </v-btn>
                </center>          
              </v-card>
            </v-dialog>
            </v-card-actions>
                <!-- CAMPO DE TEXTO PARA EDIÇÃO -->
            <v-textarea dark  background-color='#3E272375' rows="1" row-height="15" auto-grow v-if="editing" solo hide-details v-model="newValue" style="margin-left:10px;margin-right:10px"></v-textarea>
            <v-card-actions>
                <v-spacer/>
                <!-- BOTÃO DE SALVAR ALTERAÇÕES -->
                <v-btn v-if="editing" :color="this.$store.state.users.lightMode ? '#631e09' : '#ff5622' " @click="save(), editing=false" icon> 
                    <v-icon>mdi-check-bold</v-icon>
                </v-btn>
                <!-- BOTÃO DE CANCELAR EDIÇÃO -->
                <v-btn v-if="editing" icon @click="editing=false" > 
                    <v-icon color="#1d1412">mdi-close-thick</v-icon>
                </v-btn>  
            </v-card-actions>
        </div>       
    </v-card>

</template>


<script>

import axios from 'axios'

export default {

    props: {
        postProp:{
            type: Object,
            required: true
        },   
    },

    data: () => {  
        return {
            editing: false, 
            newValue: '',
            allias: '',
            deletion: false,
        }
    },

    created() {
        this.allias = this.postProp.whoPosted.charAt(0) + this.postProp.whoPosted.substr(this.postProp.whoPosted.indexOf(' ')+1).charAt(0)
    },
    
    methods: {

        //USANDO API REST
        async save(){
            if(/\S/.test(this.newValue)){
            let temp = this.newValue.replace(/\n+$/, "")    
            let data = {
                ...this.postProp,
                text: temp,
            }
            await axios.put(
                `https://beyondvndergrovnd-odiovqtb5q-uc.a.run.app/adds/${this.postProp.id}`, data,
              {
                headers: {
                  Authorization: "Bearer autenticado"
                },
            }) 
            }else{
                alert("Impossível atualizar - Mensagem vazia")
            }
             this.$emit('changes')
        },

        //USANDO API REST
        async erase(){ 
            await axios.delete(
                `https://beyondvndergrovnd-odiovqtb5q-uc.a.run.app/kill/${this.postProp.id}`, 
              {
                headers: {
                  Authorization: "Bearer autenticado"
                },
            })
            this.deletion=false 
            this.$emit('changes')
        },

        defineDate(date){
            const time = (('0' + (new Date(date).getDate())).slice(-2) + "/" + 
                          ('0' + (new Date(date).getMonth() + 1)).slice(-2) + "/" + 
                          (new Date(date).getFullYear()) + " " + 
                          (new Date(date).toLocaleTimeString()))                        
            return time    
        },

        edit(){
            this.editing = true
            this.newValue = this.postProp.text
        },
        
        goToProfile(user){
            this.$router.push({ path:`/profile/${user}`, params: {id:user}})
        },       
    }
}

</script>


<style>

#subname{
  margin-top:0px;
  font-size: 15px;
  color:#ff7b53;
  margin-left:-15px;
  text-shadow:2px 2px #00000075
}

#stamp{
  margin-top:-25px;
  font-size:13px;
  color:grey
}

#nick{
  background-color:transparent;
  padding:0px
}

#avatarhome{
  margin:8px;
  margin-top:10px;
  float:left;
  font-size: 20px;
}

.homecard{
  margin-top:17px;
  margin-left:15px;
  margin-right:15px;
}

#homecardMe {
  background-color:#584840aa;
}

#homecardUser {
  padding-bottom:33px;
  background-color:#584840aa;
}

</style>
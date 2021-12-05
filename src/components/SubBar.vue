<template>

    <v-card dark >
        <v-avatar id="avatar" color="#1d1412" size="56">    
            <v-img v-if="propUser.image" :src="propUser.image" max-width="100px"/>
            <div v-else style="font-size:23px">{{this.nick}}</div>
        </v-avatar>
            <v-card-title id="title">{{propUser.name}}</v-card-title>
            <v-card-subtitle id='subt'>{{propNum}} posts</v-card-subtitle>
            <v-card-actions>
                <v-spacer/>
                <!-- BOTÃO DE APAGAR TUDO -->
                <v-btn :disabled="propNum>0 ? false : true" x-small color="#1d1412" @click="massDeletion=true" style="margin-top:-20px">
                    Excluir Tudo
                </v-btn>
            </v-card-actions>
            <v-dialog v-model="massDeletion" width="600">
                <v-card dark id="new" elevation="8">          
                    <v-card-title style="color:#FF9E80" class="justify-center">
                        Confirmar exclusão GERAL?</v-card-title><br>                    
                    <center>
                        <v-btn class='btn'  style="margin-bottom:15px;margin-right:15px" small elevation="1" text @click="eraseAll()">
                        excluir tudo
                        </v-btn>
                        <v-btn class='btn2' large text @click="massDeletion=false">
                        cancelar
                        </v-btn>
                    </center>          
                </v-card>
            </v-dialog>
     </v-card>
    
</template>


<script> 

import { firestore } from '../config/firebase.js'
export default {

   created(){
        firestore.collection('users')
        .where('uid', '==', this.propUser.uid)
        .onSnapshot(snap => {
          snap.forEach(doc => {
            this.nick = doc.data().name.charAt(0) + doc.data().name.substr(doc.data().name.indexOf(' ')+1).charAt(0)
          })
        })
      },

     props: {
        propUser:{
            type: Object,
            required: true
        },
        
        propNum: {
            type: Number,
            required: true
        }
    },

    data(){
        return {
            nick: '',
            massDeletion: false
        }
    },

    methods: {
        eraseAll(){
            this.$emit('erase')
            this.massDeletion = false
        }
    }
}

</script>


<style scoped>

#title{
    padding:15px;
    font-size:19px;
    background-color:transparent;
}

#avatar{
    margin:15px;
    float:left
}

#subt{
    padding-left:15px;
    float:left
}

</style>
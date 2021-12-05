<template>

    <v-card elevation="5" dark id='cardPost'>
        <v-card-subtitle class="font-weight-bold" :style="this.$store.state.users.lightMode ? 'font-size:13px;color:#000000cc' : 'font-size:13px;color:grey'" >{{defineDate(postProp.createdAt)}} </v-card-subtitle>
        <center>
            <v-img id="images" v-if="postProp.image" :src="postProp.fileUrl" max-width="300px"/>
            <v-card-text id="msg" style="text-shadow:2px 2px #00000075">{{postProp.text}}</v-card-text>
        </center>
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
                    Confirmar exclusão?
                </v-card-title>
                <br> 
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
        <v-textarea  background-color='#3E272375' rows="1" row-height="15" auto-grow v-if="editing" solo hide-details v-model="newValue" style="margin-left:10px;margin-right:10px"></v-textarea>
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
    </v-card>

</template>


<script>
import axios from 'axios'
export default {

    created(){
    this.$emit('created')
    },

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
            deletion: false
        }
    },
    
    methods: {

        defineDate(date){
            const time = (('0' + (new Date(date).getDate())).slice(-2) + "/" + 
                          ('0' + (new Date(date).getMonth() + 1)).slice(-2) + "/" + 
                          (new Date(date).getFullYear()) + " " + 
                          (new Date(date).toLocaleTimeString()))
            return time            
        },

        //USANDO API REST
        save(){
            if(/\S/.test(this.newValue)){
                let temp = this.newValue.replace(/\n+$/, "")
                let data = {
                    ...data,
                    text: temp,
                }
                axios.put(
                    `https://beyondvndergrovnd-odiovqtb5q-uc.a.run.app/adds/${this.postProp.id}`, data,
                        {
                            headers: {
                            Authorization: "Bearer autenticado"
                        },
                }) 
            }else{
                alert("Impossível atualizar - Mensagem vazia")
            }
        },

        //USANDO API REST
       async erase(){ 
         await   axios.delete(
                `https://beyondvndergrovnd-odiovqtb5q-uc.a.run.app/kill/${this.postProp.id}`, 
                    {
                        headers: {
                        Authorization: "Bearer autenticado"
                    },
            }) 
            this.deletion=false
        },

        edit(){
            this.editing = true
            this.newValue = this.postProp.text
        },
    }
}

</script>
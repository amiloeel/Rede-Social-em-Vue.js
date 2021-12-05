<template>
    
    <v-card height="60" style="margin-bottom:-10px" @click="goToProfile($route.params.id)">
        <v-avatar id="avatar" :color="this.$store.state.users.lightMode ? '#1d1412' : '#982906'" size="35">
            <v-icon color="white">mdi-chat-processing</v-icon>
        </v-avatar>
        <v-card-title id="title">{{this.userInfo.name}}</v-card-title>
    </v-card>
    
</template>


<script> 

import { firestore } from '../config/firebase.js'

export default {

    data() {
        return {
            userInfo: []
        }
    },

    created(){
        firestore.collection('users')
        .where('uid', '==', this.$route.params.id)
        .onSnapshot(snap => {
            snap.forEach(doc => {
                this.userInfo = doc.data()
            })
        })
    },

    methods: {
        goToProfile(id){
        this.$router.push({ path:`/profile/${id}`, params: {id:id}})
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
    float:left;
    font-size: 20px;
}

#subt{
    padding-left:15px;
    float:left
}

</style>
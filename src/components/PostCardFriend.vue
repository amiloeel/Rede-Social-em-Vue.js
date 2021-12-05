<template>

    <v-card dark elevation="5" id="cardPost" v-if="postProp">
        <v-card-subtitle class="font-weight-bold" :style="this.$store.state.users.lightMode ? 'font-size:13px;color:#000000cc' : 'font-size:13px;color:grey'">
            {{defineDate(postProp.createdAt)}}
        </v-card-subtitle>
        <center>
            <v-img id="images" v-if="postProp.image" :src="postProp.fileUrl" max-width="300px"/>
            <v-card-text id="msg" style="margin-bottom:10px;text-shadow:2px 2px #00000075">
                {{postProp.text}}
            </v-card-text>
            <br>
        </center>  
    </v-card>
   

</template>


<script>

export default {

    created(){
        this.$emit('created')
    
    },

     props: {
        postProp:{
            type: [Array, Object],
            required: true
        },
    },

    methods: {
        defineDate(date){
            const time = (('0' + (new Date(date).getDate())).slice(-2) + "/" + 
                          ('0' + (new Date(date).getMonth() + 1)).slice(-2) + "/" + 
                          (new Date(date).getFullYear()) + " " + 
                          (new Date(date).toLocaleTimeString()))
            return time
        }
    }
}

</script>
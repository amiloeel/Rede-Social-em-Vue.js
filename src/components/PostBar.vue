<template>
    
    <v-card :id="this.$store.state.users.lightMode ? 'lighter-postbar' : 'postbar' ">
        <v-container >
            <v-textarea :dark="this.$store.state.users.lightMode ? false : true" :background-color="this.$store.state.users.lightMode ? '#99999955' : '#1d141299'" rows="1" row-height="15" auto-grow @keyup.enter="newPost()" v-model="field" solo hide-details label="Criar publicação..."></v-textarea>
            <v-card-actions>
                <v-spacer/>
                <div id="white">
                    <v-file-input id="files" :prepend-icon="!file ? 'mdi-image-plus' : 'mdi-check-bold'" hide-input v-model="file" accept="image/*" label="x" solo hide-details=""/>
                </div>
                <v-btn @click="newPost()" icon style="margin-top: 12px">
                    <v-icon :color="this.$store.state.users.lightMode ? '#1d100c' : 'white' ">mdi-send</v-icon>
                </v-btn> 
            </v-card-actions>
        </v-container>     
    </v-card>

</template> 


<script> 

export default {

    data() {
        return {
            field:'',
            file: null
        }
    },

    methods: {
       async newPost(){
            let temp = this.field.replace(/\n+$/, "")
            let newPostage = {
                    image: this.file,
                    text: temp,
                    user: this.$store.state.users.userIdentifier,
                    whoPosted: this.$store.state.users.userData.name,
            }
            this.$emit('newpost', newPostage)
            this.field = ''
            this.file = null
        },
        
    }
}

</script>


<style scoped>

#white{
    padding-left: 15px;
    padding-top:5px
}



</style>
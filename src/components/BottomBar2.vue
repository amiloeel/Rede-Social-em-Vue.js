<template>

    <v-app-bar fixed bottom id="app" >
        <v-text-field dark class="texting" @keyup.enter="envia()" v-model="campo" solo hide-details label="Enviar mensagem..."/>
        <div id="white">
            <v-file-input id="files" :prepend-icon="!file ? 'mdi-image-plus' : 'mdi-check-bold'" hide-input v-model="file" accept="image/*" label="x" solo hide-details=""/>
        </div>
        <v-btn @click="envia()" icon>
            <v-icon color="white">mdi-send</v-icon>
        </v-btn>
    </v-app-bar>

</template>


<script> 

export default {

    data() {
        return {
            campo:'',
            file: null
        }
    },

    methods: {
        envia(){
            let temp = this.campo
            temp = temp.replace(/\n+$/, "")
            let newMessage = {
                name: 'Me',
                text: temp,
                file: this.file
            }
            this.$emit('send', newMessage)
            this.campo = '',
            this.file = null
        }
    }
}

</script>


<style scoped>

#white{
    padding-left: 15px;
    padding-bottom: 10px;
}

#app{
    background-color: rgb(95, 65, 55)
}

</style>
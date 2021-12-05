<template>

    <v-card outlined :id="mensagemProp.name != 'Eu' ? 'cardUser' : 'cardMe'">
        <v-card-subtitle class="font-weight-bold">{{mensagemProp.name == 'Eu' ? 'Eu' : mensagemProp.name.split(' ')[0]}}</v-card-subtitle>
        <v-card-text id="msg" >{{mensagemProp.texto}}</v-card-text>
    </v-card>

</template>


<script>

export default {
    props: {
        mensagemProp:{
            type: Object,
            required: true
            }
        }
    }

</script>


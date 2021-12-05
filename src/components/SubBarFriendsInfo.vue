<template>

    <v-card style="height:auto" v-if="propData[0]">
        <div v-if="!propData[0].privacy">
            <v-card-subtitle id='infos' >Telefone: {{propData[0].phone}}&emsp;/&emsp; Cidade: {{propData[0].address}}</v-card-subtitle>
            <br>
            <v-card-subtitle id='infos'>Empresa: {{propData[0].company}}&emsp;/&emsp; Idade: {{propData[0].age}}</v-card-subtitle>
            <br>
            <v-card-subtitle id='infos'>E-mail: {{propData[0].email}}</v-card-subtitle>
        </div>
        <div v-if="propData[0].privacy">
            <center>
                <v-card-subtitle id='infos'>As informações desse perfil são privadas.</v-card-subtitle>
            </center>
        </div>   
     </v-card>
    
</template>


<script> 

export default {
    props: {
        propData:{
            type: Array,
            required: true
        },
    },
}

</script>


<style scoped>

#infos{
   margin-bottom:-60px;
   font-size:15px;
   color:white
}

</style>
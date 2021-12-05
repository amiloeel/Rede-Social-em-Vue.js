<template>

    <v-card dark v-if="propData[0]">
        <v-avatar id="avatar" :color="this.$store.state.users.lightMode ? '#1d100c' : '#982906'" size="56" style="font-size:23px">
            <v-img v-if="propData[0].image" :src="propData[0].image" max-width="100px"/>
            <div v-else style="font-size:23px">{{propData[1]}}</div>
        </v-avatar>
        <v-card-title id="title">{{propData[0].name}}</v-card-title>
        <v-card-subtitle id='subt'>{{propNum}} posts</v-card-subtitle>    
        <v-card-actions>
            <v-spacer/>
            <v-btn v-if="propData[0].uid!=this.$store.state.users.userIdentifier"  @click="startChating()" style="margin-top:-60px;margin-right:20px"  icon>
                <v-icon large :color="this.$store.state.users.lightMode ? '#1d100c' : '#eb5b19'">mdi-chat-plus</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
    
</template>


<script> 

export default {
    props: {
        propData:{
            type: [Array, Object],
            required: true
        },

        propNum:{
            type: Number,
            required: true
        }
    },

    methods: {
        startChating(){
            this.$router.push({ path:`/dialogue/${this.propData[0].uid}`, params: {id:this.propData[0].uid}})
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
    font-size: 19px;
}

#subt{
    padding-left:15px;
    float:left
}

</style>
<template>

    <v-card @click="goToDialogue(friendProp)" :id="this.$store.state.users.lightMode ? 'lighter-cardChat' : 'cardChat'">
      <v-avatar id="avatar" color="#1d1412" size="56">
        <v-icon color="white">mdi-chat</v-icon>
      </v-avatar>
      <v-card-text id="friends">{{nameProp}}</v-card-text>
    </v-card>

</template>


<script>

export default {
    props: {
        friendProp:{
            type: String,
            required: true
        },

        nameProp:{
            type: String,
            required: true
        }
    },

    created(){
      this.$emit('created')
    },

    methods: {
        goToDialogue(friendProp){
            this.$router.push({ path:`/dialogue/${friendProp}`, params: {id:friendProp}})
        }
    }
}

</script>


<style scoped>

#avatar{
  float:left;
  margin-right:15px;
}

#cardChat {
  padding:10px;
  margin-top:10px;
  margin-left:15px;
  margin-right:15px;
  background-color:#aa3511aa;
}

#friends{
  font-size:18px;
  color:white
}

</style>
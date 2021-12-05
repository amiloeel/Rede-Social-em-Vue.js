<template>

    <v-card dark :idProp=friendProp.id @click="goToProfile(friendProp)" id="cardFriend">
      <v-avatar id="avatar" color="#7f1e00" size="56">{{friendProp.nick}}
        <v-icon color="white">mdi-account</v-icon>
      </v-avatar>
      <v-card-text id="friends">{{friendProp.name}}</v-card-text>          
    </v-card>

</template>


<script>

export default {

    props: {
        friendProp:{
            type: Object,
            required: true
        }
    },

    created(){
      this.$emit('created')
    },

    methods: {
        goToProfile(friendProp){
            this.$router.push({ path:`/profile/${friendProp.uid}`, params: {id:friendProp.uid}})
        },
    }
}

</script>


<style scoped>

#avatar{
  float:left;
  margin-right:15px
}

#cardFriend {
  padding:10px;
  margin-top:10px;
  margin-left:15px;
  margin-right:15px;
  background-color:#2e130c9d;
}

#friends{
  color:white;
  font-size:18px;
  text-shadow:2px 2px #00000075;
}

</style>
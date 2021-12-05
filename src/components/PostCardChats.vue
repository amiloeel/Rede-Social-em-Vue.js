<template>
  <div :id="this.$store.state.users.lightMode ? 'normal' : ''">
    <v-card elevation="5" outlined :id="postProp.from==this.$store.state.users.userIdentifier ? 'cardMe' : 'cardUser'" 
            :style="postProp.nameSender==='DEV Fairy of Wishes' ? 'margin-left:30px;margin-right:30px;background-color:#019b34aa;padding:0px;' : ''">
        <center>
          <v-card-subtitle v-if="postProp.nameSender==='DEV Fairy of Wishes'" style="color:white">DEV Fairy of Wishes says:</v-card-subtitle>
            <v-img id="images" v-if="postProp.file" :src="postProp.fileUrl" max-width="300px"/>
            <v-card-text :id="postProp.from==this.$store.state.users.userIdentifier ? 'msgMe' : 'msgUser'" 
                         :style="postProp.file && !postProp.text ? 'margin-bottom:-60px' : ''" >{{postProp.text}}</v-card-text>           
            <br>
        </center> 
    </v-card>
  </div>
</template>


<script>

export default {

  created(){
    this.$emit('created')
  },

    props: {
        postProp:{
            type: Object,
            required: true
        }
    }
}

</script>


<style>


#cardMe{
  margin-top:10px;
  margin-left:35px;
  margin-right:0px;
  background-color:#4b413daa;
}

#cardUser{
  margin-top:10px;
  margin-left:0px;
  margin-right:35px;
  background-color:#c4390eaa;
}

#msgUser{
  margin-top:5px;
  color:white;
  font-size:17px;
  text-align: left;
}

#msgMe{
  margin-top:20px;
  color:white;
  font-size:17px;
  text-align: right;
}

</style>
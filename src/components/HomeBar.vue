<template>

    <v-app-bar fixed style="margin-top:60px">
        <v-container>
            <v-layout row justify-center>
                <v-card style="margin-bottom:10px;margin-left:-20px" color=transparent elevation="0">           
                    <v-card-actions>
                        <v-flex xs4 md4>
                            <v-btn @click="goToFriends()" rounded large elevation="0" :style="this.$store.state.users.lightMode ? 
                                    'color:white;padding:12px;margin-top:10px;background-color:#772206;font-size:13px;margin-right:8px' : 
                                    'color:white;padding:12px;margin-top:10px;background-color:#1d1412;font-size:13px;margin-right:8px'">
                                <v-icon class="icns" :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-account-multiple</v-icon>
                                REDE
                            </v-btn>
                        </v-flex>
                        <v-flex xs4 md4>
                            <v-btn @click="goToChats()" rounded large elevation="0" :style="this.$store.state.users.lightMode ? 
                                    'color:white;padding:12px;margin-top:10px;background-color:#772206;font-size:13px;margin-right:8px' : 
                                    'color:white;padding:12px;margin-top:10px;background-color:#1d1412;font-size:13px;margin-right:8px'">
                                <v-icon class="icns" :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-wechat</v-icon>
                                CHAT
                            </v-btn>
                        </v-flex>
                        <v-flex xs4 md4>
                            <v-btn @click="goToMyProfile()" rounded large elevation="0" :style="this.$store.state.users.lightMode ? 
                                    'color:white;padding:12px;margin-top:10px;background-color:#772206;font-size:13px;margin-right:8px' : 
                                    'color:white;padding:12px;margin-top:10px;background-color:#1d1412;font-size:13px;margin-right:8px'">
                                <v-icon class="icns" :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-note</v-icon>
                                POSTS
                            </v-btn>
                        </v-flex>
                        <v-flex xs1 md1>
                            <v-btn @click="toggleTheme()" rounded small fab elevation="0" :style="this.$store.state.users.lightMode ? 
                                    'padding:22px;margin-top:10px;background-color:#772206' : 
                                    'padding:22px;margin-top:10px;background-color:#1d1412'">
                                <v-icon :color="this.$store.state.users.lightMode ? 'white' : '#ff5a31'">mdi-brightness-4</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>
    </v-app-bar>
    
</template>


<script> 

export default {
    methods: {
        goToMyProfile(){
            this.$router.push('/myProfile')
        },

        goToFriends(){
            this.$router.push('/friends')
        },

        goToChats(){
            this.$router.push('/chats')
        },

        toggleTheme(){
             this.$emit('light')
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

#subt{
    padding-left:15px;
    float:left
}

.icns {
    margin-right:5px;
}

</style>
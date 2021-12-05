<template>

  <div id="app"  class="background2">
    <v-app id="forceBackground">  
        <v-card id='login' elevation="20">
          <center>    
              <v-img id="images" src="../img/vv.png"></v-img>
              <v-form class="log" >
                <!-- CAMPOS DE LOGIN -->
                <v-card-subtitle id='subsx'>
                  LOGIN
                </v-card-subtitle>
                <v-text-field class="centered-input" dark v-model="idField" clearable style="color:white"></v-text-field>   
                <v-card-subtitle id='subsx' >
                  SENHA
                </v-card-subtitle>
                <v-text-field dark @keyup.enter="dialogOne=true, doLogin()" type="password" class="centered-input" v-model="keyField" clearable></v-text-field>
                <v-dialog v-model="dialogOne" >
                  <template v-slot:activator="{on3,attrs3}">
                    <v-btn rounded id='btn' @click="doLogin()" elevation="7"  v-bind="attrs3" v-on="on3">
                      ACESSAR
                    </v-btn>
                  </template>
                  <center>
                    <v-card color="transparent" style="box-shadow: none">
                      <v-progress-circular indeterminate :size="100" id='prog' :width="10" color='#c02d00ee' />
                    </v-card>
                  </center>
                </v-dialog>
                <br>
                <!-- GOOGLE -->
                <v-btn rounded small id='btn3' @click="loginWithGoogle()">
                  ENTRAR COM 
                  <v-icon style="margin-left:5px">mdi-google</v-icon>
                  oogle
                </v-btn>
                <br>
                <!-- TRIGGER NOVA CONTA -->
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{on,attrs}">
                    <v-btn rounded small id='btn2' v-bind="attrs" v-on="on">
                      CRIAR CONTA
                    </v-btn>
                  </template>
                  <!-- NOVA CONTA -->
                  <v-card id="new" elevation="50">
                    <center>
                      <v-card-title style="color:#FF9E80" class="justify-center">CRIAR NOVA CONTA</v-card-title><br>                   
                      <!-- NOVAS CREDENCIAIS -->
                       <v-card-subtitle id='subsx'>                      
                        Nome + Sobrenome
                      </v-card-subtitle>
                      <v-text-field dark class="centered-input"  v-model="name" hint="Será exibido como seu nome de usuário" clearable style="margin:20px"/>
                      <v-card-subtitle id='subsx'>                      
                        Digite seu e-mail
                      </v-card-subtitle>
                      <v-text-field dark class="centered-input"  v-model="idNew" clearable style="margin:20px"/>
                      <v-card-subtitle id='subsx'>
                        Digite uma senha
                      </v-card-subtitle>
                      <v-text-field dark class="centered-input"  v-model="keyNew" type="password" hint="Pelo menos 6 caracteres " clearable style="margin:20px"/>
                      <v-card-actions>                      
                        <!-- CANCELA -->
                        <v-btn class='btn' small text @click="dialog = false" >
                            Cancelar
                        </v-btn>
                        <v-spacer/>
                        <!-- TRIGGER END -->
                        <v-dialog v-model="dialogOk" width="500">
                          <template v-slot:activator="{on2,attrs2}">
                          <v-btn class='btn2' x-large text @click="createAcc()"  v-bind="attrs2" v-on="on2">
                              Criar
                            </v-btn>
                          </template>
                          <!-- END -->
                          <v-card id='created'>                            
                            <v-card-title id='isCreated' class='justify-center'>  
                              FAVOR REALIZAR O LOGIN COM<br> SEU E-MAIL E A SENHA CRIADA
                            </v-card-title>
                            <center>
                            <v-btn id='okCreated' small text @click="resetErrorMsg(), dialog = false" >OK
                              <v-icon large>mdi-account-check</v-icon>
                            </v-btn>
                            </center>
                          </v-card>
                        </v-dialog>
                      </v-card-actions>
                    </center>
                  </v-card>
                </v-dialog>
              </v-form>
          </center>
        </v-card>
    </v-app>
  </div>

</template>


<script>

  export default{
    data(){
      return {
        name: "",
        idField: "",
        keyField: "",
        dialog: false,
        dialogOk: false,
        dialogOne: false,
        idNew: "",
        keyNew: "",
      }
    },

    methods:{
      async doLogin(){
        if(this.idField!='' && this.keyField!=''){
          this.dialogOne=true;
          this.$store.dispatch("users/authenticate", {
            email: this.idField,
            password: this.keyField
          })
        }else{
          alert("Preencha os campos para poder acessar!")
        }
      },
      
      createAcc(){
        if(this.idNew!='' && this.keyNew!=''){
        this.$store.dispatch("users/create", {
          name: this.name,
          email: this.idNew,
          password: this.keyNew
        })
        }else{
          alert("Preencha os campos para poder criar sua conta!")
        }
      },

      async loginWithGoogle(){
        this.$store.dispatch("users/loginGoogle")
      },
    }       
  }

</script>


<style scoped>

#prog{
  margin:50px;
  border: none;
}

.centered-input >>> input {
      margin-left:30px;
      text-align: center 
    }

.background2 {
  background: fixed center;
  background-image: url('../img/backgroundlog.jpg');
  background-size: cover;
}

#forceBackground{ 
  background:none;
}

.btn{
  background-color: #360a00ee;
  float:left;
  color:white
}

.btn2{
  color:white;
  background-color:#c72f01ee;
  float:left;
}

#new{
  height:auto;
  margin:0px;
  background-color:#611a06f1;
  padding:10px
}

#login{
  height:auto;
  margin:30px;
  background-color:#852c1155;
  padding:20px
}

#created{
  height:auto;
  margin:0px;
  background-color:#440c00;
}

#images{
  margin-bottom:20px;
  width:60%;
}

#subsx{
  color:white;
  margin-bottom:-30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size:18px
}

#isCreated{
  color:white;
  margin-bottom:-30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size:15px;
  text-align: center;
  margin-top:10px
}

#btn{
  color:white;
  background-color:#360a00;
  height: 50px;
  margin-bottom: 30px;
  margin-top:10px;
}

#okCreated{
  background-color:#FF9E80;
  height: 50px;
  margin-bottom: 30px;
  margin-top:50px;
  font-size:18px
}

#btn2{
  color:white;
  background-color:#7b1e01ee;
  height: 30px;
  margin-top:10px
}

#btn3{
  color:white;
  background-color:#7b1e01ee;
  height: 40px;
}


</style>
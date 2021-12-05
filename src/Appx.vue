<template>
<!-- div necessária para setar BG do v-app -->
<div id="app"  class="fundo">
  <!-- classe para forçar remoção do BG do v-app -->
  <v-app id="gambiarra">
    <v-main id="fundo"> 
      <v-app-bar id="titulo" class="justify-center" fixed>{{nome}}</v-app-bar>
      <!-- div para aplicar autoscroll -->
      <div id="scroller">
      <div class="messages-container" id="space">  
          <div v-for="(mensagem, index) in mensagens" :key="index">
          <message-card :mensagemProp="mensagem"/> 
        </div></div></div>
      <!-- div âncora do autoscroll -->  
      <div id="anchor"></div>
      
      <post-bar @envia-msg="addMsg($event)"/>
    </v-main>
  </v-app></div>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
import BottomBar from './components/PostBar.vue'
export default{
  components: {
    MessageCard,
    BottomBar
  },
  data(){
    return{
      nome: "José Mancoso",
      mensagens: [
      {
        name: "José Mancoso",
        texto: "vi uma msg sua no grupo lá, blz?"
      },
      {
        name: "José Mancoso",
        texto: "tudo bom?"
      },
      {
        name: "Eu",
        texto: "opa mano"
      },
      {
        name: "Eu",
        texto: "tudo massa digai"
      },
      {
        name: "José Mancoso",
        texto: "acho q vc tá errado man"
      },
      {
        name: "Eu",
        texto: "??"
      },
      {
        name: "José Mancoso",
        texto: "vê só se são dois carros um potente e outro mufino"
      },
      {
        name: "José Mancoso",
        texto: "tipo se eu tenho uma ferrari top a 200km por hora e um fusquinha a 200km por hora"
      },
      {
        name: "José Mancoso",
        texto: "tu acha msm que vai ficar lado a lado os 2?"
      }
    ]
  }
},
computed:{
  primNome(){
    console.log('primNome')
    return this.nome.split(' ')[0]
  }
},
methods: {
  addMsg(event){
    console.log(event)
    //impede o push de uma mensagem vazia
    if(event.texto!=''){
      this.mensagens.push(event)
    }
  }
}
}
</script>

<style>
/*classes separadas para poder aplicar a margem e cor dependendo de quem enviou a mensagem*/
/*oito dígitos no hexadecimal para setar transparência*/
#cardUser {
  margin-top:10px;
  margin-right: 20px;
  background-color: #ff7043aa;
}
#cardMe {
  margin-top:10px;
  margin-left:20px;
  background-color:#97827aaa
}

#titulo {
  color:white;
  background-color:#1d1412;
  /*necessário para centralizar nome na app-bar*/
  display:flex
}

#msg {
  color:white;
  font-size:15px
}

.fundo {
  background-image: url('https://imgprd19.hobbylobby.com/5/1c/0c/51c0c44256275dbfa5ebc722385df4d3b1dfba4f/700Wx700H-198960-0918.jpg');
  background-size: cover;
}

#gambiarra{ /*necessário pra modificar o BG do v-app*/
  background:none;
}

#space{ /*necessário para espaçar o cointainer de mensagens do app-bar e do bottom-bar*/
 margin-bottom:70px;
 margin-top:65px;
}

/*ativam autoscroll de novas mensagens*/
/*BAD: funciona somente após usuário chegar na âncora pela primeira vez*/
#scroller{
  overflow-anchor: none;
}
#anchor{
  overflow-anchor: auto;
  height: 1px
}




</style>
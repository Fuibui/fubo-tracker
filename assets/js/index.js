function slickCarousel() {
  $(".carousel__avatares").slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6
  })
  console.log("slider init");
}

function unslickCarousel() {
  $(".carousel__avatares").slick("unslick");
  console.log("slider unslicked");
}

function consultarApidoLinn(ID) {
  const url = `https://dfunctions.squareweb.app/tracker/${ID}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {

      // Limpar conteúdo dos elementos antes de inserir novos elementos
      // document.getElementById("nicks").innerHTML = "";
      // document.getElementById("avatars").innerHTML = "";
      // document.getElementById("message__info").innerHTML = "";
      // document.getElementById("message__text").innerHTML = "";
      // document.getElementById("call__info").innerHTML = "";
      

      if(data.message && data.message === "Usuário não encontrado no banco de dados.") {
        document.getElementById("container__pfp").style.display = "none";
        document.getElementById("container__resto").style.display = "none";
        document.getElementById("container__error").style.display = "block";

        console.log('sexo')
        
      } else {
        const avatares = data.tracker.avatars;
        const nicks = data.tracker.usernames;
        const lastMessage = data.tracker.lastMessage;
        const lastVoiceChannel = data.tracker.lastVoiceChannel;
  
        nicks.forEach(nick => {
          const div = document.createElement("div"); // cria uma nova div
          div.classList.add("nick-container"); // adiciona uma classe à nova div
          const p = document.createElement("p");
          p.innerHTML = nick.nick;
          div.appendChild(p); // adiciona a imagem à nova div
          document.getElementById("nicks").appendChild(div); // adiciona a nova div à div com id "avatars"
        });

        avatares.forEach(avatar => {
          const div = document.createElement("div"); // cria uma nova div
          div.classList.add("avatar-container"); // adiciona uma classe à nova div
          const img = document.createElement("img");
          img.src = avatar.avatar;
          div.appendChild(img); // adiciona a imagem à nova div
          document.getElementById("avatars").appendChild(div); // adiciona a nova div à div com id "avatars"
        });

        const message__info = document.getElementById("message__info");
        const message__text = document.getElementById("message__text");

        message__info.innerHTML = `Servidor: ${lastMessage.guildName} <br> Canal: ${lastMessage.channelName} \n`;
        message__text.innerHTML = lastMessage.messageContent;

        const call__info = document.getElementById("call__info");

        call__info.innerHTML = `Servidor: ${lastVoiceChannel.guildName} <br> Canal: ${lastVoiceChannel.channelName} \n`;
      
        const carousel = $(".carousel__avatares");

        if(carousel.hasClass("slick-initialized")) {
          carousel.slick('unslick');
        }

        console.log("slider init");

        //set the container__tracker to visible by changing the display: none to display: flex
        document.getElementById("container__pfp").style.display = "flex";
        document.getElementById("container__resto").style.display = "flex";
        document.getElementById("container__error").style.display = "none";

        slickCarousel();
      }
  })
  .catch(error => {
      console.error("Erro ao fazer requisição:", error);
  });
}



// consultarApidoLinn('1003399541648789555')

//On button click gets input field value
function getID() {
  const ID = document.getElementById("search__bar").value;
  consultarApidoLinn(ID);
}

// on button click calls getID function
document.getElementById("search__button").addEventListener("click", getID);


  

  



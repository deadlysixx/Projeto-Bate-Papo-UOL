let userToSend = 'Todos';
let messageStatus = 'Público';
let typeMessage, dataFormatted, type, to, prevMess, curMess, getHour, hourFormatted;
let count = 0;
let getUserStillActive = '';

// Autenticação no Chat
function signin() {
    const nameInput = document.querySelector(".name-section input").value;
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants/04ec5f53-74f5-4dce-b49d-8a6f52338b90", { name: nameInput });

    document.querySelector(".name-section").classList.add("hidden");
    document.querySelector(".loading").classList.remove("hidden");

    promise.then(getInChat);
    promise.catch(validateName);
}

function getInChat() {
    document.querySelector(".name-error").innerHTML = "";
    document.querySelector(".signin").classList.add("hidden");

    setInterval(keepUserConnected, 5000);
    setInterval(getMessages, 3000);
    setInterval(getAllUsersConnected, 10000);
}


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

function validateName(err) {
    document.querySelector(".name-section").classList.remove("hidden");
    document.querySelector(".loading").classList.add("hidden");
    document.querySelector(".name-error").innerHTML = `Erro ${err.response.status} - Nome já inserido no chat! Tente outro...`;
    document.querySelector(".name-section input").value = "";
}

// Carregar e resetar mensagens
function resetAndLoadMessages() {
    document.querySelector("main").innerHTML = "";

    if (document.querySelector("main").innerHTML) document.querySelector(".loading-messages").classList.remove("hidden");
    else document.querySelector(".loading-messages").classList.add("hidden");
}

// Validação de usuários
function keepUserConnected() {
    const nameInput = document.querySelector(".name-section input").value;
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status/04ec5f53-74f5-4dce-b49d-8a6f52338b90", { name: nameInput });

    promise.then((res) => res.data);
}

// Cor da mensagem
function messageColorByType(type) {
    if (type === 'status') typeMessage = 'in-out-color';
    else if (type === 'message') typeMessage = '';
}

// Formação de relógio Padrão (GMT-3)
function getHourFormatted(hour) {
    getHour = hour.split(':')[0];
    hourFormatted = Number(getHour - 3);

    if (hourFormatted <= 0) hourFormatted = (hourFormatted + 12).toString();

    if (hourFormatted < 10) hourFormatted = `0${hourFormatted}`;
    else hourFormatted = hourFormatted.toString();

    dataFormatted = hour.replace(getHour, hourFormatted);
}

// Carregando mensagens em HMTL
function loadMessages(to, from, type, text) {
    const nameInput = document.querySelector(".name-section input").value;

    if (type === "private_message") {
        if (to === nameInput || from === nameInput) {
            document.querySelector("main").innerHTML += `
                <div class="message reserved-color">
                    <p class="text">
                        <span class="hour">(${dataFormatted})</span>
                        <strong>${from}</strong> reservadamente para <strong>${to}</strong>: ${text}
                    </p>
                </div>
            `;
        }

    } else {
        document.querySelector("main").innerHTML += `
            <div class="message ${typeMessage}">
                <p class="text">
                    <span class="hour">(${dataFormatted})</span>
                    <strong>${from}</strong> para <strong>${to}</strong>: ${text}
                </p>
            </div>
        `;
    }
}

// Descendo barra de rolagem a cada nova mensagem
function scrollToEveryNewMessage(message) {
    let length = message.length - 1;

    if (count === 0) {
        prevMess = message[length].time;
        if (curMess !== null) {
            if (prevMess !== curMess) {
                let screenHeight = "" + window.innerHeight / 8;
                document.querySelector(".message:last-child").scrollIntoView(false);
                window.scrollBy(0, screenHeight);
            }
        }
        count++;
    } else if (count === 1) {
        curMess = message[length].time;
        count++;
        if (prevMess === curMess) count = 0;
        else {
            let screenHeight = "" + window.innerHeight / 8;
            document.querySelector(".message:last-child").scrollIntoView(false);
            window.scrollBy(0, screenHeight);
            count = 0;
        }
    }
}

// Carregando todas as novas mensagens
function getMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages/04ec5f53-74f5-4dce-b49d-8a6f52338b90");

    promise.then((res) => {
        resetAndLoadMessages();

        for (let i = 0; i < res.data.length; i++) {
            messageColorByType(res.data[i].type);
            getHourFormatted(res.data[i].time);
            loadMessages(res.data[i].to, res.data[i].from, res.data[i].type, res.data[i].text);
        }
        scrollToEveryNewMessage(res.data);
    });
}

// Selecionando usuário e status
function getUserAndStatus() {
    to = userToSend !== undefined ? userToSend : "Todos";

    if (messageStatus !== undefined) {
        if (messageStatus === "Público") type = "message";
        else if (messageStatus === "Reservadamente") type = "private_message";
    } else {
        type = "message";
    }
}

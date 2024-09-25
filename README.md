# Projeto - Bate-Papo UOL

## 📝 Descrição

- Seu próximo projeto com JavaScript será a implementação de um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL (e se você não viveu essa época, só lamentamos, rs).
- No entanto, assim como fizemos no projeto da Globo, evite usar o site real da UOL como referência, pois apesar de inspirado nele, nossa interface é totalmente diferente (entenda diferente como muito melhor 😅).

## 🎨 Layout

Será utilizado o FIGMA para determinar o LAYOUT.

## 🛠️ Recursos

- 📙 Documentação da API
    
    <aside>
    ⚠️ Juntamente com cada requisição, você deverá enviar um código UUID. Esse código corresponde à sua sala de bate-papo, onde você poderá ver e enviar mensagens.
    
    - Clique aqui na setinha para ver o passo-a-passo de como gerar esse código
        1. Entre nesse site: https://www.uuidgenerator.net/
        2. Copie o código que aparece na tela:           
        3. Você irá gerar o código uma vez e utilizará sempre o mesmo.
        4. Ele será enviado no final do link de cada uma das requisições. Por exemplo, o link da requisição de entrar na sala ficaria assim: 
        `https://mock-api.driven.com.br/api/v6/uol/participants/SEU_UUID`
    </aside>
    
    - Entrar na sala
        - Para entrar na sala, deve-se enviar ao servidor o nome do usuário. Para isso, envie uma requisição `POST` para a URL:
            
            ```jsx
            https://mock-api.driven.com.br/api/v6/uol[/participants](https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants)/SEU_UUID
            ```
            
        - Enviando um objeto no formato:
            
            ```jsx
            {
              name: "João"
            }
            ```
            
        - O servidor pode responder com status `400` se já houver um usuário online com esse nome. Se for o caso, a aplicação deve pedir um novo nome até que o servidor responda com status `200`.
    - Manter conexão
        - O servidor precisa saber que o usuário continua online. Se o usuário não envia nenhuma mensagem, como ele pode inferir se o usuário continua ou não na página?
        - Para resolver isso, o servidor espera que seu sistema avise continuamente que o usuário permanece utilizando o chat. Para isso, o sistema deve enviar uma requisição `POST` para a URL:
            
            ```jsx
            https://mock-api.driven.com.br/api/v6/uol/status/SEU_UUID
            ```
            
        - Enviando um objeto no formato enviando o nome do usuário que foi pedido ao entrar na página.
            
            ```jsx
            {
              name: "João"
            }
            ```
            
        - Esta requisição deve ser feita a cada cinco segundos.
    - Buscar mensagens
        - Para buscar mensagens do servidor, mande uma requisição `GET` para a URL:
            
            ```jsx
            https://mock-api.driven.com.br/api/v6/uol/messages/SEU_UUID
            ```
            
        - A resposta será um array de objetos, como o seguinte:
            
            ```jsx
            [
            	{
            		from: "João",
            		to: "Todos",
            		text: "entra na sala...",
            		type: "status",
            		time: "08:01:17"
            	},
            	{
            		from: "João",
            		to: "Todos",
            		text: "Bom dia",
            		type: "message",
            		time: "08:02:50"
            	},
            ]
            ```
            
        - Nos objetos, o campo `type` identifica o tipo da mensagem. Existem os seguintes valores:
            - `status`: mensagem de estado, como entrou ou saiu da sala;
            - `message`: mensagem pública;
            - `private_message`: mensagem particular.
    - Enviar mensagens
        - Para enviar mensagens, você deve fazer uma requisição `POST` para a URL:
            
            ```jsx
            https://mock-api.driven.com.br/api/v6/uol/messages/SEU_UUID
            ```
            
        - Nesta requisição, você deve enviar um objeto como o seguinte:
            
            ```jsx
            {
            	from: "nome do usuário",
            	to: "nome do destinatário (Todos se não for um específico)",
            	text: "mensagem digitada",
            	type: "message" // ou "private_message"
            }
            ```
            
    - Buscar participantes
        
        Para buscar a lista de participantes, envie uma requisição `GET` para a URL:
        
        ```jsx
        https://mock-api.driven.com.br/api/v6/uol/participants/SEU_UUID
        ```
        
        Esta requisição retornará um array de objetos no formato:
        
        ```jsx
        [
        	{
        		name: "João"
        	},
        	{
        		name: "Maria"
        	}
        ]
        ```
        

## ✅ Requisitos

- Geral
    - [ ]  Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, react, etc), nem outras linguagens que compilem para JavaScript (TypeScript, Clojure, ELM, etc), somente JavaScript puro.
- *Layout*
    - [ ]  Aplicar *layout* para mobile, seguindo o Figma. Não é necessário implementar uma versão para *desktop*.
    - [ ]  Note que as medidas do tamanho das telas no figma são apenas para referência!
        - Apesar de o projeto ser apenas mobile, celulares diferentes possuem dimensões diferentes e seu site deve funcionar independentemente disso.
        - A tela não deve ter tamanho fixo. Teste o seu layout com várias dimensões de tela diferentes.
        - Como fazer isso?
            
            https://www.loom.com/share/70c18a89e1394cbfb1564093c893461c
            
- *Chat*
    - [ ]  Ao entrar na sala, este deve carregar as mensagens do servidor e exibi-las conforme *layout* fornecido.
    - [ ]  Existem três tipos de mensagem:
        - Mensagens de status (**Entrou** ou **Saiu** da sala): deve ter o fundo cinza;
        - Mensagens reservadas (**Reservadamente**): deve ter o fundo vermelho;
        - Mensagens normais: devem ter o fundo branco.
    - [ ]  A cada três segundos o site deve recarregar as mensagens do servidor para manter sempre atualizado.
    - [ ]  O *chat* deverá ter rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do *chat* ele deve *scrollar* para o final.
    - [ ]  As mensagens enviadas **Reservadamente** só devem ser exibidas se o nome do destinatário ou remetente for igual ao nome do usuário que está usando o chat (senão ele poderia ver as mensagens reservadas para outras pessoas).
        - **⚠️ Atenção:** Fazer essa filtragem no *front-end* não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Entretanto, manteremos dessa forma por fins didáticos. Combinado? 😁
- Entrada na sala
    - [ ]  Ao entrar no site, o usuário deverá ser perguntado com um `prompt` ****seu lindo nome.
    - [ ]  Após inserção do nome, este deve ser enviado para o servidor pra cadastrar o usuário:
        - Caso o servidor responda com sucesso, o usuário poderá entrar na sala;
        - Caso o servidor responda com erro, deve-se pedir para o usuário digitar outro nome, pois este já está em uso;
    - [ ]  Enquanto o usuário estiver na sala, a cada 5 segundos o site deve avisar ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala".
- Envio de mensagem
    - [ ]  Ao enviar uma mensagem, esta deve ser enviada para o servidor:
        - Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o *chat;*
        - Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome).
    - [ ]  Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.
    - [ ]  Se a mensagem é pública, o destinatário será Todos.
- Seleção de participantes ativos e mensagens reservadas
    - [ ]  Ao clicar no ícone superior direito de participantes, o menu lateral deve abrir por cima do chat conforme *layout*. Um fundo escuro semi-transparente deve ficar por cima do *chat*.
    - [ ]  Ao clicar no fundo escuro, o menu lateral deve ser ocultado novamente.
    - [ ]  O site deve obter a lista de participantes assim que entra no chat e deve atualizar a lista a cada dez segundos.
    - [ ]  Ao clicar em uma pessoa ou em público/reservadamente, a opção clicada deve ser marcada com um *check* e as demais desmarcadas.
    - [ ]  Além do check acima, ao trocar esses parâmetros também deve ser alterada a frase que informa o destinatário, que fica embaixo do input de mensagem.

## ❗ Conteúdos Necessários

- Como scrollar o chat para o final?
    
    <aside>
    Para fazer um elemento aparecer na tela, utilize a função `scrollIntoView`. Abaixo, temos um código como exemplo de utilização:
    
    ```jsx
    const elementoQueQueroQueApareca = document.querySelector('.mensagem');
    elementoQueQueroQueApareca.scrollIntoView();
    ```
    
    Nese exemplo, se `elementoQueQueroQueApareca` estiver dentro de um elemento “scrollável”, o elemento será “scrollado” para que o `elementoQueQueroQueApareca` fique visível.
    
    </aside>
    
- Como forçar a atualização da tela?
    
    <aside>
    Pesquise sobre a função `window.location.reload()`.
    
    </aside>

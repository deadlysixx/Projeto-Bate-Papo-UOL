# Projeto-Bate-Papo-UOL

## 📝 Descrição:
Seu próximo projeto com JavaScript será a implementação de um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL (e se você não viveu essa época, só lamentamos, rs). 
No entanto, assim como fizemos no projeto da Globo, evite usar o site real da UOL como referência, pois apesar de inspirado nele, nossa interface é totalmente diferente (entenda diferente como muito melhor 😅).

## 🎨 Layout

## 🛠️ Recursos

## 📙 Documentação da API

## ✅ Requisitos

### Geral
Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, react, etc), nem outras linguagens que compilem para JavaScript (TypeScript, Clojure, ELM, etc), somente JavaScript puro.

### Layout
Aplicar layout para mobile, seguindo o Figma. Não é necessário implementar uma versão para desktop.
Note que as medidas do tamanho das telas no figma são apenas para referência! 
Apesar de o projeto ser apenas mobile, celulares diferentes possuem dimensões diferentes e seu site deve funcionar independentemente disso. 
A tela não deve ter tamanho fixo. Teste o seu layout com várias dimensões de tela diferentes.
Como fazer isso?

### Chat
Ao entrar na sala, este deve carregar as mensagens do servidor e exibi-las conforme layout fornecido.
Existem três tipos de mensagem:
Mensagens de status (Entrou ou Saiu da sala): deve ter o fundo cinza;
Mensagens reservadas (Reservadamente): deve ter o fundo vermelho;
Mensagens normais: devem ter o fundo branco.
A cada três segundos o site deve recarregar as mensagens do servidor para manter sempre atualizado.
O chat deverá ter rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do chat ele deve scrollar para o final.
As mensagens enviadas Reservadamente só devem ser exibidas se o nome do destinatário ou remetente for igual ao nome do usuário que está usando o chat (senão ele poderia ver as mensagens reservadas para outras pessoas).
⚠️ Atenção: Fazer essa filtragem no front-end não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Entretanto, manteremos dessa forma por fins didáticos. Combinado? 😁

### Entrada na sala
Ao entrar no site, o usuário deverá ser perguntado com um prompt seu lindo nome.
Após inserção do nome, este deve ser enviado para o servidor pra cadastrar o usuário:
Caso o servidor responda com sucesso, o usuário poderá entrar na sala;
Caso o servidor responda com erro, deve-se pedir para o usuário digitar outro nome, pois este já está em uso;
Enquanto o usuário estiver na sala, a cada 5 segundos o site deve avisar ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala".
Envio de mensagem
Ao enviar uma mensagem, esta deve ser enviada para o servidor:
Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o chat;
Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome).
Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não. 
Se a mensagem é pública, o destinatário será Todos.
Seleção de participantes ativos e mensagens reservadas
Ao clicar no ícone superior direito de participantes, o menu lateral deve abrir por cima do chat conforme layout. Um fundo escuro semi-transparente deve ficar por cima do chat.
Ao clicar no fundo escuro, o menu lateral deve ser ocultado novamente.
O site deve obter a lista de participantes assim que entra no chat e deve atualizar a lista a cada dez segundos.
Ao clicar em uma pessoa ou em público/reservadamente, a opção clicada deve ser marcada com um check e as demais desmarcadas.
Além do check acima, ao trocar esses parâmetros também deve ser alterada a frase que informa o destinatário, que fica embaixo do input de mensagem.

### ❗ Conteúdos Necessários
Como scrollar o chat para o final?
Para fazer um elemento aparecer na tela, utilize a função scrollIntoView. Abaixo, temos um código como exemplo de utilização:

const elementoQueQueroQueApareca = document.querySelector('.mensagem');
elementoQueQueroQueApareca.scrollIntoView();

Nese exemplo, se elementoQueQueroQueApareca estiver dentro de um elemento “scrollável”, o elemento será “scrollado” para que o elementoQueQueroQueApareca fique visível.

Como forçar a atualização da tela?
Pesquise sobre a função window.location.reload().

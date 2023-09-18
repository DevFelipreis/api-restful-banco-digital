# Rest Api - Banco Digital -  v1.1.2
**Melhorias em relação à versão 1.1.1: Corrigido o 'Bug do delete' que causava um erro ao tentar excluir uma conta recém-criada.**

Este projeto é um repositório para uma API de Banco Digital. Essa API integra-se com o servidor do Banco Digital para permitir o acesso e manipulação de dados bancários de forma segura e eficiente.

Este é um projeto desenvolvido por Luiz Felipe Reis em setembro de 2023 e está em constante evolução e aprimoramento.

## Funções:
* Listar contas bancárias;
* Criar novas contas;
* Atualizar uma informação ou todas as informações da conta;
* Deletar contas;
* Realizar depósitos;
* Realizar saques;
* Realizar transferências;
* Exibir saldo;
* Exibir extrato;

## Código-fonte:

![Screenshot 2023-09-18 at 15 40 24](https://github.com/DevFelipreis/banco-digital/assets/134344282/849cedfb-8012-43c7-9bdc-2cdb31fe239e)

```index.js```: O ponto de entrada do servidor Express.

```contaBancaria.js```: Processar as solicitações do cliente, interagir com o ```bancodedados``` e retornar uma resposta adequada ao cliente.

```vericarDadosIguais.js```: Processa e manipula as solicitações HTTP para verificar a igualdade dos dados.

```vericarSenha.js```: Processa e manipula as solicitações HTTP para verificar a senha de administrador do banco e realizar mudanças mais significativas no banco de dados.

```bancodedados.js```: Armazena os dados do banco e as funcionalidades relacionadas ao banco.

```router.js```: Define as rotas da API e seus controladores.

## Tecnologias usadas:

### JavaScript:
Linguagem de programação de alto nível amplamente utilizada para desenvolvimento web. Ela é conhecida por ser uma linguagem de script, o que significa que você pode escrever código JavaScript diretamente em páginas da web para torná-las interativas e dinâmicas.

### Node.js: 
Ambiente de tempo de execução (runtime) de código aberto baseado na engine V8 do Google Chrome. Ele permite que os desenvolvedores utilizem JavaScript para criar aplicativos de servidor, o que é um desvio do uso tradicional do JavaScript no lado do cliente, que é executado nos navegadores.

### Dependências:
**date-fns:** Uma biblioteca JavaScript usada para trabalhar com datas e horários. Ela fornece funções úteis para análise, manipulação e formatação de datas.
Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: ```npm install date-fns```

**express.js:** O framework web "Express.js", usado para criar aplicativos web e APIs em Node.js. É amplamente utilizado para criar servidores web e simplificar o desenvolvimento web em Node.js.
Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: ```npm install express```

### devDependencies:
**nodemon:** Uma ferramenta de desenvolvimento que monitora alterações em arquivos no diretório do seu projeto e reinicia automaticamente o servidor sempre que há uma alteração. É frequentemente usado para desenvolvimento em Node.js para economizar tempo na reinicialização do servidor durante o desenvolvimento.
As dependências são bibliotecas ou pacotes necessários para o funcionamento do seu aplicativo, enquanto as devDependencies são pacotes usados apenas durante o desenvolvimento, como no caso do nodemon, que ajuda a manter o servidor atualizado durante o desenvolvimento.
Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: ```npm install -D nodemon```. Para executar o nodemon navegue até o diretório do seu projeto e execute o seguinte comando: ```nodemon meu_arquivo.js```

Após clonar este repositório, você pode instalar todas as dependências e devDependencies usando o comando: ```npm install```

## Preparar o projeto:
**Clone o repositório**: Abra o terminal e use o comando: ```git clone "chave SSh"```

![Screenshot 2023-09-15 at 16 12 59](https://github.com/DevFelipreis/banco-digital/assets/134344282/60c1f4e4-29e9-4832-abb8-3c5bb9b9e5f6)
![Screenshot 2023-09-15 at 16 13 39](https://github.com/DevFelipreis/banco-digital/assets/134344282/2c2865d6-45a5-4dd1-b2c4-6c494267046d)

**Instale o npm**: ```npm install```. O npm (Node Package Manager) é o gerenciador de pacotes padrão para a plataforma Node.js. Ele é uma ferramenta que permite a instalação, gerenciamento e distribuição de pacotes de software escritos em JavaScript. O npm é uma parte essencial do ecossistema Node.js.

**Lembrando que é necessário especificar o caminho correto para a instalação.**
```cd /home/<seu_nome_de_usuário>/Documentos/MeuProjeto```

## Como funciona:

### A Rest API tem os seguintes endpoints:

* Lista de todas as contas cadastradas, incluindo todas as suas transações: __router.get('/contas/:senha_banco')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/contas/Cubos123Bank como uma rota HTTP GET. Se a senha estiver incorreta ou a conta informada não existir, uma mensagem de erro será retornada.
**A requisição deverá ser feita na URL.** 
![Screenshot 2023-09-15 at 16 44 37](https://github.com/DevFelipreis/banco-digital/assets/134344282/72cfbebb-48e7-47d6-a677-344d22ccb463)

* Saldo de uma conta cadastrada: __router.get('/contas/saldo')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/contas/saldo?numero_conta=1&senha=1234 como uma rota HTTP GET. Se a senha estiver incorreta ou a conta informada não existir, uma mensagem de erro será retornada.
  **A requisição deverá ser feita na URL.** 
![Screenshot 2023-09-15 at 16 49 01](https://github.com/DevFelipreis/banco-digital/assets/134344282/ed88a027-d808-43db-99ba-3dff5fbafbad)

* Extrato de uma conta cadastrada: __router.get('/contas/extrato')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/contas/extrato?numero_conta=1&senha=1234 como uma rota HTTP GET. Se a senha estiver incorreta ou a conta informada não existir, uma mensagem de erro será retornada.
  **A requisição deverá ser feita na URL.** 
![Screenshot 2023-09-15 at 16 50 39](https://github.com/DevFelipreis/banco-digital/assets/134344282/13586135-617a-4ae8-88c4-fc3dbcf56872)

* Criar uma conta bancária: __router.post('/contas/:senha_banco')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/contas/Cubos123Bank como uma rota HTTP POST. Se a senha estiver incorreta ou se os dados do CPF e do e-mail já estiverem sido cadastrados em outra conta, uma mensagem de erro será retornada.
  **Os dados da requisição deverão ser enviados no corpo (body).**
![Screenshot 2023-09-15 at 16 53 38](https://github.com/DevFelipreis/banco-digital/assets/134344282/6810e8e7-a62b-430c-9e83-0cdb5ee06e4c)

* Atualizar uma conta bancária: __router.put('/contas/:numeroConta/usuario')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/contas/1/usuario como uma rota HTTP PUT. Se a senha estiver incorreta ou se os dados do CPF e do e-mail já estiverem sido cadastrados em outra conta, uma mensagem de erro será retornada.
    **Os dados da requisição deverão ser enviados no corpo (body).**
![Screenshot 2023-09-15 at 16 57 20](https://github.com/DevFelipreis/banco-digital/assets/134344282/cd5b2edc-f391-4d2d-88b0-cbea08c8f0a1)

* Excluir de uma conta cadastrada: __router.delete('/contas/:numeroConta')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/contas/1 como uma rota HTTP DELETE. Se a senha estiver incorreta ou a conta informada não existir, uma mensagem de erro será retornada.
  **A requisição deverá ser feita na URL.** 
![Screenshot 2023-09-15 at 16 59 04](https://github.com/DevFelipreis/banco-digital/assets/134344282/92370b8e-807c-44f4-b328-bf20b055cf2c)

* Depositar em uma conta cadastrada: __router.post('/transacoes/depositar')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/transacoes/depositar como uma rota HTTP POST. Se a conta informada não existir, uma mensagem de erro será retornada.
  **Os dados da requisição deverão ser enviados no corpo (body).**
![Screenshot 2023-09-15 at 17 01 05](https://github.com/DevFelipreis/banco-digital/assets/134344282/4d21556a-89e7-4202-927f-46a62c26ac0b)

* Sacar de uma conta cadastrada: __router.post('/transacoes/sacar')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/transacoes/sacar como uma rota HTTP POST. Se a senha estiver incorreta ou a conta informada não existir, uma mensagem de erro será retornada.
  **Os dados da requisição deverão ser enviados no corpo (body).**
![Screenshot 2023-09-15 at 17 02 33](https://github.com/DevFelipreis/banco-digital/assets/134344282/f38a40b9-45e3-49a5-be4b-6328c99287db)

* Transferir de uma conta cadastrada para outra: __router.post('/transacoes/transferir')__ . Para testar, você precisará de um programa que teste as requisições. No exemplo, usaremos o Insomnia. Digite a URL http://localhost:3000/transacoes/transferir como uma rota HTTP POST. Se a senha estiver incorreta, ou a conta de origem ou destino informada não existir e o saldo for menor que o valor da transferência, uma mensagem de erro será retornada.
  **Os dados da requisição deverão ser enviados no corpo (body).**
![Screenshot 2023-09-15 at 17 04 45](https://github.com/DevFelipreis/banco-digital/assets/134344282/727460b3-bda5-431c-a419-40812ade784b)

**Licença:** Este projeto está sob uma licença de código aberto que permite a colaboração de qualquer pessoa interessada em contribuir para melhorias e desenvolvimento. Todos são bem-vindos a fazer contribuições para o projeto.

**Agradecimentos:** Gostaríamos de expressar nossa gratidão à instituição de Ensino Cubos Academy, bem como a todos os nossos colegas e instrutores, por seu apoio e contribuições para este projeto. Seu envolvimento foi fundamental para o seu sucesso. Agradecemos sinceramente a todos vocês.

**Links Úteis:**
- [Baixar o Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- [Baixar o Insomnia](https://insomnia.rest/)
- [Express.js]( https://expressjs.com/)
- [Nodemon]( https://nodemon.io/)
- [date-fns](https://date-fns.org/)
- [npm](https://docs.npmjs.com/)  

**Atualizações Futuras:** Este projeto encontra-se na sua versão Alfa, indicando que ainda está em desenvolvimento ativo. Estamos comprometidos em continuar aprimorando e atualizando este projeto para oferecer novos recursos e melhorias no futuro. Agradecemos antecipadamente pelo seu interesse e contribuições à medida que continuamos a evoluir este projeto.

**Contato:**
- [LinkedIn](https://www.linkedin.com/in/devlfreis/)
- E-mail: [lfreis.contato@gmail.com](mailto:lfreis.contato@gmail.com)  











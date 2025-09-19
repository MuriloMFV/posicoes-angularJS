##Painel de Posições – AngularJS

Aplicação em AngularJS 1.8 que consome a API de posições e exibe uma tabela com filtros, ordenação e resumo.
O projeto foi desenvolvido para o desafio técnico.

##Funcionalidades

-Exibe dados da API em tabela responsiva
-Ordenação ao clicar no cabeçalho (asc/desc)
-Filtros por tipo de veículo e estado da ignição

Resumo com:

Total de registros (após filtros)

Velocidade média (sem casas decimais)

Botão Recarregar dados

Estados de UI: carregando, erro, lista vazia

Layout responsivo usando Bootstrap

📂 Estrutura de pastas
/app
   app.js
   /controllers
       posicaoController.js
   /services
       posicaoService.js
   /views
       posicoes.html
index.html

🔑 API

Endpoint:

https://api.appselsyn.com.br/keek/rest/v1/integracao/posicao?apikey={SUA_CHAVE}


Chave de teste usada:

eyJucyI6InRlc3RlIiwic2MiOjE1MjY2Njk2NTJ9


Se desejar usar outra chave, altere no arquivo:
app/services/posicaoService.js

## Como rodar o projeto



### 1. Instalação Proxy

- no seu cmd:
- 
```bash
cd painel-posicoes-react\proxy-api 
npm install
```

```bash
cd painel-posicoes-react\proxy-api 
npm install express
```

```bash
npm install express cors dotenv
```

### 2. Clonar o repositório (ou baixar o ZIP do projeto)
```bash
git clone https://github.com/seu-usuario/painel-posicoes-react.git
cd painel-posicoes-react
```

### 3. Rodar o Servidor Proxy

- no seu CMD:

```bash
cd painel-posicoes-react\proxy-api
node server.js 
```
### 5. Rodar o Projeto

```bash
npm start
```

##Notas técnicas

Framework: AngularJS 1.8

CSS: Bootstrap 3.4.1

Arquitetura: separação em módulo principal, controller, service e view

Filtro customizado: para aplicar filtros de Tipo e Ignição



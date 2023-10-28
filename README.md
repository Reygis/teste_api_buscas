
# Teste Back-end
 
Teste de back-end realizado para vaga de desenvolvedor Node.js.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env 

`PORT`
`DB_NAME`
`DB_URL`

informações constam no arquivo .env.example

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Reygis/teste_bis2bis.git
```

Entre no diretório do projeto

```bash
  cd teste_bis2bis
```

Instale as dependências

```bash
  npm install
```

Execute a seed

```bash
  npm run seed
```

Inicie o servidor

```bash
  npm run start
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando (necessario ter populado o banco com a seed)

```bash
  npm run test
```

## Documentação da API

#### Retorna todos as universidades

```http
  GET /api/universities
```

| Parâmetros   | Tipo       | Descrição                           |
| :--------------- | :--------- | :---------------------------------- |
| `country` `page` | `string` | **Não Obrigadorios**. busca por pais / retorna a pagina |

#### Retorna uma universidade pelo id

```http
  GET /api/universities/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da universidade |

#### Criar nova universidade

```http
  POST /api/universities
```

Passar Json com as informações como exemplo:
```
{
	"name":"Test University", 
	"country": "Brazil", 
	"alpha_two_code": "BR",
	"domains":[
		"domain.edu.br"
	],
 	"web_pages":[
		"http://anypage.com"
	],   
	"state-province": "Sergipe"
}
  
```

#### Editar universidade

```http
  PUT /api/universities/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da universidade |

Passar Json com as informações como exemplo:
```
{
  "name" : "Updated Test University",
  "domains" : [
    "domain.edu.br", 
    "anotherdomain.edu.br"
  ],
  "web_pages" : [
    "http://anypage.com",
    "http://anotherpage.com"
  ]  	
} 
  
```

#### Excluir uma universidade pelo id

```http
  DELETE /api/universities/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da universidade |


## Feedback

Se você tiver algum feedback, por favor me deixe saber por meio de reygis@outlook.com


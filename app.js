const express = require('express');
const bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.post('/users', (req, res) => { //Создать нового пользователя
	let name = req.params.name
	let score = req.params.score
	
	res.json({name: users.name, score : users.score})
})

app.get('/users', (req, res) => { //Найти всех пользователей
	let id = req.params.id;
	res.send('Вывод пользователей');
}

app.put('/users/:id', (req, res) => { //Обновить данные пользователя по ID
	let id = req.params.id;
})

app.delete('/users/:id', (req, res) => { //Удалить пользователя по ID
	let id = req.params.id;
})

app.listen(3000, () => {
	console.log('Server start');
})


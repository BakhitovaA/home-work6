const express = require("express");
const bodyParser = require("body-parser");
const User = require('./model');
const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

class userProcessing {

    constructor() {
        this.array = this._initArray();
    }

	userList() {
        return this.array;
    }
	
    userCreate(data) {
        let user = new User(this.array.length + 1, data.name, data.score);
        this.array.push(user);
        return user;
    }

    userDelete(data) {
        this.array.splice(index, 1);
		return this.array;
    }

    userID(data) {
        return this.array[index];
    }

	userUpdate(data) {
        this.array[index].name = data.name;
        this.array[index].score = data.score;
        return this.array[index];
    }
	
    _initArray() {
        try{
            return JSON.parse(fs.readFileSync('users.json'));
        } catch (err) {
            return new Array();
        }
    }
}

app.get("/users/", function(req, res) {
    res.send(userProcessing.userList());
});

app.post("/users/", function(req, res) {
    let user = userProcessing.userCreate(new User(null, req.body.name, req.body.score));
    res.send(user);
});

app.delete("/users/:id", function(req, res) {
    let user = userProcessing.userDelete(new User(req.params.id, null, null));
    if (user.id == undefined || user.id == 0) {
		res.status(500).json({ error: 'Пользователь не удален, т.к. не был найден' });
	}
    res.send(user);
});

app.get("/users/:id", function(req, res) {
    let user = userProcessing.userID(new User(req.params.id, null, null));
    if (user.id == undefined || user.id == 0) {
		res.status(500).json({ error: 'Пользователь не был найден' });
	}
    res.send(user);
});


app.put("/users/:id", function(req, res) {
    let user = userProcessing.userUpdate(new User(req.params.id, req.query.name, req.query.score));
    if (user.id == undefined || user.id == 0) {
		res.status(500).json({ error: 'Пользователь не был найден' });
	}
    res.send(user);
});

function onError(err, statusCode) {
    res.send(JSON.stringify({
        error: err,
        id: data.id
    }), statusCode);
}

app.listen(3000);

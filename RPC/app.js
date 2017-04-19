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
	
	userID(data) {
        return this.array[index];
    }
	
    userCreate(data) {
        let user = new User(this.array.length + 1, data.name, data.score);
        this.array.push(user);
        return user;
    }

	userUpdate(data) {
        this.array[index].name = data.name;
        this.array[index].score = data.score;
        return this.array[index];
    }
	
	userDelete(data) {
        this.array.splice(index, 1);
		return this.array;
    }
	
    _initArray() {
        try{
            return JSON.parse(fs.readFileSync('users.json'));
        } catch (err) {
            return new Array();
        }
    }
}

app.post('/rpc', function(req, res) {
	
    var rpcMethods = new Object();
    var data = req.body; err = null, rpcMethod = new Object();

    rpcMethods.userList = (params, result) => {
        let user = userProcessing.userList();
        result.onSuccess(user);
    };
	
	rpcMethods.userID = (params, result) => {
        let user = userProcessing.userID(new User(params.id, null, null));
        result.onSuccess(user);
    };

    rpcMethods.userCreate = (params, result) => {
        let user = userProcessing.userCreate(new User(null, params.name, params.score));
        result.onSuccess(user);
    };

    rpcMethods.userUpdate = (params, result) => {
        let user = userProcessing.userUpdate(new User(params.id, params.name, params.score));
        result.onSuccess(user);
    };

    rpcMethods.userDelete = (params, result) => {
        let user = userProcessing.userDelete(new User(params.id, null, null));
        result.onSuccess(user);
    };

    function onError(err, statusCode) {
        res.send(JSON.stringify({
            error: err,
            id: data.id
        }), statusCode);
    }
});

app.listen(3000);
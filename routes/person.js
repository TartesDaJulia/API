var express = require("express");
var router = express.Router();
var person = require("../controllers/person");

router.get("/", function (req, res) {
	//Make this present some information...
	person
		.getPersons()
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing persons: ${e}`));
});

router.get("/:id", function (req, res) {
	person
		.getPerson(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error getting person: ${e}`));
});

router.get("/:id/password", function (req, res) {
	person
		.getPassword(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error getting password: ${e}`));
});

router.post("/", function (req, res) {
	person
		.insertPerson(req.body)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error inserting person: ${e}`));
});

router.post("/login", function (req, res) {
	console.log("Router:");
	console.log(req.body);
	person
		.login(req.body)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error getting password: ${e}`));
});

router.post("/update", function (req, res) {
	person
		.update(req.body)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error updating person: ${e}`));
});

module.exports = router;

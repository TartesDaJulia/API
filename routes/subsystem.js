var express = require("express");
var router = express.Router();
var subsystem = require("../controllers/subsystem");

router.get("/", function (req, res) {
	//Make this present some information...
	subsystem
		.getSubsystems()
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing institutions: ${e}`));
});

router.get("/:id", function (req, res) {
	subsystem
		.getSubsystem(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing specialty: ${e}`));
});

router.get("/:id/institutions", function (req, res) {
	subsystem
		.getSubsystemInstitutions(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing specialties: ${e}`));
});

module.exports = router;

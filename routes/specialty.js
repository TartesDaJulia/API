var express = require("express");
var router = express.Router();
var specialty = require("../controllers/specialty");

router.get("/", function (req, res) {
	//Make this present some information...
	specialty
		.getSpecialties()
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing institutions: ${e}`));
});

router.get("/:id", function (req, res) {
	specialty
		.getSpecialty(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing specialty: ${e}`));
});

router.get("/:id/institutions", function (req, res) {
	specialty
		.getSpecialtyInstitutions(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing specialties: ${e}`));
});

module.exports = router;

var express = require("express");
var router = express.Router();
var location = require("../controllers/location");

router.get("/", function (req, res) {
	location
		.getLocations()
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing location: ${e}`));
});

router.get("/:id", function (req, res) {
	location
		.getLocation(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing location: ${e}`));
});

router.get("/:id/addresslong", function (req, res) {
	location
		.getLocationAddressLong(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing specialties: ${e}`));
});

router.get("/:id/addressshort", function (req, res) {
	location
		.getLocationAddressShort(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing subsystems: ${e}`));
});

router.get("/:id/instbyloc", function (req, res) {
	location
		.getInstitutionsLocality(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/instbymuni", function (req, res) {
	location
		.getInstitutionsMunicipality(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/instbydistrict", function (req, res) {
	location
		.getInstitutionsDistrict(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing image: ${e}`));
});

router.post("/", function (req, res) {
	location
		.insertLocation(req.body)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error inserting person: ${e}`));
});

module.exports = router;

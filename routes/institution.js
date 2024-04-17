var express = require("express");
var router = express.Router();
var institution = require("../controllers/institution");

router.get("/", function (req, res) {
	//Make this present some information...
	institution
		.getInstitutions()
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing institutions: ${e}`));
});

router.get("/:id", function (req, res) {
	institution
		.getInstitutionDetails(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing institution: ${e}`));
});

router.get("/:id/specialties", function (req, res) {
	institution
		.getInstitutionSpecialties(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing specialties: ${e}`));
});

router.get("/:id/subsystems", function (req, res) {
	institution
		.getInstitutionSubsystems(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing subsystems: ${e}`));
});

router.get("/:id/rating", function (req, res) {
	institution
		.getInstitutionRating(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/ratings", function (req, res) {
	institution
		.getInstitutionRatings(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/ratingsfull", function (req, res) {
	institution
		.getInstitutionRatingsFull(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/ratingsid", function (req, res) {
	institution
		.getInstitutionRatingsID(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/image", function (req, res) {
	institution
		.getInstitutionImage(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing image: ${e}`));
});

router.get("/:id/locationlong", function (req, res) {
	institution
		.getInstitutionLocationLong(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing location: ${e}`));
});

router.get("/:id/locationshort", function (req, res) {
	institution
		.getInstitutionLocationShort(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing location: ${e}`));
});

router.get("/:id/coordinates", function (req, res) {
	institution
		.getInstitutionCoordinates(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing coordinates: ${e}`));
});

router.get("/search/:keyword", function (req, res) {
	institution
		.searchInstitutions(req.params.keyword)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error matching institutions: ${e}`));
});

router.post("/", function (req, res) {
	institution
		.insertInstitution(req.body)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error inserting institution: ${e}`));
});

module.exports = router;

var express = require("express");
var router = express.Router();
var rating = require("../controllers/rating");

router.get("/", function (req, res) {
	//Make this present some information...
	rating
		.getRatings()
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing institutions: ${e}`));
});

router.get("/:id", function (req, res) {
	rating
		.getRating(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/full", function (req, res) {
	rating
		.getRatingFull(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/text", function (req, res) {
	rating
		.getRatingText(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing subsystems: ${e}`));
});

router.get("/:id/score", function (req, res) {
	rating
		.getRatingScore(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.get("/:id/time", function (req, res) {
	rating
		.getRatingTime(req.params.id)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error listing rating: ${e}`));
});

router.post("/", function (req, res) {
	rating
		.insertRating(req.body)
		.then((dados) => res.jsonp(dados))
		.catch((e) => res.status(500).send(`Error inserting rating: ${e}`));
});

module.exports = router;

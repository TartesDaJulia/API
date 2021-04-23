var instSpecialties = module.exports;
const axios = require("axios");

function myNormalize(r) {
	return r.results.bindings.map((o) => {
		var novo = {};
		for (let [k, v] of Object.entries(o)) {
			novo[k] = v.value;
		}
		return novo;
	});
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX ha: <http://www.tartesdajulia.com/ontologies/Healthadvisor#>
`;

var getLink = "http://localhost:7200/repositories/Healthadvisor" + "?query=";
var getLinkUpdate =
	"http://localhost:7200/repositories/HealthadvisorTest/statements" +
	"?update=";

instSpecialties.insertInstSpecialties = async function (rat) {
	//First check what ID should the institution have
	var id = await getRatingId();

	var query = `insert data {
		ha:rating${id} a owl:NamedIndividual.
		ha:rating${id} a ha:Rating.
		ha:rating${id} ha:id "${id}".
		ha:rating${id} ha:text "${rat.text}".
		ha:rating${id} ha:score "${rat.score}".
		ha:rating${id} ha:time_stamp "${rat.time}".
		ha:rating${id} ha:isRatingFrom ha:${rat.person}.
		ha:rating${id} ha:ratesInstitution ha:${rat.institution}.
	}
	`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.post(getLinkUpdate + encoded);
		if (response.status == 204) {
			var result = "Successfully added rating";
			return result;
		} else return "Error adding rating";
	} catch (e) {
		console.log(e);
		throw e;
	}
};

getRatingId = async function () {
	var query = `select ?id where {
		?rat a ha:Rating.
		?rat ha:id ?id.
	}
	ORDER BY DESC (xsd:integer(?id)) LIMIT 1`;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		result = myNormalize(response.data)[0].id + 1;
		return result;
	} catch (e) {
		throw e;
	}
};

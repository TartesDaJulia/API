var rating = module.exports;
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

var getLink =
	"http://localhost:7200/repositories/HealthadvisorTest" + "?query=";
var getLinkUpdate =
	"http://localhost:7200/repositories/HealthadvisorTest/statements" +
	"?update=";

rating.getRatings = async function () {
	var query = `select ?id ?score ?text ?time ?inst ?personId where {
		?rating a ha:Rating.
		?rating ha:score ?score.
		?rating ha:id ?id.
		?rating ha:text ?text.
		?rating ha:time_stamp ?time.
		?rating ha:ratesInstitution ?institution.
		?institution ha:id ?inst.
		?rating ha:isRatingFrom ?person.
		?person ha:id ?personId.
	} `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

rating.getRating = async function (idRating) {
	var query = `select ?score ?text ?time ?inst ?personId where {
		?rating a ha:Rating.
		?rating ha:id "${idRating}" .
		?rating ha:score ?score.
		?rating ha:text ?text.
		?rating ha:time_stamp ?time.
		?rating ha:ratesInstitution ?institution.
		?institution ha:id ?inst.
		?rating ha:isRatingFrom ?person.
		?person ha:id ?personId.
	} `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

rating.getRatingFull = async function (idRating) {
	var query = `select ?score ?text ?time ?inst ?first ?last where {
		?rating a ha:Rating.
		?rating ha:id "${idRating}" .
		?rating ha:score ?score.
		?rating ha:text ?text.
		?rating ha:time_stamp ?time.
		?rating ha:ratesInstitution ?institution.
		?institution ha:name ?inst.
		?rating ha:isRatingFrom ?person.
		?person ha:first_name ?first.
    	?person ha:last_name ?last.
	}  `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		//removing T from date, probably a bad idea
		const newData = myNormalize(response.data);

		for (let i = 0; i < newData.length; i++) {
			newData[i].time = newData[i].time.replace("T", " ");
		}

		return newData;
	} catch (e) {
		throw e;
	}
};

rating.getRatingText = async function (idRating) {
	var query = `select ?rating where {
		?rating a ha:Rating.
		?rating ha:id "${idRating}" .
		?rating ha:text ?text.
       }`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

rating.getRatingScore = async function (idRating) {
	var query = `select ?score where {
		?rating a ha:Rating.
		?rating ha:id "${idRating}" .
		?rating ha:score ?score.
       }`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

rating.getRatingTime = async function (idRating) {
	var query = `select ?time where {
		?rating a ha:Rating.
		?rating ha:id "${idRating}" .
		?rating ha:time_stamp ?time.
       }`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);

		const newData = myNormalize(response.data);

		for (let i = 0; i < newData.length; i++) {
			newData[i].time = newData[i].time.replace("T", " ");
		}

		return newData;
	} catch (e) {
		throw e;
	}
};

rating.insertRating = async function (rat) {
	//First check what ID should the institution have
	var id = await getRatingId();
	console.log(rat);
	console.log(id);
	var query = `insert data {
		ha:r${id} a owl:NamedIndividual.
		ha:r${id} a ha:Rating.
		ha:r${id} ha:id "${id}".
		ha:r${id} ha:text "${rat.text}".
		ha:r${id} ha:score "${rat.score}".
		ha:r${id} ha:time_stamp "${rat.time}".
		ha:r${id} ha:isRatingFrom ha:person${rat.person}.
		ha:r${id} ha:ratesInstitution ha:institution${rat.institution}.
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
	//Get highest ID and add 1. IDs are unique...
	var query = `select ?id where {
		?rat a ha:Rating.
		?rat ha:id ?id.
	}
	ORDER BY DESC (xsd:integer(?id)) LIMIT 1`;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		console.log(myNormalize(response.data)[0].id);
		result = parseInt(myNormalize(response.data)[0].id) + 1;
		return result;
	} catch (e) {
		throw e;
	}
};

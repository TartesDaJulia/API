var institution = module.exports;
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

institution.getInstitutions = async function () {
	var query = `select ?id ?nif ?name ?phone ?email ?rating ?image ?locality ?latitude ?longitude where {
        ?inst a ha:Institution .
    	?inst ha:id ?id. 
    	?inst ha:nif ?nif.
    	?inst ha:name ?name.
    	?inst ha:phone_number ?phone.
    	?inst ha:email ?email.
    	?inst ha:avg_rating ?rating.
    	?inst ha:image_url ?image.
    	?inst ha:hasLocation ?location. 
    	?location ha:locality ?locality .
     	?location ha:latitude ?latitude .
    	?location ha:longitude ?longitude.
     }  `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionDetails = async function (idInstitution) {
	var query = `select * where {
		?inst a ha:Institution.
		?inst ha:id "${idInstitution}" .
    	?inst ha:name ?name .
    	?inst ha:nif ?nif .
    	?inst ha:email ?email.
   		?inst ha:phone_number ?phone .
    	?inst ha:avg_rating ?rating .
    	?inst ha:image_url ?image. 
       } `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionSpecialties = async function (idInstitution) {
	var query = `select ?specialty ?id where {
		?inst a ha:Institution.
		?inst ha:id "${idInstitution}".
		?is a ha:InstitutionSpecialties.
		?is ha:isInstitutionFrom ?inst.
		?is ha:hasSpecialty ?special.
		?special ha:id ?id
		bind (STRAFTER(STR(?special), '#') AS ?specialty).
	}`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionSubsystems = async function (idInstitution) {
	var query = `select ?sub ?id where {
    	?inst a ha:Institution.
    	?inst ha:id "${idInstitution}".
    	?is a ha:InstitutionSpecialties.
    	?is ha:isInstitutionFrom ?inst.
    	?is ha:hasSubsystem ?sub.
    	?sub ha:id ?id
}`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionRating = async function (idInstitution) {
	var query = `select ?avgRating where {
    	?inst a ha:Institution.
    	?inst ha:id "${idInstitution}".
    	?inst ha:avg_rating ?avgRating.
} `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionRatings = async function (idInstitution) {
	var query = `select ?id ?text ?score ?time where {
    	?inst a ha:Institution.
        ?inst ha:id "${idInstitution}".
		?rating a ha:Rating.
    	?rating ha:id ?id.
		?rating ha:ratesInstitution ?inst.
		?rating ha:text ?text.
		?rating ha:score ?score.
		?rating ha:time_stamp ?time
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};
institution.getInstitutionRatingsFull = async function (idInstitution) {
	var query = `select ?id ?text ?score ?time ?first ?last where {
    	?inst a ha:Institution.
        ?inst ha:id "${idInstitution}".
		?rating a ha:Rating.
    	?rating ha:id ?id.
		?rating ha:ratesInstitution ?inst.
		?rating ha:text ?text.
		?rating ha:score ?score.
		?rating ha:time_stamp ?time.
		?rating ha:isRatingFrom ?person.
		?person ha:first_name ?first.
    	?person ha:last_name ?last.
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionRatingsID = async function (idInstitution) {
	var query = `select ?id where {
    	?inst a ha:Institution.
        ?inst ha:id "${idInstitution}".
		?rating a ha:Rating.
    	?rating ha:id ?id.
		?rating ha:ratesInstitution ?inst.
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionImage = async function (idInstitution) {
	var query = `select ?url where {
		?inst a ha:Institution.
		?inst ha:id "${idInstitution}".
		?inst ha:image_url ?url
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionLocationLong = async function (idInstitution) {
	var query = `select ?id ?first ?second ?locality ?muni ?district ?postal ?lat ?long where {
		?inst a ha:Institution.
		?inst ha:id "${idInstitution}" .
		?inst ha:hasLocation ?loc.
		?loc ha:id ?id.
		?loc ha:first_line ?first.
		?loc ha:second_line ?second.
		?loc ha:locality ?locality.
		?loc ha:municipality ?muni.
		?loc ha:district ?district.
		?loc ha:postal_code ?postal. 
		?loc ha:latitude ?lat.
		?loc ha:longitude ?long
			   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionLocationShort = async function (idInstitution) {
	var query = `select ?id ?first ?second ?locality ?muni ?district ?postal where {
		?inst a ha:Institution.
		?inst ha:id "${idInstitution}" .
		?inst ha:hasLocation ?loc.
		?loc ha:id ?id.
		?loc ha:first_line ?first.
		?loc ha:second_line ?second.
		?loc ha:locality ?locality.
		?loc ha:municipality ?muni.
		?loc ha:district ?district.
		?loc ha:postal_code ?postal.
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.getInstitutionCoordinates = async function (idInstitution) {
	var query = `select ?lat ?long where {
		?inst a ha:Institution.
		?inst ha:id "${idInstitution}".
		?inst	ha:hasLocation ?location.
		?location ha:latitude ?lat.
		?location ha:longitude ?long
	} `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

institution.insertInstitution = async function (inst) {
	//First check what ID should the institution have
	var id = await getInstId();

	var query = `insert data {
		ha:institution${id} a owl:NamedIndividual.
		ha:institution${id} a ha:Institution.
		ha:institution${id} ha:id "${id}".
		ha:institution${id} ha:name "${inst.name}".
		ha:institution${id} ha:email "${inst.email}".
		ha:institution${id} ha:nif "${inst.nif}".
		ha:institution${id} ha:phone_number "${inst.phone}".
		ha:institution${id} ha:image_url "${inst.image}".
		ha:institution${id} ha:avg_rating "0"
	}`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.post(getLinkUpdate + encoded);
		if (response.status == 204) {
			var result = "Successfully added institution";
			return result;
		} else return "Error adding institution";
	} catch (e) {
		console.log(e);
		throw e;
	}
};

getInstId = async function () {
	var query = `select ?id where {
		?inst a ha:Institution.
		?inst ha:id ?id.
	}
	ORDER BY DESC (xsd:integer(?id)) LIMIT 1`;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		result = parseInt(myNormalize(response.data)[0].id) + 1;
		return result;
	} catch (e) {
		throw e;
	}
};

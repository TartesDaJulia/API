var specialty = module.exports;
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

specialty.getSpecialties = async function () {
	var query = `select * where {
		?spe a ha:Specialty.
		?spe ha:id ?id
	} `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

specialty.getSpecialty = async function (idSpecialty) {
	var query = `select * where {
		?spe a ha:Specialty.
		?spe ha:id "${idSpecialty}"
	} `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

specialty.getSpecialtyInstitutions = async function (idSpecialty) {
	var query = `select distinct ?instId ?name where {
		?spe a ha:Specialty.
		?spe ha:id "${idSpecialty}".
		?inspe a ha:InstitutionSpecialties.
		?inspe ha:hasSpecialty ?spe.
    	?inspe ha:isInstitutionFrom ?inst.
		?inst a ha:Institution.
		?inst ha:id ?instId.
		?inst ha:name ?name
	} `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

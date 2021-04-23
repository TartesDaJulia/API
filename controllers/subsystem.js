var subsystem = module.exports;
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

subsystem.getSubsystems = async function () {
	var query = `select ?id ?name ?full where {
		?sub a ha:Subsystem.
		?sub ha:id ?id.
    	?sub ha:name ?name.
    	?sub ha:full_name ?full
	} `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

subsystem.getSubsystem = async function (idSub) {
	var query = `select * where {
		?sub a ha:Subsystem.
		?sub ha:id "${idSub}".
		?sub ha:name ?name.
    	?sub ha:full_name ?full.
	} `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

subsystem.getSubsystemInstitutions = async function (idSub) {
	var query = `select distinct ?instId ?name where {
		?sub a ha:Subsystem.
		?sub ha:id "${idSub}".
		?inspe a ha:InstitutionSpecialties.
		?inspe ha:hasSubsystem ?sub.
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

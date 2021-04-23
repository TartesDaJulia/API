var location = module.exports;
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

location.getLocations = async function () {
	var query = `select ?id ?first ?second ?postal ?locality ?municipality ?district ?lat ?long where {
		?loc a ha:Location.
		?loc ha:id ?id.
		?loc ha:first_line ?first.
		?loc ha:second_line ?second.
		?loc ha:postal_code ?postal.
		?loc ha:locality ?locality.
		?loc ha:municipality ?municipality.
		?loc ha:district ?district.
		?loc ha:latitude ?lat.
		?loc ha:longitude ?long.
		   } `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

location.getLocation = async function (idLocation) {
	var query = `select * where {
		?loc a ha:Location.
		?loc ha:id "${idLocation}".
		?loc ha:first_line ?first.
		?loc ha:second_line ?second.
		?loc ha:postal_code ?postal.
		?loc ha:locality ?locality.
		?loc ha:municipality ?municipality.
		?loc ha:district ?district.
		?loc ha:latitude ?lat.
		?loc ha:longitude ?long.
			   } `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

location.getLocationAddressLong = async function (idLocation) {
	var query = `select * where {
		?loc a ha:Location.
    	?loc ha:id "${idLocation}".
		?loc  ha:first_line ?first.
		?loc  ha:second_line ?second.
		?loc  ha:postal_code ?postal.
		?loc  ha:locality ?locality.
		?loc  ha:municipality ?municipality.
		?loc  ha:district ?district.
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

location.getLocationAddressShort = async function (idLocation) {
	var query = `select * where {
		?loc a ha:Location.
    	?loc ha:id "${idLocation}".
		?loc  ha:first_line ?first.
		?loc  ha:second_line ?second.
		?loc  ha:postal_code ?postal.
		?loc  ha:locality ?locality.
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

location.getInstitutionsLocality = async function (nameLocality) {
	var query = `select ?id ?name  where {
		?loc ha:locality "${nameLocality}".
		?inst ha:hasLocation ?loc.
		?inst ha:name ?name.
		?inst ha:id ?id.
	}`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

location.getInstitutionsMunicipality = async function (nameMuni) {
	var query = `select ?id ?name  where {
		?loc ha:municipality "${nameMuni}".
		?inst ha:hasLocation ?loc.
		?inst ha:name ?name.
		?inst ha:id ?id.
	}`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

location.getInstitutionsDistrict = async function (nameDistrict) {
	var query = `select ?id ?name  where {
		?loc ha:district "${nameDistrict}".
		?inst ha:hasLocation ?loc.
		?inst ha:name ?name.
		?inst ha:id ?id.
	}`;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

location.insertLocation = async function (loc) {
	//First check what ID should the institution have
	var id = await getLocId();

	var query = `insert data {
		ha:location${id} a owl:NamedIndividual.
		ha:location${id} a ha:Location.
		ha:location${id} ha:id "${id}".
		ha:location${id} ha:first_line "${loc.first}".
		ha:location${id} ha:second_line "${loc.second}".
		ha:location${id} ha:municipality "${loc.muni}".
		ha:location${id} ha:locality "${loc.local}".
		ha:location${id} ha:district "${loc.district}".
		ha:location${id} ha:postal_code "${loc.postal}".
		ha:location${id} ha:latitude "${loc.lat}".
		ha:location${id} ha:longitude "${loc.long}".
	}
	`;

	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.post(getLinkUpdate + encoded);
		if (response.status == 204) {
			var result = "Successfully added location";
			return result;
		} else return "Error adding location";
	} catch (e) {
		console.log(e);
		throw e;
	}
};

getLocId = async function () {
	var query = `select ?id where {
		?loc a ha:Location.
		?loc ha:id ?id.
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

var person = module.exports;
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

person.getPersons = async function () {
	var query = `select ?id ?email ?first ?last where {
		?person a ha:Person.
		?person ha:id ?id.
		?person ha:email ?email.
		?person ha:first_name ?first.
		?person ha:last_name ?last
		   } `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

person.getPerson = async function (idPerson) {
	var query = `select * where {
		?per a ha:Person.
		?per ha:id "${idPerson}".
		?per ha:email ?email.
		?per ha:first_name ?first.
		?per ha:last_name ?last
		   } `;
	var encoded = encodeURIComponent(prefixes + query);

	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

person.getPassword = async function (idPerson) {
	var query = `select * where {
		?per a ha:Person.
		?per ha:id "${idPerson}"
		?per ha:password ?pass.
		   } `;
	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return myNormalize(response.data);
	} catch (e) {
		throw e;
	}
};

person.insertPerson = async function (person) {
	//First check what ID should the person have
	var id = await getPersonId();
	console.log(person);
	var query = `insert data
	{
		ha:person${id} a owl:NamedIndividual.
		ha:person${id} a ha:Person.
		ha:person${id} ha:id "${id}".
		ha:person${id} ha:first_name "${person.first}".
		ha:person${id} ha:last_name "${person.last}".
		ha:person${id} ha:email "${person.email}".
		ha:person${id} ha:password "${person.password}".
	}`;

	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.post(getLinkUpdate + encoded);
		if (response.status == 204) {
			var result = "Successfully added person";
			return result;
		} else return "Error adding person";
	} catch (e) {
		console.log(e);
		throw e;
	}
};

person.login = async function (person) {
	//Ask DB if person with email + password exists, if yes -> return true
	console.log("Controller:");
	console.log(person);
	var query = `ask  { 
		?person ha:email  "${person.email}".
		?person ha:password "${person.password}"
			}`;

	var encoded = encodeURIComponent(prefixes + query);
	try {
		var response = await axios.get(getLink + encoded);
		return response.data.boolean;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

getPersonId = async function () {
	var query = `select ?id where {
		?person a ha:Person.
		?person ha:id ?id.
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

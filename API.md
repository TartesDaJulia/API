# API Documentation

### This API is the bridge between the interface and the ontology created.

Runs on port 3000

## /institution

    Provides information about the institutions

##### GET

    /institutions/ -> Get Institutions
    	/:id -> Get specified institution details
    		/specialties
    		/subsystems
    		/rating		-> avg rating
    		/ratings	-> Ratings
    		/ratingsfull -> Ratings with full details
    		/ratingsid -> Ratings Ids
    		/image
    		/locationlong -> full location details
    		/locationshort -> shortened location details
    		/coordinates
    		/search
    			/:keyword -> searching keyword in institutions

### POST

    /institutions
    	/ -> add new institution

---

## /persons

    Provides information about the persons

### GET

    /person -> Get persons
    	/:id -> Get specified person details
    		/password

### POST

    /person
    	/ -> add person
    	/login -> login person

---

## /location

    Provides information about the locations

### GET

    /location -> Get locations
    	/:id -> Get specified location details
    		/addresslong -> long address
    		/addressshort -> short address
    		/instbyloc   -> locations with same locality
    		/instbymuni  -> locations with same municipality
    		/instbydistric -> -> locations with same district

### POST

    /location
    	/ -> add new location

---

## /rating

    Provides information about the ratings

### GET

    /rating/ -> Get Ratings
    	/:id -> Get specific rating details
    		/text
    		/score
    		/time
    		/full

### POST

    /rating
    	/ -> add new rating

---

## /subsystem

    Provides information about the subsystems

### GET

    /subsytem
    	/:id
    		/institutions -> get institutions with specified subsystem ID

---

## /specialty

    Provides information about the specialities

### GET

    /specialty
    	/:id
    		/institutions -> get institutions with specified specialty ID

# API Documentation

### This API is the bridge between the interface and the ontology created.

Runs on port 3000

## /institution

    Provides information about the institutions

    /institutions/ -> Get Institutions
    	/:id -> Get specified institution details
    		/specialties
    		/subsystems
    		/rating		-> avg rating
    		/ratings	-> ratings
    		/ratingsid -> ratings Ids
    		/image
    		/location
    		/coordinates

## /persons

    Provides information about the persons

    /person -> Get persons
    	/:id -> Get specified person details
    		/password

## /location

    Provides information about the locations

    /location -> Get locations
    	/:id -> Get specified location details
    		/addresslong -> long address
    		/addressshort -> short address
    		/instbyloc   -> locations with same locality
    		/instbymuni  -> locations with same municipality
    		/instbydistric -> -> locations with same district

## /rating

    /rating
    	/:id
    		/text
    		/score
    		/time
    		/full

## /subsystem

    /subsytem
    	/:id
    		/institutions -> get institutions with specified subsystem ID

## /specialty

    /specialty
    	/:id
    		/institutions -> get institutions with specified specialty ID

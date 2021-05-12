-- resumatic.tech definition

-- Drop table

-- DROP TABLE resumatic.tech;

CREATE TABLE resumatic.tech (
	techname varchar NOT NULL,
	id serial NOT NULL,
	CONSTRAINT tech_pk PRIMARY KEY (id)
);
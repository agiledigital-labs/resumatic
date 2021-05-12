-- resumatic.jobad definition

-- Drop table

-- DROP TABLE resumatic.jobad;

CREATE TABLE resumatic.jobad (
	title varchar NOT NULL,
	company varchar NOT NULL,
	selectioncriteria varchar NOT NULL,
	id int4 NOT NULL,
	CONSTRAINT jobad_pk PRIMARY KEY (id)
);
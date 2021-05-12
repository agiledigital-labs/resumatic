-- resumatic.experience definition

-- Drop table

-- DROP TABLE resumatic.experience;

CREATE TABLE resumatic.experience (
	title varchar NULL,
	project varchar NULL,
	responsibilities varchar NULL,
	startdate varchar NULL,
	enddate varchar NULL,
	applicantid int4 NOT NULL,
	id serial NOT NULL,
	CONSTRAINT experience_pk PRIMARY KEY (id)
);
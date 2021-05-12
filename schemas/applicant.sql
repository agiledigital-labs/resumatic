-- resumatic.applicant definition
-- Drop table
-- DROP TABLE resumatic.applicant;
CREATE TABLE resumatic.applicant (
	title varchar NULL,
	"name" varchar NULL,
	qualifications varchar NULL,
	skills varchar NULL,
	tech varchar NOT NULL,
	id serial NOT NULL,
	CONSTRAINT applicant_pk PRIMARY KEY (id),
	CONSTRAINT resume_un UNIQUE (tech)
);
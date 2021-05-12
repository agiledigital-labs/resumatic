-- resumatic.resume definition

-- Drop table

-- DROP TABLE resumatic.resume;

CREATE TABLE resumatic.resume (
	"name" varchar NOT NULL,
	title varchar NOT NULL,
	"location" varchar NOT NULL,
	email varchar NOT NULL,
	phone varchar NOT NULL,
	profile varchar NOT NULL,
	id serial NOT NULL,
	CONSTRAINT resume_pk PRIMARY KEY (id)
);
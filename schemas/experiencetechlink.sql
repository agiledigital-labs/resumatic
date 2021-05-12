-- resumatic.experiencetechlink definition

-- Drop table

-- DROP TABLE resumatic.experiencetechlink;

CREATE TABLE resumatic.experiencetechlink (
	experienceid int4 NOT NULL,
	techid int4 NOT NULL
);


-- resumatic.experiencetechlink foreign keys

ALTER TABLE resumatic.experiencetechlink ADD CONSTRAINT experiencetechlink_fk FOREIGN KEY (experienceid) REFERENCES resumatic.experience(id);
ALTER TABLE resumatic.experiencetechlink ADD CONSTRAINT experiencetechlink_fk_1 FOREIGN KEY (techid) REFERENCES resumatic.tech(id);
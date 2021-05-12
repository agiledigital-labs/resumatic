-- resumatic.jobadtechlink definition

-- Drop table

-- DROP TABLE resumatic.jobadtechlink;

CREATE TABLE resumatic.jobadtechlink (
	jobadid int4 NOT NULL,
	techid int4 NOT NULL
);


-- resumatic.jobadtechlink foreign keys

ALTER TABLE resumatic.jobadtechlink ADD CONSTRAINT jobadtechlink_fk FOREIGN KEY (jobadid) REFERENCES resumatic.jobad(id);
ALTER TABLE resumatic.jobadtechlink ADD CONSTRAINT jobadtechlink_fk_1 FOREIGN KEY (techid) REFERENCES resumatic.tech(id);
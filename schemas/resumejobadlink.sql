-- resumatic.resumejobadlink definition

-- Drop table

-- DROP TABLE resumatic.resumejobadlink;

CREATE TABLE resumatic.resumejobadlink (
	jobadid int4 NOT NULL,
	resumeid int4 NOT NULL
);


-- resumatic.resumejobadlink foreign keys

ALTER TABLE resumatic.resumejobadlink ADD CONSTRAINT resumejobadlink_fk FOREIGN KEY (resumeid) REFERENCES resumatic.resume(id);
ALTER TABLE resumatic.resumejobadlink ADD CONSTRAINT resumejobadlink_fk_1 FOREIGN KEY (jobadid) REFERENCES resumatic.jobad(id);
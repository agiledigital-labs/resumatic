-- resumatic.resumetechlink definition

-- Drop table

-- DROP TABLE resumatic.resumetechlink;

CREATE TABLE resumatic.resumetechlink (
	resumeid int4 NOT NULL,
	techid int4 NOT NULL
);


-- resumatic.resumetechlink foreign keys

ALTER TABLE resumatic.resumetechlink ADD CONSTRAINT resumetechlink_fk FOREIGN KEY (resumeid) REFERENCES resumatic.resume(id);
ALTER TABLE resumatic.resumetechlink ADD CONSTRAINT resumetechlink_fk_1 FOREIGN KEY (techid) REFERENCES resumatic.tech(id);
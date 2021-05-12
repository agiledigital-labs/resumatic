-- resumatic.experienceresumelink definition

-- Drop table

-- DROP TABLE resumatic.experienceresumelink;

CREATE TABLE resumatic.experienceresumelink (
	resumeid int4 NOT NULL,
	experienceid int4 NOT NULL
);


-- resumatic.experienceresumelink foreign keys

ALTER TABLE resumatic.experienceresumelink ADD CONSTRAINT experienceresumelink_fk FOREIGN KEY (experienceid) REFERENCES resumatic.experience(id);
ALTER TABLE resumatic.experienceresumelink ADD CONSTRAINT experienceresumelink_fk_1 FOREIGN KEY (resumeid) REFERENCES resumatic.resume(id);
# Text Generation Scripts

Run with Python 3.

## Install

```
pip3 install -r requirements.txt
```

## targeted-cv-profile.py

### Inputs

 - The engineer's first name.
 - Job description, selection criteria, etc. to target.
 - Core competencies (tags) to target. Comma-delimited list.
 - Untargeted CV profile. Optional.

### Outputs

 - A version of the CV profile re-written to target the job.

### Usage

```
python3 targeted-cv-profile.py [engineer-first-name] [job-info-file] [tags-file] [initial-profile-file]
```

or to run as a HTTP server

```
python3 targeted-cv-profile.py --server
```

### HTTP Interface

When started with `--server`, it accepts `POST` requests to `/generate-profile` with the input data
as JSON.

#### Example request and response

```JSON
curl http://localhost:58050/generate-profile \
    -H 'Content-Type: application/json' \
    --data '{ "engineer_name": "Jo",
    "job_info": "Job info here",
    "tags": ["Docker","C"],
    "initial_profile": "" }'
```

```JSON
{"Docker": " Jo has been using Docker for over 100 years.  Jo has been a web engineer for over 30 years.  Jo has a degree in Computer Science.  Jo has a Master's Degree in Computer Science.  Jo's experience in Ruby, Python, and PHP:  Jo has worked in the development of Ruby, Python, and PHP.  Jo has worked in the", "C": " Jo joined C on 4 July 2010, as part of the CIO Program at CQD and is currently a C++ compiler and software developer. After working with C and C++ for the past 2 years at some high performance C companies in San Jose and Toronto, including SAP AB, Jigsaw Studio, etc., Jo has spent the last year building apps for many C companies, writing for as many"}
```

### Example Usage

```
$ ./targeted-cv-profile.py Bill example-job-info example-tags example-initial-profile
Reading the input data.
Loading the tokenizer.
Loading the model.
Making the pipeline.
{
  "DevOps": " Bill has had extensive experience with DevOps with an eye towards building a resilient & reliable infrastructure that can serve all  DevOps projects across the industry. He has been working with leading companies like AWS and R3 with this goal in mind, to  create and maintain a robust and robust data centre infrastructure to enable a global  up to 25,000 machines connected. For the past decade,",
  "Haskell": " Bill has worked at both the Haskell and Haskell team since 2005. Bills experience with Haskell is well-established. In addition, Bill has worked in the Clojure and Cython teams since 2005, and has developed some web applications over time in the Haskell project. Bills experience  with Python development is well-established, and he has been working in the Python development front-end team over the last ten",
  "Elasticsearch": " As a senior development engineer for the  DynamoDB platform, he joined the Elasticsearch team as an  experienced and experienced  development engineer in 2005  in a time where Elasticsearch was growing rapidly  and the community had to adapt to the needs of millions of users and  the scale of applications had to be scaled. He has extensive experience in Elasticsearch and",
  "Containerisation": " In 1996 the first big containerisation project was  the Containerisation Cloud,  which enabled  30,000  Kbit/s (for the initial 10,000-15,000  Kbit/s)  from a large number of smaller firms  on the  demand for a fully containerised process  for the  large scale container"
}
```

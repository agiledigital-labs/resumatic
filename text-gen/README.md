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
 - Untargeted CV profile. To generate the whole profile, use something like "$engineer_name is".

### Outputs

 - A version of the CV profile re-written to target the job.

### Usage

```
python3 targeted-cv-profile.py [engineer-first-name] [job-info-file] [tags-file] [initial-profile-file]
```

### Example Usage

```
$ ./targeted-cv-profile.py Bill example-job-info example-tags example-initial-profile
Reading the input data.
Loading the tokenizer.
Loading the model.
Making the pipeline.
Prompt: Bill's experience with DevOps is
Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.
[{'generated_text': "Bill's experience with DevOps is \xa0the most popular use of his software in Linux\nand has a strong influence on the Linux kernel development workflow.\n\nBill's background in Software Engineering (iDevices) and DevOps has brought Bill's involvement to a new level.\n\nHe has the experience needed to develop a large code base and to create effective and agile mobile-first solutions.\n\nBill had a long and distinguished career in software engineering and is considered the best software engineer"}]
Prompt: Bill's experience with Haskell is
Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.
[{'generated_text': "Bill's experience with Haskell is Â based on deep knowledge and experience in programming languages such as Haskell and Ruby.\n\nBill is often associated with and inspired by startups, projects and industry pioneers such as IBM, Intel, Microsoft, Intel, Nokia and many others.\n\nBill's hobbies are: computer science, software engineering, business and scientific research, and software development.\n\nBill's LinkedIn page Â shows him working as part of the US National Security Agency and in its intelligence and"}]
Prompt: Bill's experience with Elasticsearch is
Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.
[{'generated_text': 'Bill\'s experience with Elasticsearch is \xa0a defining feature of his company.\n\nBill was awarded the 2017 JBC Technology Award and also has a Ph.D from George Washington University of Washington School of Engineering and Applied Science.\n\nBill\'s most recent book, \' The World\'s Best-Selling Software Engineer: A Personal Account of His Experience\n\n\' is a best seller in the category "The World\'s Best-Selling Software Engineer" published by Random House.\n\n'}]
Prompt: Bill's experience with Containerisation
 is
Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.
[{'generated_text': "Bill's experience with Containerisation\n is \xa0an interesting one for me as the first person to create the Virtual Machine platform based on Google\n\nAndroid, the world's most popular web operating system. Bill is also part of this team as an active member of the Virtual\n\nMachine community and developer. At the time he started out in Computer Engineering he was a part of\n\nan international team that provided technical support to a large number of development\n\nprojects in the United States, Australia"}]
```

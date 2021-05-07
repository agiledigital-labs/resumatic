#!/usr/bin/env python3
#
# targeted-cv-profile.py
#
# Usage:
#  python3 targeted-cv-profile.py [engineer-first-name] [job-info-file] [tags-file] [initial-profile-file]
# Inputs:
#  - Job description, selection criteria, etc. to target.
#  - TODO: Take selection criteria separately and include a sentence in the output that responds to
#          each criteria.
#  - Core competencies (tags) to target. Comma-delimited list.
#  - TODO: Full CV text.
#  - Untargeted CV profile. To generate the whole profile, use something like "$engineer_name is".
# Outputs:
#  - A version of the CV profile re-written to target the job.
#

import sys
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, GPT2Tokenizer, GPT2LMHeadModel

# Read in the data.
print('Reading the input data.')

engineer_name = sys.argv[1]

with open(sys.argv[2], 'r') as f:
    job_info = f.read()
with open(sys.argv[3], 'r') as f:
    tags = f.read().split(',')
with open(sys.argv[4], 'r') as f:
    initial_profile = f.read()

# Download and init the pretrained model.
# These steps take a really long time with gpt-neo-2.7B, so we're not currently using it.
#tokenizer = AutoTokenizer.from_pretrained('EleutherAI/gpt-neo-2.7B') #, output_loading_info=True)
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
print('Loading the tokenizer.')

#model = AutoModelForCausalLM.from_pretrained('EleutherAI/gpt-neo-2.7B') #, output_loading_info=True)
print('Loading the model.')
model = GPT2LMHeadModel.from_pretrained('gpt2')

# Make a pipeline we can feed questions to.
print('Making the pipeline.')
generate_text = pipeline('text-generation', model=model, tokenizer=tokenizer)

# Some context for the AI.
prefix = (engineer_name +
    ' is applying for a job. Here is the job description: ' +
    '\n' +
    job_info +
    '\n' +
    'Here is ' + engineer_name + '\'s CV: ' +
    initial_profile)

# Iterate through the tags and generate a small number of targeted sentences for each.
for tag in tags:
    prompt = (engineer_name + '\'s experience with ' + tag + ' is ')
    print('Prompt: ' + prompt)
    gen = generate_text(
            prompt,
            prefix=prefix,
            do_sample=True,
            temperature=0.9,
            max_length=100)
    print(gen)

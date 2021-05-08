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
from flask import Flask, json, request
from flask_cors import CORS, cross_origin

if sys.argv[1] == '--server':
    server_mode = True
else:
    # Read in the data.
    print('Reading the input data.')

    server_mode = False
    engineer_name = sys.argv[1]

    with open(sys.argv[2], 'r') as f:
        job_info = f.read()
    with open(sys.argv[3], 'r') as f:
        tags = [tag.strip() for tag in f.read().split(',')]
    if len(sys.argv) >= 3:
        with open(sys.argv[4], 'r') as f:
            initial_profile = f.read()

# Download and init the pretrained model.
# These steps take a really long time with gpt-neo-2.7B, so we're not currently using it.
print('Loading the tokenizer.')
#tokenizer = AutoTokenizer.from_pretrained('EleutherAI/gpt-neo-2.7B') #, output_loading_info=True)
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

print('Loading the model.')
#model = AutoModelForCausalLM.from_pretrained('EleutherAI/gpt-neo-2.7B') #, output_loading_info=True)
model = GPT2LMHeadModel.from_pretrained('gpt2')

# Make a pipeline we can feed questions to.
print('Making the pipeline.')
generate_text = pipeline('text-generation', model=model, tokenizer=tokenizer)

# Some examples for the AI.
example_responses = '''
Steven's experience with research:
Steven has demonstrated his abilities in analysing issues and preparing options for potential solutions, and his work with Clearmind Innovation Engineering (CIE) demonstrates this most clearly. Outside of his research and development work, Steven’s day-to-day tasks regularly included detailed analysis of features and improvements proposed for the CIE product range.

Mary's experience with process improvement:
For example, the Rush Industries customer base grew significantly during Mary’s tenure, and the complexity and scope of customisations to the product range needed to grow with it. Mary identified a series of process improvements that enabled Rush Industries to support a much wider range of customisations and variations in their software, and organised discussions with other involved groups, such as the IT and QA departments, to agree on a unified approach. With these improvements in place, the Rush Industries software and QA departments were able to systematically ensure the review and testing of all changes under each product configuration they had the potential to affect. Teams were able to create new configurations and customisations, or reinstate inactive ones, and have confidence about the scope of the testing work their changes would require. This also helped to reduce overlap in the QA process and made it easier for engineers and testers to justify their decisions when deciding the scope of QA work.

Leslie's experience with analysis:
In another example of her analysis work, Leslie was asked to investigate intermittent issues with the boot process of the component responsible for the primary application logic in JSTR’s products. The issues only occurred in rare cases and QA engineers had difficulty reproducing them under controlled conditions, so Leslie decided to perform a detailed analysis of the limited system logs they had managed to capture in cases where the issues had occurred.  By cross-referencing log messages with the system’s codebase and other information, Leslie was able to deduce enough about the system’s execution leading up to the issues occurring, and its state when they occurred, to identify concurrency errors in the code and determine that they were the root cause of the issues. Leslie wrote a detailed analysis document to record her research and discussed her findings at length with the engineers and QA staff involved to make sure they were correctly understood.

Sam's experience with Python:
Sam has over 5 years total experience as a Python software developer, primarily writing Python integration plug-ins for the Salesforce Platform. He has extensive experience with the Python Django web framework and designing and implementing MVC architectures. 

Max's experience with Python:
Through her consulting work with Primeware, Max has installed, configured and managed large-scale Hadoop deployments and oversaw implementation of jobs ranging over map reduce, HDFS, AWS. She personally developed multiple map reduce jobs in HIVE and PID for data cleaning and pre-processing stages.

-----------------------
'''

def gen_responses(engineer_name, job_info, tags, initial_profile=None):
    # Give the AI some context.
    prefix = (example_responses +
        '\n' +
        engineer_name +
        ' is applying for a job. Here is the job description:\n' +
        job_info)

    if initial_profile is not None and initial_profile != '':
        prefix += ('\n\nHere is ' +
                engineer_name +
                '\'s CV: ' +
                initial_profile)

    prefix += '\n\n'

    # Iterate through the tags and generate a small number of targeted sentences for each.
    responses = {}
    for tag in tags:
        prompt = (engineer_name + '\'s experience with ' + tag + ':\n')
        print('Generating text for the prompt "' + prompt + '"')
        gen = generate_text(
                prompt,
                prefix=prefix,
                do_sample=True,
                temperature=0.9,
                min_length=40,
                max_length=90)
        generated_text = gen[0]['generated_text']
        # Remove the prompt, clean it up and add it to the return value.
        # TODO: Should we remove the last sentence if it's short and incomplete?
        responses[tag] = generated_text[len(prompt):].replace('\n', ' ')

    return responses

def start_server():
    print('Starting the HTTP server.')
    api = Flask(__name__)
    CORS(api)

    @api.route('/generate-profile', methods=['POST'])
    @cross_origin()
    def generate_profile():
        data = request.get_json()
        engineer_name = data.get('engineer_name')
        job_info = data.get('job_info')
        tags = data.get('tags')
        initial_profile = data.get('initial_profile')
        print("Generating profile for ", engineer_name, ' ', job_info, ' ', tags, ' ', initial_profile)
        resp = json.dumps(gen_responses(engineer_name, job_info, tags, initial_profile))
        print("Response: ", resp)
        return resp

    api.run(host='0.0.0.0', port=58050)

if __name__ == '__main__':
    if server_mode:
        start_server()
    else:
        print(gen_responses(engineer_name, job_info, tags, initial_profile))

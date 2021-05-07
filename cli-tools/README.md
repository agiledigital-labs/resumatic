# Tools for Low Ceremony Postgrest

These are utility commands to interact with AWS services. As we don't have easy
ways of doing these tasks through the Web console or command line, we have
provided some scripts.

## Installation

1. Run `npm install`
2. Run `npm run build`

## Usage

You can use the commands from `dist/runner` file. It should already have
executable permissions from the building process.

From the root directory of the project you can use `tools` executable to run the
commands as well.

```shell
# From this directory
dist/runner <command> [arguments]

# From root directory
./tools <command> [arguments]
```

All the scripts have a dependency of the AWS-SDK. They all use the AWS
Credential provider for the credentials and the region. This will need to be set
for the scripts to work. To load from the `.aws/*` files you need to have the
environment variable `AWS_SDK_LOAD_CONFIG` set to a truthy value.

# OAI-PMH Service

**This repositery is a simplified version of the orignal. It is for educational purposed only.**

It was forked from the [node-18-upgrade](https://github.com/SciCatProject/oai-provider-service/tree/node-18-upgrade) branch of the scicat project.

[![Build Status](https://github.com/SciCatProject/oai-provider-service/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/SciCatProject/oai-provider-service/actions)
[![DeepScan grade](https://deepscan.io/api/teams/8394/projects/10552/branches/148053/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8394&pid=10552&bid=148053)
[![Known Vulnerabilities](https://snyk.io/test/github/SciCatProject/oai-provider-service/master/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SciCatProject/oai-provider-service/master?targetFile=package.json)

Credit upstream authors from the [SciCat Project](https://github.com/SciCatProject/oai-provider-service)

Credit upstream author hatfieldlibrary/oai-provider-service.

OAI-PMH Service is a Nodejs Express application that supports multiple, configurable [OAI-PMH version 2.0](https://www.openarchives.org/OAI/openarchivesprotocol.html) data providers.

OAI-PMH Service borrows from the [Modular OAI-PMH Server](https://github.com/NatLibFi/oai-pmh-server), University of Helsinki, 
The National Library of Finland. 

## Changes
* All packages have been updated to the most recent version (as of May 2024)
* The mongodb driver code was updated to support the acync 'connect' operation.
* Some inferfaces, assigned to the http request class, has been updated. **Note**: Those changes might not be very good but work for now.

## Dependenices

* Node v22.0.0+
* Typescript 5.4.5+
* npm 10.5.1+

## Capabilities

Supports `Identify`, `ListMetadataFormats`, `GetRecord`, `ListIdentifiers` and `ListRecords`. The optional
`from` and `until` arguments are supported for selective harvesting with `YYYY-MM-DDThh:mm:ssZ` granularity.  `ListSets` is not supported.  

## Install It
```
npm install
```

## Configure It

The service uses dotenv to import variables into the environment and from the top level .env file (in the production dir), a variable HOST_CONFIGURATION is defined which points to a JSON file, defining port and host for the service itself. If multiple providers are desired, then the definition of HOST_CONFIGURATION should be moved to the provider level. At this time, we do not require multiple providers.

### Required environment

Source
- Environment Variables
   - from OS
   - from docker -e KEY=Value options
   - from docker-compose 'environment' section
- .env file in the root directory of the project.
  - entries in the .env file won't overwrite the Environment Variable (above)

**System variables**
 Key | Description | Default
 --------:|-------------| --------
DAPP_ID | No Idea | oai-pmh-service
CONNECTOR | (don't change) | mongodb
ADMIN_USER_EMAIL | E-Mail address of the admin user | none
LOG_LEVEL | default/error/warning | none  

**Mongo DB variables**

 Key | Description | Default
 --------:|-------------| --------
CONNECTOR | (don't change) | mongodb
DB_HOST | Database Hostname | none
DB_PORT | Database Port | none
DB_USER | Database Username | none
DB_PASS | Database Password | none
DB_URL |  [&lt;user&gt;:&lt;password&gt;@]&lt;host&gt;:&lt;port&gt;/&lt;dbName&gt;| none
DATABASE | Publication Database | oai-publications
COLLECTION | Collection to storage Publation Documents| Publications

**Note**: When DB_URL is specified, DB_HOST/DB_PORT/DB_USER/DB_PASS and DATABASE are ignored.

## Compile It
```
node_modules/.bin/rsc
```

## Run It Locally

- Copy the EXAMPLE_ENV file to '.env'
- Customize the '.env' file to your needs.
  
```
node src/index
```

## Create a docker container

- Customize the EXAMPLE_ENV file.
- The file will be copied to '.env' within the container.
- Variables can be overwritten via '-e' in 'docker run ...' or in the 'environment section' of docker-compose.yaml
  
```
docker build -t oai-pmh-service .
```

#### Routes:

The Express server will start on default port 3000.  

* [`http://localhost:3000/scicat/oai?verb=Identify`](http://localhost:3000/scicat/oai?verb=Identify)
* [`http://localhost:3000/scicat/oai?verb=ListMetadataFormats`](http://localhost:3000/scicat/oai?verb=ListMetadataFormats)
* [`http://localhost:3000/scicat/oai?verb=GetRecord&identifier=1&metadataPrefix=oai_dc`](http://localhost:3000/scicat/oai?verb=GetRecord&identifier=1&metadataPrefix=oai_dc)
* [`http://localhost:3000/scicat/oai?verb=ListIdentifiers&metadataPrefix=oai_dc`](http://localhost:3000/scicat/oai?verb=ListIdentifiers&metadataPrefix=oai_dc)
* [`http://localhost:3000/scicat/oai?verb=ListRecords&metadataPrefix=oai_dc`](http://localhost:3000/scicat/oai?verb=ListRecords&metadataPrefix=oai_dc)

### PUT Records:

Add new records to your mongodb instance by HTTP PUT using the following route:

* `http://localhost:3000/scicat/Publication`



The project can be deployed to a production server and started with `node index` from within `dist`. Runtime configurations
can be adjusted using `.env` and (recommended) external configuration files created for your environment. We typically run as server daemon using [forever](https://github.com/foreverjs/forever), or some tool 
to assure that the server runs continuously.  






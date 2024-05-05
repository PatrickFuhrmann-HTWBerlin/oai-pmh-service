# OAI-PMH Service

[![Build Status](https://github.com/SciCatProject/oai-provider-service/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/SciCatProject/oai-provider-service/actions)
[![DeepScan grade](https://deepscan.io/api/teams/8394/projects/10552/branches/148053/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8394&pid=10552&bid=148053)
[![Known Vulnerabilities](https://snyk.io/test/github/SciCatProject/oai-provider-service/master/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SciCatProject/oai-provider-service/master?targetFile=package.json)

Credit upstream authors from the [SciCat Project](https://github.com/SciCatProject/oai-provider-service)

Credit upstream author hatfieldlibrary/oai-provider-service.

OAI-PMH Service is a Nodejs Express application that supports multiple, configurable [OAI-PMH version 2.0](https://www.openarchives.org/OAI/openarchivesprotocol.html) data providers.

OAI-PMH Service borrows from the [Modular OAI-PMH Server](https://github.com/NatLibFi/oai-pmh-server), University of Helsinki, 
The National Library of Finland. 
 

## Dependenices

* Node 8.9.4+
* Typescript 2.7.2+
* npm 5.6.0+

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
- .env file from the root directory

 Key | Description | Default
 --------:|-------------| --------
DATABASE | | oai-publications
COLLECTION | | Publications
APP_ID | No Idea | oai-pmh-service
DB_HOST | Database Hostname | none
DB_PORT | Database Port | none
DB_USER | Database Username | dacatDBAdmin
DB_PASS | Database Password | none
CONNECTOR |  | mongodb
ADMIN_USER_EMAIL | | none
LOG_LEVEL | | none  
BASE_URL | | http://localhost

 
## Run It
#### Run in *development* mode:

```
npm run dev
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


## Run in *production* mode:

At the simplest level:
```
npm run compile
npm start
```

The gulp tasks compile Typescript and copy files to `dist`. 

The project can be deployed to a production server and started with `node index` from within `dist`. Runtime configurations
can be adjusted using `.env` and (recommended) external configuration files created for your environment. We typically run as server daemon using [forever](https://github.com/foreverjs/forever), or some tool 
to assure that the server runs continuously.  






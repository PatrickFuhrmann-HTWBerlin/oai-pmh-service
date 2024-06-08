

```
git clone https://github.com/SciCatProject/oai-provider-service.git
cd oai-provider-service
rm package*.json
npm install node "@types/node"
npm install bluebird
npm install body-parser cookie-parser
npm install cors dotenv express http-auth lodash mongodb pino xml xmldom
npm install
```
EDIT package.json, and add the usual header.

```
  "name": "OAI-PMH-Service",
  "version": "1.0.0",
  "description": "A standalone OAI-PMH provider for Nodejs that can support multiple data sources.",
  "main": "index.js",
  "license": "GPL-3.0",
  "repository": "https://github.com/hatfieldlibrary/oai-provider-service",
  "engines": {
    "node": ">=18.0.0"
  },

```
Because we observe an error message, indicating big problems with 'inflight' we can replace the inflight package with
the suggested package 'lru-cache'. Insight is used by gulp.
EDIT package.json, add the inflight replacement for gulp.
```
  "overrides": {
    "inflight": {
      "lru-cache": "^8.0.0"
    }
  },
```
For the develpement we need those packages:
```
  "devDependencies": {
    "@types/mocha": "^10.0.6",
    "chai": "^5.1.1",
    "gulp": "^5.0.0",
    "gulp-typescript": "^6.0.0-alpha.1",
    "jsdom": "^24.1.0",
    "mocha": "^10.4.0",
    "sinon": "^18.0.0",
    "supertest": "^7.0.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
```
```
 2339  vi package.json
 2340  npm run compile
 2341  vi package.json.org
 2342  vi package.json.org
 2343  npm install "@types/node"
 2344  npm run compile
 2345  vi src/server/logger.ts
 2346  npm run compile
 2347  vi src/providers/scicat-provider/dao/mongo-dao.ts
 2348  vi src/providers/scicat-provider/dao/mongo-dao.ts
 2349  npm run compile
 2350  vi src/providers/scicat-provider/dao/mongo-dao.ts
 2351  npm run compile
 2352  vi src/providers/scicat-provider/dao/mongo-dao.ts
 2353  npm run compile
 2354  vi src/providers/scicat-provider/dao/mongo-dao.ts
 ```

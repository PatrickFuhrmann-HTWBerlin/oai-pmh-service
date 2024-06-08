
## Prepare *the package.json* file

```
git clone https://github.com/SciCatProject/oai-provider-service.git
cd oai-provider-service
rm package*.json
npm install node "@types/node"
npm install bluebird
npm install body-parser cookie-parser
npm install cors dotenv express http-auth lodash mongodb pino xml xmldom
```
## EDIT package.json, and add the usual header.

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
## Add the functions/scripts:
```
  "scripts": {
    "clean": "gulp dist-clean",
    "distclean": "gulp dist-clean && gulp build && gulp copy-production",
    "ourcompile": "tsc src/index.ts",
    "compile": "gulp dist-clean && gulp build && gulp copy-production",
    "dev": "gulp build && gulp copy && cd dist && node index | pino -o 'short'",
    "test": "node build.js && mocha  --extension [\"ts\"] 'test/**/*.ts'"
  },

```
## For the develpement we need those packages:
```
  "devDependencies": {
    "@types/mocha": "^10.0.6",
    "rimraf": "^5.0.7",
    "source-map-support": "^0.5.21",
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
And now run the installation
```
npm install
```

## Fix gulp 
### The 'del' fix
* gulpfile still uses 'del'. We move to rimraf.
In the gulpfile.js
* remove the 'var del = = require("del");' line
* remove the talk definition 'gulp.task("dist-clean", function(done) {'
* replace the above by
```
const rimraf = require('rimraf');

gulp.task("dist-clean", function(done) {

try {
  rimraf.sync('dist');
} catch (err) {
  console.error('Error deleting files:', err);
}
done();
});
```
### The 'pino' fix
In the file : *src/server/logger.ts*
Replace the 
```
import pino = require('pino');
```
by 
```
const pino = require('pino');
```
## Try to compile
Now the infrastructure is fine, but if you try to compile you will find that the mongodb code is outdated.
```
npm run compile
```
The compiler will complain about mongodb.ts
## Fix the mongo code (formally)
In the constructor of *src/providers/scicat-provider/dao/mongo-dao.ts* add this line
```
public mongoDb: MongoClient ;
```
and replace this code
```
     MongoClient.connect("mongodb://" + url, { useUnifiedTopology: true }, (err, client) => {
       if (err) {
         logger.error("failed to connect", err);
         this.db = null;
       }
       this.db = client.db(this.dbName);
     });
```
by this 
```
     const  myUrl = "mongodb://"+url ;
     this.mongoDb = new MongoClient(  myUrl );
  
     this.mongoDb.connect()
        .then( client => {
             this.db = client.db(this.dbName) ;
             logger.debug("Client succefully connected to: "+myUrl) ;
           }
        ).catch(
           error => {
              logger.error("Failed to connect to "+url+" : "+error.message);
              this.db = null;
           }
        );
```
Finally replace 
```
filter: MongoClient.filter
```
by 
```
filter: any
```
in the argument list of *recordsQuery*, *identifiersQuery* and *getRecord*.
## Compile again
Now it should compile.


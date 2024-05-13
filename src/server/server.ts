/*
 *  Original work Copyright 2018 Willamette University
 *  Modified work Copyright 2019 SciCat Organisations
 *
 *  This file is part of OAI-PHM Service.
 *
 *  @author Michael Spalti
 *
 *  OAI-PHM Service is based on the Modular OAI-PMH Server, University of Helsinki,
 *  The National Library of Finland.
 *
 *  OAI-PHM Service is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  OAI-PHM Service is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with OAI-PHM Service.  If not, see <http://www.gnu.org/licenses/>.
 */

import express = require("express");
import { Application } from "express";
import bodyParser = require("body-parser");
import http = require("http");
import logger from "./logger";
import { getHostConfiguration, hasHostConfigurationFile } from "./host-config";
import { CorsOptions } from "cors";
var cors = require('cors')


const app = express();


export default class ExpressServer {
  constructor() {
    const options: CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token"
      ],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      //origin: API_URL,
      preflightContinue: false
    };

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use(cors(options));

  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    return this;
  }

  listen(): Application {
    const config = this.getConfiguration();
    const port = this.getPort(config);

    const welcome: any = () => {
      logger.info(
        `******** Up and running in ${process.env.NODE_ENV ||
          "development"} @: ${process.env.BASE_URL} on port: ${port}}***********`
      );
    };

    http.createServer(app).listen(port, welcome());
    return app;
  }

  /**
   * Returns default port if host configuration is not available.
   * @returns {number}
   */
  private getConfiguration(): object {
    if (hasHostConfigurationFile()) {
      return getHostConfiguration();
    } else {
      logger.warn( "No configuration provided. Trying REST_PORT (Def: 3000)");
      const listen_port = process.env.REST_PORT ? process.env.REST_PORT : 3000;
      return { port: listen_port };
    }
  }

  /**
   * Return configuration port or default port.
   * @param configuration
   * @returns {number}
   */
  private getPort(configuration: any): number {
    if (configuration) {
      if (configuration.port) {
        return configuration.port;
      }
    }
    return 3000;
  }
}

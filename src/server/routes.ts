/*
 *  Copyright 2018 Willamette University
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

import { Application } from 'express';
import * as tagger from "../providers/controllers/tagger";
import * as sample from "../providers/controllers/sample";
import * as scicat from "../providers/controllers/scicat";
import logger from "./logger";
import * as bodyParser from "body-parser";

export default function routes(app: Application): void {
  logger.debug('Setting express routes for OAI providers.');
  // already defined in server
  //app.use(bodyParser.urlencoded({ extended: true }))
  //app.get('/tagger/oai', tagger.oai);
  //app.get('/sample/oai', sample.oai);
  //console.log()
  //app.get('/scicat/oai', scicat.oai);
  app.post('/scicat/publications', scicat.publications);
  logger.warn('--------------xxxxxxxxxxxxxx---------------------------');
};
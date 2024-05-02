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

import * as dotenv from 'dotenv';

// const dotenv_path =  __dirname + '/.env'
// console.log("Trying to load dotenv : "+dotenv_path);
// dotenv.config({path: dotenv_path });
dotenv.config();

console.log("Environment Variables:");
Object.keys(process.env).forEach(key => {
    console.log(`${key}: ${process.env[key]}`);
});

export const getCollectionID = () => (process.env.COLLECTION_ID || 'doi');

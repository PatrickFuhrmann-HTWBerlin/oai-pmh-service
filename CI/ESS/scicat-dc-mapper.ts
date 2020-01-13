import logger from "../../../server/logger";
import { ProviderDCMapper } from "../../core/core-oai-provider";

export class ScicatDcMapper implements ProviderDCMapper {
  /**
   * The Universal Coordinated Time (UTC) date needs to be modifed
   * to match the local timezone.
   * @param record the raw data returned by the mongo dao query
   * @returns {string}
   */
  private setTimeZoneOffset(record: any): string {
    const date = new Date(record.updatedAt);
    const timeZoneCorrection = new Date(
      date.getTime() + date.getTimezoneOffset() * -60000
    );
    return timeZoneCorrection.toISOString().split(".")[0] + "Z";
  }

  private getRightsMessage(restricted: boolean): string {
    if (restricted) {
      return "Restricted to University users.";
    }
    return "Available to the public.";
  }

  private createItemRecord(record: any): any {
    //const updatedAt: string = this.setTimeZoneOffset(record);
    let item = {
      record: [
        {
          header: [
            {
              identifier: [
                { _attr: { identifierType: "DOI" } },
                record._id.toString()
              ]
            },
            { setSpec: "openaire_data" },
            { datestamp: "2020-01-01" }
          ]
        },
        {
          metadata: [
            {
              "oai_dc:dc": [
                {
                  _attr: {
                    "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                    "xmlns:dcterms": "http://purl.org/dc/terms/",
                    "xmlns:datacite": "http://datacite.org/schema/kernel-4",
                    "xmlns": "http://namespace.openaire.eu/schema/oaire/",
                    "xsi:schemaLocation":
                      "http://namespace.openaire.eu/schema/oaire/" +
                      "https://www.openaire.eu/schema/repo-lit/4.0/openaire.xsd"
                  }
                },
                // ......does it matter what these fields are called?
                {
                  titles: [{ title: record.title }]
                },
                { description: record.dataDescription },
                { date: [{ _attr: { dateType: "Issued" } }, "2020-01-01"] },
                { publicationYear: record.publicationYear },
                {
                  creators: [{ creator: record.creator }]
                },
                { publisher: record.publisher }, //category?/ source?
                { version: 1 }, //category?/ source?
                {
                  rightsList: [
                    {
                      rights: [
                        {
                          _attr: {
                            rightsURI: "info:eu-repo/semantics/openAccess"
                          }
                        },
                        "OpenAccess"
                      ]
                    }
                  ]
                }
              ] //rights?
              // .....add more fields here
            }
          ]
        }
      ]
    };
    return item;
  }

  public mapOaiDcListRecords(records: any[]): any {
    const list = [];
    const response = {
      ListRecords: <any>[]
    };

    for (let record of records) {
      let item = this.createItemRecord(record);
      list.push(item);
    }

    logger.debug("Parsed " + list.length + " records into OAI xml format.");

    response.ListRecords = list;

    return response;
  }

  public mapOaiDcGetRecord(record: any): any {
    if (!record) {
      throw new Error("Record not found");
    }

    let item = this.createItemRecord(record);
    logger.debug("Got item with id " + record._id + ", title: " + record.title);
    return item;
  }

  public mapOaiDcListIdentifiers(records: any[]): any {
    const list = [];
    const response = {
      ListIdentifiers: <any>[]
    };

    for (let record of records) {
      const updatedAt: string = this.setTimeZoneOffset(record);
      let item = {
        record: [
          {
            header: [
              { identifier: record.id.toString() },
              { datestamp: updatedAt }
            ]
          }
        ]
      };

      list.push(item);
    }

    response.ListIdentifiers = list;

    return response;
  }

  public mapOaiDcListSets(records: any[]): any {
    const response = {
      ListSets: <any>[]
    };
    const list = [];
    let item = {
      set: [{ setName: "openaire_data" }, { setSpec: "openaire_data" }]
    };
    list.push(item);

    response.ListSets = list;
    return response;
  }
}
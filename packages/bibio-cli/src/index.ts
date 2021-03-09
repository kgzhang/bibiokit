import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

import {
  addMappingES7,
  createIndices,
  dropIndices,
  getMapping,
  getSearchConfig,
  getSKQuickStartText,
  indexDocs,
} from './lib';

export { splitComma, toDate, toNumber } from './lib';

export interface SearchField {
  facet?: boolean; // used as a faced
  stored?: boolean; // fields returned in api
  fieldName: string;
  searchable?: boolean; // seachable in query
  type?: 'integer' | 'date' | 'float' | 'geo_point'; // default keyword
  sourceOptions?: {
    path: string; //  Used in indexing step. The key for the field value source.
    transform?: (
      str: string,
      document: Record<string, unknown>,
    ) => string | number | null | string[]; //Optional. To provide transformation from source to document field
  };
}

export interface CliConfig {
  index: string;
  type?: string; // important: es6, not es7
  host: string;
  source?: any;
  fields: SearchField[];
}

export const withConfig = async (config: CliConfig) => {
  let mapping;

  await inquirer
    .prompt({
      name: 'Generate Example Searchkit Config?',
      type: 'confirm',
    })
    .then((answers) => {
      const chosenAnswer = Object.values(answers)[0];

      if (chosenAnswer) {
        mapping = getMapping(config);

        const skConfig = getSearchConfig(config, mapping);
        const c = getSKQuickStartText({
          ...skConfig,
          host: config.host,
          index: config.index,
          mapping,
        });

        fs.writeFileSync(path.join(process.cwd(), '/skconfig.md'), c);
      }
    });

  if (config.host) {
    await inquirer
      .prompt({
        name: 'Host detected. Destroy index and reinsert index mapping?',
        type: 'confirm',
      })
      .then(async (answers) => {
        const chosenAnswer = Object.values(answers)[0];

        if (chosenAnswer) {
          await dropIndices(config);
          await createIndices(config);
          await addMappingES7(config);
        }
      });

    if (config.source) {
      await inquirer
        .prompt({
          name: 'Source detected. Insert documents into ES host?',
          type: 'confirm',
        })
        .then(async (answers) => {
          const chosenAnswer = Object.values(answers)[0];

          if (chosenAnswer) {
            await indexDocs(config);
          }
        });
    }
  }
};

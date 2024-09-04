import fsPromise from 'fs/promises';

import convertCollection from './src/utils/importers/postman-collection';

async function main() {
  await fsPromise.mkdir('collections/bru', { recursive: true });
  let collectionFiles = await fsPromise.readdir('collections', { withFileTypes: true });
  collectionFiles = collectionFiles.filter(content => !content.isDirectory());

  for (let collectionFile of collectionFiles) {
    const collection = await convertCollection(`collections/${collectionFile.name}`);
    await fsPromise.writeFile(`collections/bru/${collectionFile.name}.bru.json`, JSON.stringify(collection, null, 2));
    console.info(`Done writing ${collectionFile.name}`)
  }

}

main();

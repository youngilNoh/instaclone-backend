import { loadFilesSync, makeExecutableSchema, mergeResolvers, mergeTypeDefs } from 'graphql-tools';
import path from 'path';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(path.join(__dirname, './**/*.{queries,mutations}.js'));

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

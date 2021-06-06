import {
	loadFilesSync,
	// makeExecutableSchema,
	mergeResolvers,
	mergeTypeDefs,
} from 'graphql-tools';
import * as path from 'path';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// export default schema;

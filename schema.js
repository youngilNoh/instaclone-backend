import { loadFilesSync, mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools';

// 모든 typeDefs와 Resolver를 하나로 묶어서 가져올 수 있도록 함
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries, mutations}.js`);

// Root typeDefs, resolvers를 만드는 작업
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export default schema;

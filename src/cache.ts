
import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPeople: {
          keyArgs: false,
          merge(existing, incoming, { mergeObjects }) {
            let results: Reference[] = [];
            if (existing && existing.results) {
              console.log('existing', existing)
              results = results.concat(existing.results);
            }
            if (incoming && incoming.results) {
              console.log('incoming', incoming,)
              results = results.concat(incoming.results);
            }
            return {
              ...incoming,
              results,
            };
          }
        }
      }
    }
  }
});

//apollo reactive variable
export let searchVar = makeVar<string>('');

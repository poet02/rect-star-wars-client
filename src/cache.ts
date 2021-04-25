
import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchString: {
            read (value = "UNKNOWN NAME") { 
              return value;
            }
        },
        getPeople: {
         keyArgs: false,
          merge(existing, incoming) {
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

export let searchVar = makeVar<string>('');
export let resetPageVar = makeVar<boolean>(false);
export let totalPeopleVar = makeVar<number>(0);
export let showingPeopleVar = makeVar<number>(0);
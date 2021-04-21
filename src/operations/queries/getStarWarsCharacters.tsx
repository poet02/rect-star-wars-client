import { gql } from "@apollo/client";

export const GET_STAR_WARS_CHARACTERS = gql`
query StarWarsCharacters($search: String, $page: Int) {
    getPeople (search: $search, page: $page) {
    count
    next
    results {
      name
      height
      mass
      gender
      homeWorld
    }
  }
}
`;
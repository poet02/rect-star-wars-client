/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StarWarsCharacters
// ====================================================

export interface StarWarsCharacters_getPeople_results {
  __typename: "Person";
  name: string | null;
  height: string | null;
  mass: string | null;
  gender: string | null;
  homeWorld: string | null;
}

export interface StarWarsCharacters_getPeople {
  __typename: "PagedPeople";
  count: number | null;
  next: string | null;
  results: (StarWarsCharacters_getPeople_results | null)[] | null;
}

export interface StarWarsCharacters {
  getPeople: StarWarsCharacters_getPeople | null;
}

export interface StarWarsCharactersVariables {
  search?: string | null;
  page?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStarWarsCharacters
// ====================================================

export interface GetStarWarsCharacters_getStarWarsCharacters_results {
  __typename: "Person";
  name: string | null;
  height: string | null;
  mass: string | null;
  gender: string | null;
  homeWorld: string | null;
}

export interface GetStarWarsCharacters_getStarWarsCharacters {
  __typename: "PagedPeople";
  count: number | null;
  next: string | null;
  results: (GetStarWarsCharacters_getStarWarsCharacters_results | null)[] | null;
}

export interface GetStarWarsCharacters {
  getStarWarsCharacters: GetStarWarsCharacters_getStarWarsCharacters | null;
}

export interface GetStarWarsCharactersVariables {
  search?: string | null;
  page?: number | null;
}

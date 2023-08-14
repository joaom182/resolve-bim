import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Bim = {
  __typename?: 'Bim';
  entities: Array<Entity>;
  entity: Entity;
  id: Scalars['Int']['output'];
};


export type BimEntityArgs = {
  id: Scalars['Int']['input'];
};

export type Entity = {
  __typename?: 'Entity';
  entityId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  properties: Scalars['JSON']['output'];
};

export type Query = {
  __typename?: 'Query';
  bim: Bim;
  bims: Array<Bim>;
  entities: Array<Entity>;
  entity?: Maybe<Entity>;
};


export type QueryBimArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEntitiesArgs = {
  bimId: Scalars['Int']['input'];
};


export type QueryEntityArgs = {
  bimId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};

export type EntityDetailsQueryVariables = Exact<{
  entityId: Scalars['Int']['input'];
  bimId: Scalars['Int']['input'];
}>;


export type EntityDetailsQuery = { __typename?: 'Query', entity?: { __typename: 'Entity', entityId: number, name: string, properties: any } | null };


export const EntityDetailsDocument = gql`
    query EntityDetails($entityId: Int!, $bimId: Int!) {
  entity(id: $entityId, bimId: $bimId) {
    entityId
    name
    properties
    __typename
  }
}
    `;

/**
 * __useEntityDetailsQuery__
 *
 * To run a query within a React component, call `useEntityDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityDetailsQuery({
 *   variables: {
 *      entityId: // value for 'entityId'
 *      bimId: // value for 'bimId'
 *   },
 * });
 */
export function useEntityDetailsQuery(baseOptions: Apollo.QueryHookOptions<EntityDetailsQuery, EntityDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntityDetailsQuery, EntityDetailsQueryVariables>(EntityDetailsDocument, options);
      }
export function useEntityDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntityDetailsQuery, EntityDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntityDetailsQuery, EntityDetailsQueryVariables>(EntityDetailsDocument, options);
        }
export type EntityDetailsQueryHookResult = ReturnType<typeof useEntityDetailsQuery>;
export type EntityDetailsLazyQueryHookResult = ReturnType<typeof useEntityDetailsLazyQuery>;
export type EntityDetailsQueryResult = Apollo.QueryResult<EntityDetailsQuery, EntityDetailsQueryVariables>;
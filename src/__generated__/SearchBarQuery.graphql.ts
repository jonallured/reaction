/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SearchBarQueryVariables = {
    readonly query: string;
};
export type SearchBarQueryResponse = {
    readonly search: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly __typename: string;
                readonly displayLabel: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
};
export type SearchBarQuery = {
    readonly response: SearchBarQueryResponse;
    readonly variables: SearchBarQueryVariables;
};



/*
query SearchBarQuery(
  $query: String!
) {
  search(query: $query) {
    edges {
      node {
        __typename
        displayLabel
        ... on Node {
          __id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "query",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "search",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query",
        "type": "String!"
      }
    ],
    "concreteType": "SearchableConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "SearchableEdge",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "displayLabel",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "SearchBarQuery",
  "id": null,
  "text": "query SearchBarQuery(\n  $query: String!\n) {\n  search(query: $query) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SearchBarQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SearchBarQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'afa99d6b10cb61697eb45c662b012634';
export default node;

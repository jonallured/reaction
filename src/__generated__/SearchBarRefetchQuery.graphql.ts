/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SearchBarRefetchQueryVariables = {
    readonly query: string;
};
export type SearchBarRefetchQueryResponse = {
    readonly omglol: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly __typename: string;
                readonly displayLabel: string | null;
                readonly href: string | null;
                readonly imageUrl: string | null;
                readonly searchableType?: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
};
export type SearchBarRefetchQuery = {
    readonly response: SearchBarRefetchQueryResponse;
    readonly variables: SearchBarRefetchQueryVariables;
};



/*
query SearchBarRefetchQuery(
  $query: String!
) {
  omglol: search(query: $query, first: 10, entities: [ARTIST, ARTWORK], mode: AUTOSUGGEST) {
    edges {
      node {
        __typename
        displayLabel
        href
        imageUrl
        ... on SearchableItem {
          searchableType
        }
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
    "alias": "omglol",
    "name": "search",
    "storageKey": null,
    "args": [
      {
        "kind": "Literal",
        "name": "entities",
        "value": [
          "ARTIST",
          "ARTWORK"
        ],
        "type": "[SearchEntity]"
      },
      {
        "kind": "Literal",
        "name": "first",
        "value": 10,
        "type": "Int"
      },
      {
        "kind": "Literal",
        "name": "mode",
        "value": "AUTOSUGGEST",
        "type": "SearchMode"
      },
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
                "name": "href",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "imageUrl",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "SearchableItem",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "searchableType",
                    "args": null,
                    "storageKey": null
                  }
                ]
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
  "name": "SearchBarRefetchQuery",
  "id": null,
  "text": "query SearchBarRefetchQuery(\n  $query: String!\n) {\n  omglol: search(query: $query, first: 10, entities: [ARTIST, ARTWORK], mode: AUTOSUGGEST) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        href\n        imageUrl\n        ... on SearchableItem {\n          searchableType\n        }\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SearchBarRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SearchBarRefetchQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'a0fb7f2569ba0d77cf1f00185634226a';
export default node;

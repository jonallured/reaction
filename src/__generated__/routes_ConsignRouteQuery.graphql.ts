/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ConsignRouteQueryVariables = {
    artistID: string;
};
export type routes_ConsignRouteQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ConsignRoute_artist">;
    } | null;
};
export type routes_ConsignRouteQuery = {
    readonly response: routes_ConsignRouteQueryResponse;
    readonly variables: routes_ConsignRouteQueryVariables;
};



/*
query routes_ConsignRouteQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ConsignRoute_artist
    id
  }
}

fragment ConsignRoute_artist on Artist {
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ConsignRouteQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ConsignRoute_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ConsignRouteQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ConsignRouteQuery",
    "id": null,
    "text": "query routes_ConsignRouteQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ConsignRoute_artist\n    id\n  }\n}\n\nfragment ConsignRoute_artist on Artist {\n  id\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'bb93186fa08cbe6d4d54bd57fb757f0e';
export default node;

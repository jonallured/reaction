/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConsignRoute_artist = {
    readonly id: string;
    readonly " $refType": "ConsignRoute_artist";
};
export type ConsignRoute_artist$data = ConsignRoute_artist;
export type ConsignRoute_artist$key = {
    readonly " $data"?: ConsignRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ConsignRoute_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ConsignRoute_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '992e9db8f9ccbfdb00a18638d6659bd3';
export default node;

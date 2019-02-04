import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "Artsy/Relay/RootQueryRenderer"

import { SearchBarRefetchContainer } from "../SearchBar"

export function SearchBarExample() {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkGridQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworks_connection(first: 10) {
              ...ArtworkGrid_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return (
          readyState.props && (
            <SearchBarRefetchContainer {...readyState.props.search as any} {...props} />
          )
        )
      }}
    />
  )
}

storiesOf("Components/SearchBarQueryRenderer", module)
  .add("SearchBarQueryRenderer", () => (
    <SearchBarQueryRenderer />
  ))

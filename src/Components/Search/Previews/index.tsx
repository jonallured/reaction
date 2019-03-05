import { Box, Flex } from "@artsy/palette"
import { SearchBarState } from "Components/Search/state"
import React from "react"
import { Subscribe } from "unstated"
import { Media } from "Utils/Responsive"
import { ArtistSearchPreviewQueryRenderer as ArtistSearchPreview } from "./Grids/ArtistSearch"
import { MerchandisableArtworksPreviewQueryRenderer as MerchandisableArtworksPreview } from "./Grids/MerchandisableArtworks"

export interface SearchPreviewProps {
  entityID: string
  entityType: string
  searchState: SearchBarState
}

const previewComponents = {
  Artist: ArtistSearchPreview,
  default: MerchandisableArtworksPreview,
}

class SearchPreview extends React.Component<SearchPreviewProps> {
  componentWillUnmount() {
    this.props.searchState.clearPreviewItems()
  }

  render() {
    const { entityType, ...rest } = this.props
    const Preview = previewComponents[entityType] || previewComponents.default
    const handleMouseOver = this.props.searchState.enterPreviewWithoutSelection
    const handleMouseOut = this.props.searchState.leavePreviewIfNoSelection

    return (
      <Media greaterThan="xs">
        <Flex
          alignItems="center"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          onMouseOut={handleMouseOut}
          onMouseOver={handleMouseOver}
        >
          <Preview {...rest} />
        </Flex>
      </Media>
    )
  }
}

export class SearchPreviewWrapper extends React.Component<{
  entityID: string
  entityType: string
}> {
  render() {
    return (
      <Subscribe to={[SearchBarState]}>
        {(searchState: SearchBarState) => {
          return <SearchPreview {...this.props} searchState={searchState} />
        }}
      </Subscribe>
    )
  }
}

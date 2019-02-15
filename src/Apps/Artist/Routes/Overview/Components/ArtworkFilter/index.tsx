import { FilterIcon, Toggle } from "@artsy/palette"
import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { ContextConsumer } from "Artsy/SystemContext"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Subscribe } from "unstated"
import { Media } from "Utils/Responsive"
import { ArtworkFilterRefetchContainer as ArtworkFilter } from "./ArtworkFilterRefetch"
import { MobileActionSheet } from "./MobileActionSheet"
import { PriceRangeFilter } from "./PriceRangeFilter"

import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Mediator } from "Artsy/SystemContext"

import {
  Box,
  Button,
  Checkbox,
  color,
  Flex,
  Message,
  Radio,
  Sans,
  Separator,
  SmallSelect,
  Spacer,
} from "@artsy/palette"

const { ENABLE_MAKE_OFFER } = sd

interface Props {
  artist: ArtworkFilter_artist
  hideTopBorder?: boolean
  filterState?: FilterState
  user?: User
  mediator?: Mediator
}

@track()
class Filter extends Component<Props> {
  static defaultProps = {
    hideTopBorder: false,
  }

  get existy() {
    const { artist } = this.props

    return {
      hasForSaleArtworks: artist.counts.for_sale_artworks > 0,
      hasBuyNowArtworks: artist.counts.ecommerce_artworks > 0,
      hasMakeOfferArtworks: artist.counts.has_make_offer_artworks,
      hasAuctionArtworks: artist.counts.auction_artworks > 0,
      hasArtworks: artist.counts.artworks > 0,
    }
  }

  get showZeroState() {
    return !this.existy.hasArtworks
  }

  renderFilters({ user, filterState, mediator, hideTopBorder }) {
    const { counts } = this.props.artist
    const { aggregations } = this.props.artist.filtered_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")
    const galleryAggregation = aggregations.find(agg => agg.slice === "GALLERY")

    const institutionAggregation = aggregations.find(
      agg => agg.slice === "INSTITUTION"
    )

    const periodAggregation = aggregations.find(
      agg => agg.slice === "MAJOR_PERIOD"
    )

    return (
      <>
        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          {!hideTopBorder && <Separator mb={1} />}
          {this.renderWaysToBuy(filterState, mediator, counts)}
        </Flex>

        <Toggle label="Medium" expanded={!this.showZeroState}>
          {this.renderCategory({
            filterState,
            category: "medium",
            counts: mediumAggregation.counts,
            mediator,
          })}
        </Toggle>
        <Toggle
          label="Price"
          expanded={filterState.state.price_range !== "*-*"}
        >
          <Flex flexDirection="column" alignItems="left" my={1}>
            <PriceRangeFilter filters={filterState} />
          </Flex>
        </Toggle>
        <Toggle
          expanded={filterState.state.partner_id && !this.showZeroState}
          label="Gallery"
        >
          {this.renderCategory({
            filterState,
            category: "partner_id",
            counts: galleryAggregation.counts,
            mediator,
          })}
        </Toggle>

        <Toggle
          expanded={filterState.state.partner_id && !this.showZeroState}
          label="Institution"
        >
          {this.renderCategory({
            filterState,
            category: "partner_id",
            counts: institutionAggregation.counts,
            mediator,
          })}
        </Toggle>
        <Toggle
          expanded={
            filterState.state.major_periods.length > 0 && !this.showZeroState
          }
          label="Time period"
        >
          {this.renderCategory({
            filterState,
            category: "major_periods",
            counts: periodAggregation.counts,
            mediator,
          })}
        </Toggle>
      </>
    )
  }

  renderCategory({ filterState, category, counts, mediator }) {
    const currentFilter =
      category === "major_periods"
        ? filterState.state.major_periods[0]
        : filterState.state[category]

    return (
      <Flex flexDirection="column" alignItems="left" mb={1}>
        {counts.map((count, index) => {
          return (
            <Radio
              my={0.3}
              selected={currentFilter === count.id}
              value={count.id}
              onSelect={this.omghaha(category, count)}
              key={index}
              label={count.name}
            />
          )
        })}
      </Flex>
    )
  }

  @track((_props, _state, [_selected, _category, count]) => {
    return { changed_medium: count.id }
  })
  handleSomething(selected, category, count) {
    if (selected) {
      return this.props.filterState.setFilter(category, count.id, this.props.mediator)
    } else {
      return this.props.filterState.unsetFilter(category, this.props.mediator)
    }
  }

  omghaha = (category, count) => {
    return ({selected}) => {
      this.handleSomething(selected, category, count)
    }
  }

  // handleCategorySelect({category, count}) {
  //   return ({selected}) => {
  //     this.props.tracking.trackEvent({
  //       changed_medium: count.id
  //     })
  //     if (selected) {
  //       return this.props.filterState.setFilter(category, count.id, this.props.mediator)
  //     } else {
  //       return this.props.filterState.unsetFilter(category, this.props.mediator)
  //     }
  //   }
  // }

  renderWaysToBuy(filterState, mediator, counts) {
    const ways = [
      {
        hasWorks: this.existy.hasBuyNowArtworks,
        name: "Buy now",
        state: "acquireable",
      },
      {
        hasWorks: this.existy.hasMakeOfferArtworks,
        name: "Make offer",
        state: "offerable",
      },
      {
        hasWorks: this.existy.hasAuctionArtworks,
        name: "Bid",
        state: "at_auction",
      },
      {
        hasWorks: this.existy.hasForSaleArtworks,
        name: "Inquire",
        state: "inquireable_only",
      },
    ]

    if (!ENABLE_MAKE_OFFER) {
      ways.splice(1, 1)
    }

    const wayCheckboxes = ways.map((way, index) => {
      const props = {
        disabled: !way.hasWorks || this.showZeroState,
        key: index,
        onSelect: value => filterState.setFilter(way.state, value, mediator),
        selected: filterState.state[way.state],
      }

      return <Checkbox {...props}>{way.name}</Checkbox>
    })

    return (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" mt={0.3} mb={1}>
          Ways to Buy
        </Sans>
        {wayCheckboxes}
      </React.Fragment>
    )
  }

  renderZeroState({ user, mediator }) {
    const {
      artist,
      artist: { id, name, is_followed },
    } = this.props

    return (
      <Message>
        There aren’t any works available by the artist at this time.{" "}
        {!is_followed && (
          <>
            <FollowArtistButton
              artist={artist}
              useDeprecatedButtonStyle={false}
              user={user}
              onOpenAuthModal={() => {
                mediator.trigger("open:auth", {
                  mode: "signup",
                  copy: `Sign up to follow ${name}`,
                  signupIntent: "follow artist",
                  afterSignUpAction: {
                    kind: "artist",
                    action: "follow",
                    objectId: id,
                  },
                })
              }}
              render={() => <a>Follow {name}</a>}
            />{" "}
            to receive notifications when new works are added.
          </>
        )}
      </Message>
    )
  }

  renderSelect({ filterState, mediator }) {
    return (
      <Flex justifyContent={["space-between", "flex-end"]} alignItems="center">
        <SmallSelect
          mt="-8px"
          options={[
            {
              value: "-decayed_merch",
              text: "Default",
            },
            {
              value: "-partner_updated_at",
              text: "Recently updated",
            },
            {
              value: "-published_at",
              text: "Recently added",
            },
            {
              value: "-year",
              text: "Artwork year (desc.)",
            },
            {
              value: "year",
              text: "Artwork year (asc.)",
            },
          ]}
          selected={filterState.state.sort}
          onSelect={sort => {
            return filterState.setSort(sort, mediator)
          }}
        />

        <Media at="xs">
          <Button
            size="small"
            mt={-1}
            onClick={() => filterState.showActionSheet(true)}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <FilterIcon fill={color("white100")} />
              <Spacer mr={0.5} />
              Filter
            </Flex>
          </Button>
        </Media>
      </Flex>
    )
  }

  render() {
    // todo: remove this line by accessing these things from props directly
    const { filterState, user, mediator } = this.props
    const hideTopBorder = this.props.hideTopBorder

    const Filters = () =>
      this.renderFilters({
        user,
        filterState,
        mediator,
        hideTopBorder,
      })

      return (
        <Flex flexDirection={["column", "row"]}>
          <Box width={["100%", "25%"]} mr={2}>
            <Media at="xs">
              {filterState.state.showActionSheet && (
                <MobileActionSheet
                  onClose={() => filterState.showActionSheet(false)}
                >
                  <Filters />
                </MobileActionSheet>
              )}
            </Media>
            <Media greaterThan="xs">
              <Filters />
            </Media>
          </Box>
          {/* Main Artwork Grid */}
          <Box width={["100%", "75%"]}>
            <Media greaterThan="xs">
              {!hideTopBorder && <Separator mb={2} mt={-1} />}
            </Media>

            {this.renderSelect({
              filterState,
              mediator,
            })}

            <Spacer mb={2} />

            {this.showZeroState ? (
              this.renderZeroState({
                user,
                mediator,
              })
            ) : (
              <ArtworkFilter
                artist={this.props.artist}
                artistID={this.props.artist.id}
                columnCount={[2, 2, 2, 3]}
                filters={filterState.state}
              />
            )}
          </Box>
        </Flex>
      )
  }
}

export const ArtworkFilterFragmentContainer = createFragmentContainer(
  (props: Props) => {
    return (
      <ContextConsumer>
        {({ user, mediator }) => (
          <Subscribe to={[FilterState]}>
            {(filters: FilterState) => {
              return <Filter user={user} mediator={mediator} filterState={filters} {...props} />
            }}
          </Subscribe>
        )}
      </ContextConsumer>
    )
  },
  graphql`
    fragment ArtworkFilter_artist on Artist
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        offerable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]
        }
        sort: { type: "String", defaultValue: "-decayed_merch" }
        price_range: { type: "String", defaultValue: "*-*" }
      ) {
      id
      name
      is_followed
      counts {
        for_sale_artworks
        ecommerce_artworks
        auction_artworks
        artworks
        has_make_offer_artworks
      }
      filtered_artworks(aggregations: $aggregations, size: 0) {
        aggregations {
          slice
          counts {
            name
            id
          }
        }
      }

      ...ArtworkFilterRefetch_artist
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
          offerable: $offerable
          acquireable: $acquireable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
          price_range: $price_range
        )

      ...FollowArtistButton_artist
    }
  `
)

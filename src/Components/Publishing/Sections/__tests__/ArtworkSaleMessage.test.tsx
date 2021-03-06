import React from "react"
import { renderRelayTree } from "DevTools"
import {
  ArtworkSaleMessage,
  ArtworkSaleMessageContainer,
  ArtworkSaleMessageQueryString,
} from "Components/Publishing/Sections/ArtworkSaleMessage"
import { ArtworkSaleMessageQueryResponse } from "__generated__/ArtworkSaleMessageQuery.graphql"
import { mount } from "enzyme"
import { QueryRenderer } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSaleMessage", () => {
  const getWrapper = async (response: ArtworkSaleMessageQueryResponse) => {
    return await renderRelayTree({
      Component: ({ artwork }) => {
        return <ArtworkSaleMessage artwork={artwork} />
      },
      query: ArtworkSaleMessageQueryString,
      variables: {
        artworkSlug: "yayoi-kusama-pumpkin-2",
      },
      mockData: response,
    })
  }

  it("displays the sale message for works not at auction", async () => {
    const wrapper = await getWrapper(ArtworkSaleMessageForSaleFixture)
    expect(wrapper.text()).toBe("$20,000")
  })

  it("displays bidding information for works at auction", async () => {
    const wrapper = await getWrapper(ArtworkSaleMessageAtAuctionFixture)
    expect(wrapper.text()).toBe("$6,000 (2 bids)")
  })

  it("displays nothing if the work is not for sale", async () => {
    const wrapper = await getWrapper(ArtworkSaleMessageNotForSale)
    expect(wrapper.text().length).toBe(0)
  })
})

describe("ArtworkSaleMessageContainer", () => {
  it("fetches the necessary data to display an artwork's sale message", () => {
    const wrapper = mount(
      <ArtworkSaleMessageContainer artworkSlug="some-slug" />
    )
    expect(wrapper.find(QueryRenderer).exists()).toBe(true)
  })
})

const ArtworkSaleMessageForSaleFixture: ArtworkSaleMessageQueryResponse = {
  artwork: {
    saleMessage: "$20,000",
    sale: null,
    saleArtwork: null,
  },
}

const ArtworkSaleMessageAtAuctionFixture: ArtworkSaleMessageQueryResponse = {
  artwork: {
    saleMessage: "Contact For Price",
    sale: {
      isAuction: true,
      isClosed: false,
    },
    saleArtwork: {
      counts: {
        bidderPositions: 2,
      },
      highestBid: {
        display: "$6,000",
      },
      openingBid: {
        display: "$4,000",
      },
    },
  },
}

const ArtworkSaleMessageNotForSale: ArtworkSaleMessageQueryResponse = {
  artwork: {
    saleMessage: null,
    sale: null,
    saleArtwork: null,
  },
}

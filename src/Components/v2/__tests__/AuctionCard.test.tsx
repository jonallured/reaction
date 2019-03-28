import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import {
  AuctionCard,
  LargeAuctionCard,
  SmallAuctionCard,
  upcomingLabel,
} from "../AuctionCard"

describe("AuctionCard", () => {
  const props = {
    src: "https://picsum.photos/200/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
    href: "#",
  }

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint="xs">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(small.find(SmallAuctionCard).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(large.find(LargeAuctionCard).length).toEqual(1)
  })
})

describe("upcomingLabel", () => {
  it("returns the opens message when auction is in preview", () => {
    const startAt = "2019-01-01"
    const endAt = null
    const liveStartAt = null
    const isClosed = null
    const isLiveOpen = null
    const isPreview = true

    const label = upcomingLabel(
      startAt,
      endAt,
      liveStartAt,
      isClosed,
      isLiveOpen,
      isPreview
    )
    expect(label).toEqual("Auction opens Jan 1, 1:00 AM EST")
  })

  it("returns the closed message when auction is closed", () => {
    const startAt = null
    const endAt = null
    const liveStartAt = null
    const isClosed = true
    const isLiveOpen = null
    const isPreview = false

    const label = upcomingLabel(
      startAt,
      endAt,
      liveStartAt,
      isClosed,
      isLiveOpen,
      isPreview
    )
    expect(label).toEqual("Auction closed")
  })

  it("returns the opens for live bidding message when auction is online but not yet open", () => {
    const startAt = null
    const endAt = null
    const liveStartAt = "2019-01-01"
    const isClosed = false
    const isLiveOpen = false
    const isPreview = false

    const label = upcomingLabel(
      startAt,
      endAt,
      liveStartAt,
      isClosed,
      isLiveOpen,
      isPreview
    )
    expect(label).toEqual("Auction opens for live bidding Jan 1, 1:00 AM EST")
  })

  it("returns the open for live bidding message when auction is online and open", () => {
    const startAt = null
    const endAt = null
    const liveStartAt = "2019-01-01"
    const isClosed = false
    const isLiveOpen = true
    const isPreview = false

    const label = upcomingLabel(
      startAt,
      endAt,
      liveStartAt,
      isClosed,
      isLiveOpen,
      isPreview
    )
    expect(label).toEqual("Auction open for live bidding")
  })

  it("returns the closes message by default", () => {
    const startAt = null
    const endAt = "2019-01-01"
    const liveStartAt = null
    const isClosed = false
    const isLiveOpen = null
    const isPreview = false

    const label = upcomingLabel(
      startAt,
      endAt,
      liveStartAt,
      isClosed,
      isLiveOpen,
      isPreview
    )
    expect(label).toEqual("Auction closes Jan 1, 1:00 AM EST")
  })
})

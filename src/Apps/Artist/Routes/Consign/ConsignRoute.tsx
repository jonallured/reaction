import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export const ConsignRoute: React.FC = props => {
  console.log("ConsignRoute", props)

  return (
    <div>OMG ConsignRoute</div>
  )
}

export const ConsignRouteFragmentContainer = createFragmentContainer(ConsignRoute, {
  artist: graphql`
    fragment ConsignRoute_artist on Artist {
      id
    }
  `
})

// this allows bundle splitting?
export default ConsignRouteFragmentContainer

import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import styled from "styled-components"

import { SearchBarRefetchQuery } from "__generated__/SearchBarRefetchQuery.graphql"

import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"

import { Input } from "./Input"
import { SearchSuggestions } from "./SearchSuggestions"

const Wrapper = styled.div``

interface SearchBarProps {
  relay: RelayRefetchProp
  searchResults: string[]
  search
}

export class SearchBar extends React.Component<SearchBarProps> {
  state = {
    inputHasFocus: false,
    query: ""
  }

  handleFocus = () => {
    this.setState({inputHasFocus: true})
  }

  handleBlur = () => {
    this.setState({inputHasFocus: false})
  }

  handleChange = (e) => {
    const query = e.target.value
    this.setState({query})
  }

  render() {
    const showSuggestions = this.state.inputHasFocus

    return (
      <Wrapper>
        <Input onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
        {showSuggestions && <SearchSuggestions query={this.state.query} />}
      </Wrapper>
    )
  }
}

export const SearchBarRefetchContainer = createRefetchContainer(
  // this is a component that accepts props and there's a convention for that
  SearchBar,
  {},
  graphql`
    query SearchBarRefetchQuery(
      $query: String!
    ) {
      omglol:search(query: $query, first: 10, entities: [ARTIST, ARTWORK], mode: AUTOSUGGEST) {
        edges {
          node {
            __typename
            displayLabel
            href
            imageUrl
            ... on SearchableItem {
              searchableType
            }
          }
        }
      }
    }
  `
)

export const SearchBarQueryRenderer = ({query}: {query: string}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<SearchBarRefetchQuery>
            environment={relayEnvironment}
            variables={{ query }}
            query={graphql`
              query SearchBarQuery($query: String!) {
                search(query: $query) {
                  edges {
                    node {
                      __typename
                      displayLabel
                    }
                  }
                }
              }
            `}
            render={renderWithLoadProgress(SearchBarRefetchContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}

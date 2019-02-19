import { Box, Flex } from "@artsy/palette"
import { SearchBar_viewer } from "__generated__/SearchBar_viewer.graphql"
import { SearchBarSuggestQuery } from "__generated__/SearchBarSuggestQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import Input from "Components/Input"
import { SearchPreview } from "Components/Search/Previews"
import { SuggestionItem } from "Components/Search/Suggestions/SuggestionItem"
import { throttle } from "lodash"
import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"
import styled from "styled-components"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

const logger = createLogger("Components/Search/SearchBar")

const AutosuggestContainer = styled(Box)`
  div[role="combobox"] {
    div[role="listbox"] {
      ul {
        list-style-type: none;
        padding: 0;
      }
    }
  }
`

export interface Props extends ContextProps {
  relay: RelayRefetchProp
  viewer: SearchBar_viewer
}

const PLACEHOLDER = "Search by artist, gallery, style, theme, tag, etc."

interface State {
  /* Holds current input */
  input: string
  /* For preview generation of selected items */
  entityID: string
  entityType: string
  focused: boolean
}

const AutosuggestWrapper = styled(Box)`
  background: red;
  position: relative;
`

const SuggestionListWrapper = styled(Box)`
  background-color: green;
  position: absolute;
  left: 0;
  right: 0;
`

const PreviewListWrapper = styled(Box)`
  background-color: blue;
  position: absolute;
  left: 100%;
`

const SuggestionContainer = ({ children, containerProps, focused, query, preview }) => {
  let firstItem = null
  if (query) {
    firstItem = <Box>Search "{query}"</Box>
  } else if (focused) {
    firstItem = <Box>{PLACEHOLDER}</Box>
  }

  const showFirstItem = firstItem !== null

  return (
    <AutosuggestWrapper {...containerProps}>
      <SuggestionListWrapper>
        <Flex flexDirection="column">
          {showFirstItem && (
            <Box mt={3} pl={3}>
              {firstItem}
            </Box>
          )}
          {children}
        </Flex>
      </SuggestionListWrapper>
      <PreviewListWrapper>{preview}</PreviewListWrapper>
    </AutosuggestWrapper>
  )
}

export class SearchBar extends Component<Props, State> {
  public input: HTMLInputElement

  state = {
    input: "",
    entityID: null,
    entityType: null,
    focused: false,
  }

  storeInputReference = autosuggest => {
    if (autosuggest != null) {
      this.input = autosuggest.input
    }
  }

  // Throttled method to toggle previews.
  throttledOnSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return null
    const {
      node: { searchableType: entityType, id: entityID },
    } = suggestion
    this.setState({ entityType, entityID })
  }

  // Throttled method to perform refetch for new suggest query.
  throttledFetch = ({ value: term }) => {
    this.props.relay.refetch(
      {
        term,
        hasTerm: true,
      },
      null,
      error => {
        if (error) logger.error(error)
      }
    )
  }

  componentDidMount() {
    this.throttledFetch = throttle(this.throttledFetch, 500, {
      leading: true,
    })
    this.throttledOnSuggestionHighlighted = throttle(
      this.throttledOnSuggestionHighlighted,
      500,
      { leading: true }
    )
  }

  searchTextChanged = (_e, { newValue: input }) => {
    this.setState({ input })
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onBlur = () => {
    this.setState({ focused: false })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ input: "", entityID: null, entityType: null })
  }

  // Navigate to selected search item.
  onSuggestionSelected = (
    _e,
    {
      suggestion: {
        node: { href },
      },
    }
  ) => {
    window.location.assign(href)
  }

  renderPreview() {
    const { entityID, entityType } = this.state
    if (entityID && entityType) {
      return <SearchPreview entityID={entityID} entityType={entityType} />
    }
  }

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const { focused } = this.state

    const props = {
      children,
      containerProps,
      focused,
      query,
      preview: this.renderPreview()
    }

    return <SuggestionContainer {...props} />
  }

  renderSuggestion = (
    { node: { displayLabel, searchableType } },
    { query, isHighlighted }
  ) => {
    return (
      <Box bg={isHighlighted ? "#ddd" : "#fff"}>
        <SuggestionItem
          query={query}
          display={displayLabel}
          label={searchableType}
        />
      </Box>
    )
  }

  renderInputComponent = inputProps => (
    <Box>
      <Input style={{ width: "100%" }} {...inputProps} />
    </Box>
  )

  renderAutosuggestComponent({ xs }) {
    const { input } = this.state
    const { viewer } = this.props
    const edges = get(viewer, v => v.search.edges, [])

    const inputProps = {
      onChange: this.searchTextChanged,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      placeholder: xs ? "" : PLACEHOLDER,
      value: input,
    }

    return (
      <AutosuggestContainer>
        <Autosuggest
          suggestions={edges}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionHighlighted={this.throttledOnSuggestionHighlighted}
          onSuggestionsFetchRequested={this.throttledFetch}
          getSuggestionValue={({ node: { displayLabel } }) => displayLabel}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          renderInputComponent={this.renderInputComponent}
          ref={this.storeInputReference}
        />
      </AutosuggestContainer>
    )
  }

  render() {
    return (
      <>
        <Media at="xs">{this.renderAutosuggestComponent({ xs: true })}</Media>
        <Media greaterThan="xs">
          {this.renderAutosuggestComponent({ xs: false })}
        </Media>
      </>
    )
  }
}

export const SearchBarRefetchContainer = createRefetchContainer(
  SearchBar,
  {
    viewer: graphql`
      fragment SearchBar_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
        ) {
        search(query: $term, mode: AUTOSUGGEST, first: 10)
          @include(if: $hasTerm) {
          edges {
            node {
              displayLabel
              href
              ... on SearchableItem {
                searchableType
                id
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchBarRefetchQuery($term: String!, $hasTerm: Boolean!) {
      viewer {
        ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
      }
    }
  `
)

export const SearchBarQueryRenderer: React.SFC = () => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<SearchBarSuggestQuery>
            environment={relayEnvironment}
            query={graphql`
              query SearchBarSuggestQuery($term: String!, $hasTerm: Boolean!) {
                viewer {
                  ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
                }
              }
            `}
            variables={{
              term: "",
              hasTerm: false,
            }}
            render={({ props }) => {
              if (props) {
                return <SearchBarRefetchContainer viewer={props.viewer} />
              } else {
                return null
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}

import React from "react"

export const SearchSuggestions = ({query}) => {
  const blankSlate = <h1>Search Artsy</h1>
  const searchSuggestion = <h1>Search "{query}"</h1>
  return (
    query ? searchSuggestion : blankSlate
  )
}

import React from "react"
import styled from "styled-components"

import { Input } from "./Input"
import { SearchSuggestions } from "./SearchSuggestions"

const Wrapper = styled.div``

export class SearchBar extends React.Component {
  state = {
    inputHasFocus: false
  }

  handleFocus = () => {
    this.setState({inputHasFocus: true})
  }

  handleBlur = () => {
    this.setState({inputHasFocus: false})
  }

  render() {
    const showSuggestions = this.state.inputHasFocus

    return (
      <Wrapper>
        <Input onFocus={this.handleFocus} onBlur={this.handleBlur} />
        {showSuggestions && <SearchSuggestions />}
      </Wrapper>
    )
  }
}

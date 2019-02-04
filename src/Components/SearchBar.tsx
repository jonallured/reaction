import React from "react"
import styled from "styled-components"

import { Input } from "./Input"
import { SearchSuggestions } from "./SearchSuggestions"

const Wrapper = styled.div``

export class SearchBar extends React.Component {
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

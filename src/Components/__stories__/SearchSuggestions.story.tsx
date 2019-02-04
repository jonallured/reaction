import { storiesOf } from "@storybook/react"
import React from "react"

import { SearchSuggestions } from "../SearchSuggestions"

storiesOf("Components/SearchSuggestions", module)
  .add("SearchSuggestions", () => (
    <SearchSuggestions />
  ))

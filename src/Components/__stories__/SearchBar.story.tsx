import { storiesOf } from "@storybook/react"
import React from "react"

import { SearchBar } from "../SearchBar"

storiesOf("Components/SearchBar", module)
  .add("SearchBar", () => (
    <SearchBar />
  ))

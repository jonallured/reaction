import { Box, Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { ContextProvider } from "Artsy/SystemContext"
import { SearchPreview } from "Components/Search/Previews"
import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"
import { SearchSuggestionsQueryRenderer as SearchSuggestions } from "Components/Search/Suggestions"

storiesOf("Components/Search/SearchBar", module).add("Input", () => (
  <>
    <Flex>
      <Box>Artsy Logo</Box>
      <Box width="400px">
        <ContextProvider>
          <SearchBar />
        </ContextProvider>
      </Box>
      <Box>Nav Item</Box>
      <Box>Nav Item</Box>
      <Box>Nav Item</Box>
    </Flex>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non nibh quis ex imperdiet tristique eu non nisl. Nullam dignissim ex vel malesuada tristique. Nullam leo urna, eleifend eu porttitor ut, fringilla non nibh. Etiam id suscipit felis, vitae lacinia orci. Sed sagittis scelerisque imperdiet. Sed tempus nulla in nunc malesuada, feugiat hendrerit dui ornare. Sed pharetra erat orci, ac molestie turpis tincidunt non. Ut sit amet lorem at lectus molestie hendrerit. Maecenas a risus vel nibh lobortis bibendum. Fusce facilisis mauris a ex suscipit, in pretium leo aliquam. Donec vitae malesuada metus. Pellentesque odio lacus, imperdiet vel tincidunt dignissim, porttitor vel dui. Proin lacus mauris, tincidunt ac risus ac, consectetur tincidunt lorem.</p>
    <p>Nulla facilisi. Maecenas bibendum libero et massa euismod suscipit ut ac justo. Vestibulum et ex vel neque ultrices porttitor ultricies id lacus. Integer eget nisl consequat, auctor urna vitae, blandit ante. Sed tincidunt pulvinar enim, non elementum nunc vehicula in. Fusce fermentum mattis nunc pulvinar venenatis. Quisque imperdiet ex ac tellus pellentesque, sed faucibus elit vestibulum. Curabitur et nisl ac massa convallis blandit. Maecenas vitae feugiat ex. Morbi at arcu at arcu congue varius eget in nisi. Aliquam tempor varius dui ut luctus.</p>
    <p>Donec at lacus finibus tortor facilisis vestibulum vitae quis enim. Proin blandit interdum aliquam. Ut tempus orci ut magna dictum, vitae vulputate sem varius. Praesent at porttitor leo. Aliquam efficitur tincidunt tincidunt. In auctor purus porta suscipit mattis. Aliquam ante tellus, cursus quis augue at, commodo pulvinar ipsum. Aliquam erat volutpat. Praesent nec laoreet tortor, ut congue metus. Nam vitae velit nec erat egestas imperdiet. Vestibulum quam dolor, tempus a neque id, fermentum ultricies tortor.</p>
    <p>Maecenas aliquam massa non porttitor venenatis. Mauris a ante dictum lorem eleifend pharetra. Integer maximus non nisi sit amet aliquet. Sed consequat lacinia blandit. Aliquam ut maximus diam. Vivamus id eleifend orci, at feugiat libero. Aenean volutpat, ex vel semper tincidunt, magna est lobortis neque, quis cursus est velit sit amet diam. Curabitur in elementum nisi. Etiam quis dui magna. Integer ornare elementum nunc sit amet rutrum. Maecenas nisi mauris, gravida sit amet ipsum nec, rutrum laoreet neque. Praesent nec pellentesque tortor. Cras pharetra ante ullamcorper aliquet vehicula. Donec gravida in ante rutrum pellentesque.</p>
    <p>Mauris viverra finibus neque. Etiam ac est massa. Pellentesque blandit id ligula quis consectetur. Nunc posuere tempor velit, non semper turpis cursus id. Donec sed vulputate mi, eu gravida nisi. Aenean sit amet malesuada quam. Nulla et est laoreet, malesuada justo in, lacinia tellus. In mattis euismod mattis.</p>
  </>
))

storiesOf("Components/Search/Suggestions", module).add("Term: Andy", () => (
  <ContextProvider>
    <SearchSuggestions term="andy" />
  </ContextProvider>
))

storiesOf("Components/Search/Previews/Artist", module)
  .add("An artist with collections", () => (
    <ContextProvider>
      <SearchPreview entityID="kaws" entityType="Artist" />
    </ContextProvider>
  ))
  .add("An artist without collections", () => (
    <ContextProvider>
      <SearchPreview entityID="douglas-gordon" entityType="Artist" />
    </ContextProvider>
  ))

storiesOf("Components/Search/Previews/MerchandisableArtworks", module).add(
  "No query",
  () => (
    <ContextProvider>
      <SearchPreview entityID="" entityType="" />
    </ContextProvider>
  )
)

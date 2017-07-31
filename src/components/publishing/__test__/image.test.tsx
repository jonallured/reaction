import * as React from "react"
import * as renderer from "react-test-renderer"

import Image from "../sections/image"
import { Images } from "./fixtures"

it("renders properly", () => {
  const image = renderer.create(<Image image={Images[1]} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a long caption properly", () => {
  const image = renderer.create(<Image image={Images[1]} />).toJSON()
  expect(image).toMatchSnapshot()
})

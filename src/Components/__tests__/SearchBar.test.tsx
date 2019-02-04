// import { mount } from "enzyme"
// import React from "react"

// // think about snapshot tests...
// // import "jest-styled-components"
// // import renderer from "react-test-renderer"

// import { SearchBar } from "../SearchBar"
// import { SearchSuggestions } from "../SearchSuggestions"

// describe("SearchBar", () => {
//   it("renders a SearchBar", () => {
//     const wrapper = mount(<SearchBar />)
//     expect(wrapper.find('input').length).toEqual(1)
//   })

//   it("shows a blank slate suggestion box when given focus", () => {
//     const wrapper = mount(<SearchBar />)
//     expect(wrapper.find(SearchSuggestions).length).toEqual(0)
//     wrapper.find('input').simulate('focus')
//     expect(wrapper.find(SearchSuggestions).length).toEqual(1)
//   })

//   it("hides the suggestions when blurred", () => {
//     const wrapper = mount(<SearchBar />)
//     wrapper.find('input').simulate('focus')
//     expect(wrapper.find(SearchSuggestions).length).toEqual(1)
//     wrapper.find('input').simulate('blur')
//     expect(wrapper.find(SearchSuggestions).length).toEqual(0)
//   })

//   it("shows a suggestion to search for your query", () => {
//     const wrapper = mount(<SearchBar />)
//     wrapper.find('input').simulate('focus')
//     wrapper.find('input').simulate('change', { target: { value: 'Warh' } })
//     const suggestions = wrapper.find(SearchSuggestions)
//     expect(suggestions.text()).toEqual("Search \"Warh\"")
//   })

//   // it("shows suggestions of multiple object types", () => {
//   //   const wrapper = mount(<SearchBar />)
//   //   wrapper.find('input').simulate('focus')
//   //   wrapper.find('input').simulate('change', { target: { value: 'Warh' } })
//   //   expect(network).to receive(:search).and_return results
//   //   const suggestions = wrapper.find(SearchSuggestions)
//   //   expect(suggestions.text()).toEqual("Search \"Warh\"")
//   // })
// })

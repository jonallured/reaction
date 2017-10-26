import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"

export const Sidebar: React.SFC<React.HTMLProps<HTMLDivElement>> = props => {
  return <SidebarContainer>{props.children}</SidebarContainer>
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: -63px 0 0 60px;
  min-width: 300px;
  ${pMedia.xl`
    margin-left: 40px;
  `}
  ${pMedia.lg`
    display: none;
  `}
`

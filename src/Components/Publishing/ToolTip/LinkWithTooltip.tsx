import React, { Component } from "react"
import { ToolTip } from "./ToolTip"
import { OverlayTrigger } from "../../OverlayTrigger"
import PropTypes from "prop-types"
import styled from "styled-components"

interface Props {
  url: string
  node: any
}

interface State {
  show: boolean
}

export class LinkWithTooltip extends Component<Props, State> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
  }

  state = {
    show: false,
  }

  urlToEntityType(): { entityType: string; slug: string } {
    const urlComponents = new URL(this.props.url).pathname.split("/")
    urlComponents.shift()

    return {
      entityType: urlComponents[0],
      slug: urlComponents[1],
    }
  }

  entityTypeToEntity() {
    const { entityType, slug } = this.urlToEntityType()
    const data = this.context.tooltipsData
    const collectionKey = entityType + "s"

    if (!data || !data[collectionKey]) return null

    return {
      entityType,
      entity: data[collectionKey][slug],
    }
  }

  render() {
    const toolTipData = this.entityTypeToEntity()

    const toolTip = toolTipData ? (
      <div>
        <ToolTip entity={toolTipData.entity} model={toolTipData.entityType} />
      </div>
    ) : (
      <div />
    )

    const { show } = this.state
    return (
      <OverlayTrigger show={show} placement="top" overlay={toolTip}>
        <Link
          target="_blank"
          onMouseEnter={() =>
            new Promise((resolve, reject) => {
              this.setState({ show: true }, resolve)
            })
          }
          onMouseLeave={() =>
            new Promise((resolve, reject) =>
              this.setState({ show: false }, resolve)
            )
          }
        >
          {this.props.children}
        </Link>
      </OverlayTrigger>
    )
  }
}

export const Link = styled.a`
  background-image: none !important;
  border-bottom: 1.5px dashed rgba(51, 51, 51, 0.63);
  display: inline-block;
  line-height: 23px;

  &:hover {
    border-bottom-color: #999;
  }
`

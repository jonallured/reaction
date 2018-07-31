import { Sans } from "@artsy/palette"
import * as Schema from "Analytics/Schema"
import { RelatedArticlePanelData } from "Components/Publishing/Typings"
import { once } from "lodash"
import React from "react"
import track from "react-tracking"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { RelatedArticlesPanelLink } from "./RelatedArticlesPanelLink"

interface RelatedArticlesPanelProps extends React.HTMLProps<HTMLDivElement> {
  label?: string
  articles: RelatedArticlePanelData[]
}

@track()
export class RelatedArticlesPanel extends React.Component<
  RelatedArticlesPanelProps
> {
  static defaultProps = {
    label: "Related Stories",
  }

  @track(() => ({
    action: Schema.ActionType.Impression,
    // TODO: reevalutate double naming
    context_module: Schema.Subject.RelatedArticles,
    subject: Schema.Subject.RelatedArticles,
  }))
  trackRelatedImpression() {
    // noop
  }

  render() {
    const { articles, label } = this.props

    return (
      <RelatedArticlesContainer>
        <Label size="3t" weight="medium">
          {label}
        </Label>
        <Waypoint onEnter={once(this.trackRelatedImpression.bind(this))} />
        <Collection>
          {articles.map((article, i) => (
            <RelatedArticlesPanelLink
              article={article}
              key={`relatedArticles-${i}`}
            />
          ))}
        </Collection>
      </RelatedArticlesContainer>
    )
  }
}

const RelatedArticlesContainer = styled.div`
  max-width: 360px;
`

const Collection = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = Sans.extend`
  margin-bottom: 10px;
`

import * as React from "react";
import { Link } from "gatsby";
import { GatsbyLinkProps } from "gatsby-link";
import { Card, List, Label } from "semantic-ui-react";
import { MarkdownRemarkGroupConnection } from "../../graphql-types";
import { kebabCase } from "lodash";

interface TagsListProps extends React.HTMLProps<HTMLDivElement> {
  tags: MarkdownRemarkGroupConnection[];
  Link: React.ComponentClass<GatsbyLinkProps<any>>;
  tag?: string;
}

export default (props: TagsListProps) => {
  return (
        <>
          {
            props.tags.sort((tagA: any, tagB: any) => {
              if (tagA.totalCount > tagB.totalCount) { return -1; }
              if (tagA.totalCount < tagB.totalCount) { return 1; }
              return 0;
            }).map((tag) => {
            const isActive = tag.fieldValue === props.tag;
            const tagLink = isActive ? `/` : `/blog/tags/${kebabCase(tag.fieldValue)}/`;
            return (
              <Label key={tag.fieldValue} tag color={isActive ? "black" : null} >
                <Link to={tagLink} >{tag.fieldValue} ({tag.totalCount})</Link>
              </Label>
            );
          })}
        </>
  );
};

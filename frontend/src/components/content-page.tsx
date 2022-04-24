import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import TopMenu from "./top-menu";

export interface IContentPageProps {
  content: React.ReactNode
}
export interface IContentPageState { }

export default class ContentPage extends Component<IContentPageProps, IContentPageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <TopMenu />
      </StackItem>
      <StackItem>
        {this.props.content}
      </StackItem>
    </Stack>)
  }
}

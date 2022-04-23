import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import TopMenu from "./top-menu";

export interface INotFoundPageProps { }
export interface INotFoundPageState { }

export default class NotFoundPage extends Component<INotFoundPageProps, INotFoundPageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <TopMenu />
      </StackItem>
      <StackItem>
        <p>404 - not found</p>
      </StackItem>
    </Stack>)
  }
}

import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import BotList from "./bot-list";
import TopMenu from "./top-menu";

export interface IBotPageProps { }
export interface IBotPageState { }

export default class BotPage extends Component<IBotPageProps, IBotPageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <TopMenu />
      </StackItem>
      <StackItem>
        <BotList itemsPerPage={20} />
      </StackItem>
    </Stack>)
  }
}

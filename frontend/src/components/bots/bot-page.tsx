import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import TopMenu from "../top-menu";
import BotList from "./bot-list";

export interface IBotListPageProps { }
export interface IBotListPageState { }

export default class BotListPage extends Component<IBotListPageProps, IBotListPageState> {

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

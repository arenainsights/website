import { Link, Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import BotList from "./bot-list";

export interface IBotPageProps { }
export interface IBotPageState { }

export default class BotPage extends Component<IBotPageProps, IBotPageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <Link href="/bots">Bots</Link>
      </StackItem>
      <StackItem>
        <Link href="/games">Games</Link>
      </StackItem>
      <StackItem>
        <BotList itemsPerPage={20} />
      </StackItem>
    </Stack>)
  }
}

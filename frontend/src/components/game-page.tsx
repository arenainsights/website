import { Link, Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import GameList from "./game-list";

export interface IGamePageProps { }
export interface IGamePageState { }

export default class GamePage extends Component<IGamePageProps, IGamePageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <Link href="/bots">Bots</Link>
      </StackItem>
      <StackItem>
        <Link href="/games">Games</Link>
      </StackItem>
      <StackItem>
        <GameList itemsPerPage={20} />
      </StackItem>
    </Stack>)
  }
}

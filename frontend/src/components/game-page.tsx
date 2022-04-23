import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import GameList from "./game-list";
import TopMenu from "./top-menu";

export interface IGamePageProps { }
export interface IGamePageState { }

export default class GamePage extends Component<IGamePageProps, IGamePageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <TopMenu />
      </StackItem>
      <StackItem>
        <GameList itemsPerPage={20} />
      </StackItem>
    </Stack>)
  }
}

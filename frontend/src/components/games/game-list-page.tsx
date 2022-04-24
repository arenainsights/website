import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import TopMenu from "../top-menu";
import GameList from "./game-list";

export interface IGameListPageProps { }
export interface IGameListPageState { }

export default class GameListPage extends Component<IGameListPageProps, IGameListPageState> {

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

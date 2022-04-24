import { CheckboxVisibility, DetailsList, DetailsListLayoutMode, IColumn, Link } from "@fluentui/react";
import { Pagination } from "@fluentui/react-experiments";
import React, { Component } from "react";
import { IGameInfoExtended } from "../../../backend/src/controllers/games";
import { getValidGamesWithCode } from "../api/games";


export interface IGameListEntry {
  arena: string;
  created: string;
  bots: string;
  winner: string;
  code: string;
}

export interface IGameListProps {
  itemsPerPage: number;
}

export interface IGameListState {
  currentPage: number;
  columns: IColumn[];
  games: IGameListEntry[];
  error: string | undefined;
}

const getGameLinkFromCode = (code: string) => `screeps-arena://game/${code}`;

export const convertExtendedGameInfoToEntry = (game: IGameInfoExtended): IGameListEntry => {
  const botInfos: string[] = [];
  for (const bot of game.bots) {
    let username;
    for (const user of game.users) {
      if (user.userId === bot.userId) {
        username = `${user.username} ${(bot.version) ? "v" + bot.version : ""} `;
      }
    }
    if (!username) {
      username = "System";
    }
    botInfos.push(username);
  }
  let winnerInfo = "Draw";
  if (game.gameResultWinner !== 0.5) {
    winnerInfo = botInfos[game.gameResultWinner];
  }
  const entry: IGameListEntry = {
    arena: `${game.arena.advanced ? "Advanced" : "Basic"} ${game.arena.name}`,
    created: game.gameCreated,
    bots: botInfos.join(" vs "),
    winner: winnerInfo,
    code: game.gameCode ?? ""
  };
  return entry;
}

const getDefaultColumns = () => ([
  { key: 'arena', name: 'Arena', fieldName: 'arena', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'created', name: 'Created', fieldName: 'created', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'bots', name: 'Bots', fieldName: 'bots', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'winner', name: 'Winner', fieldName: 'winner', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'code', name: 'Code', fieldName: 'code', minWidth: 100, maxWidth: 200, isResizable: true },
]);

export default class GameList extends Component<IGameListProps, IGameListState> {

  public constructor(props: IGameListProps) {
    super(props);
    this.state = {
      currentPage: 0,
      columns: getDefaultColumns(),
      games: [],
      error: undefined
    }
  }

  public async componentDidMount() {
    try {
      const gamesData = await getValidGamesWithCode();
      const { data: { games } } = gamesData;
      const gameEntries = games.map((g) => convertExtendedGameInfoToEntry(g));
      this.setState({ games: gameEntries });
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err}` });
    }
  }

  private getCurrentPage() {
    const currentIndex = this.state.currentPage * this.props.itemsPerPage;
    return this.state.games.slice(currentIndex, currentIndex + this.props.itemsPerPage)
  }

  public render() {
    const pages = Math.floor(this.state.games.length / this.props.itemsPerPage);
    return (<div>
      {this.state.games.length === 0 ? (<div>loading...</div>) : ("")}
      <DetailsList
        compact={true}
        items={this.getCurrentPage()}
        columns={this.state.columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        checkboxVisibility={CheckboxVisibility.hidden}
        onColumnResize={(col, width, index) => {
          console.log("col resize", col, width, index);
          if (col) {
            col.currentWidth = width;
          } else {
            console.log("no col");
          }
        }}
        onRenderItemColumn={(item, index, column) => {
          if (!column) {
            return;
          }
          const value = item[column.fieldName as keyof IGameListEntry] as string;
          if (column.key === "code") {
            return (<span><span>{value}</span> <Link href={getGameLinkFromCode(value)}>Watch replay</Link>
            </span>)
          }
          return (<span>{value}</span>)
        }}
      />
      <Pagination
        selectedPageIndex={this.state.currentPage}
        pageCount={pages}
        onPageChange={(index) => {
          this.setState({ currentPage: index });
        }}
        format={"buttons"}
        firstPageIconProps={{ iconName: 'DoubleChevronLeft' }}
        previousPageIconProps={{ iconName: 'ChevronLeft' }}
        nextPageIconProps={{ iconName: 'ChevronRight' }}
        lastPageIconProps={{ iconName: 'DoubleChevronRight' }}
      />
    </div>);
  }
}

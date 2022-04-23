import { CheckboxVisibility, DetailsList, DetailsListLayoutMode, IColumn } from "@fluentui/react";
import { Pagination } from "@fluentui/react-experiments";
import React, { Component } from "react";
import { IBotInfoExtended } from "../../../backend/src/controllers/bots";
import { getAllBots } from "../api/bots";


export interface IBotListEntry {
  arena: string;
  user: string;
  version: number;
  rating: number;
  lastSeen: string;
}

export interface IBotListProps {

  itemsPerPage: number;
}

export interface IBotListState {
  currentPage: number;
  columns: IColumn[];
  bots: IBotListEntry[];
  error: string | undefined;
}

export const convertExtendedBotInfoToEntry = (bot: IBotInfoExtended): IBotListEntry => {
  const entry: IBotListEntry = {
    arena: `${bot.arena.advanced ? "Advanced" : "Basic"} ${bot.arena.name}`,
    user: bot.user.username,
    version: bot.version,
    rating: bot.rating,
    lastSeen: ""
  };
  return entry;
}

const getDefaultColumns = () => ([
  { key: 'arena', name: 'Arena', fieldName: 'arena', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'user', name: 'User', fieldName: 'user', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'version', name: 'Version', fieldName: 'version', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'rating', name: 'Rating', fieldName: 'rating', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'lastSeen', name: 'Last Seen', fieldName: 'lastSeen', minWidth: 100, maxWidth: 200, isResizable: true },
]);

export default class BotList extends Component<IBotListProps, IBotListState> {

  public constructor(props: IBotListProps) {
    super(props);
    this.state = {
      currentPage: 0,
      columns: getDefaultColumns(),
      bots: [],
      error: undefined
    }
  }

  public async componentDidMount() {
    try {
      const botData = await getAllBots();
      const { data: { bots } } = botData;
      const botsConverted = bots
        .map(b => convertExtendedBotInfoToEntry(b))
        .sort((a, b) => {
          if (a.arena === b.arena) {
            if (a.user === b.user) {
              return a.rating - b.rating;
            }
            return a.user.localeCompare(b.user)
          }
          return a.arena.localeCompare(b.arena);
        }
        );
      this.setState({ bots: botsConverted });
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err}` })
    }
  }

  private getCurrentPage() {
    const currentIndex = this.state.currentPage * this.props.itemsPerPage;
    return this.state.bots.slice(currentIndex, currentIndex + this.props.itemsPerPage)
  }

  public render() {
    const pages = Math.floor(this.state.bots.length / this.props.itemsPerPage);
    return (<div>
      <span>showing {this.state.bots.length} bots</span>
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
      /></div>);
  }
}

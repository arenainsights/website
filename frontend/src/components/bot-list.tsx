import { CheckboxVisibility, DetailsList, DetailsListLayoutMode, IColumn } from "@fluentui/react";
import { Pagination } from "@fluentui/react-experiments";
import React, { Component } from "react";
import { IBotInfoExtended } from "../../../backend/src/controllers/bots";


export interface IBotListEntry {
  arena: string;
  user: string;
  version: number;
  rating: number;
  lastSeen: string;
}

export interface IBotListProps {
  bots: IBotListEntry[];
  itemsPerPage: number;
}

export interface IBotListState {
  currentPage: number;
  columns: IColumn[];
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
      columns: getDefaultColumns()
    }
  }

  private getCurrentPage() {
    const currentIndex = this.state.currentPage * this.props.itemsPerPage;
    return this.props.bots.slice(currentIndex, currentIndex + this.props.itemsPerPage)
  }

  public render() {
    const pages = Math.floor(this.props.bots.length / this.props.itemsPerPage);
    return (<div>
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

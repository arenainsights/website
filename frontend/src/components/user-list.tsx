import { CheckboxVisibility, DetailsList, DetailsListLayoutMode, IColumn } from "@fluentui/react";
import { Pagination } from "@fluentui/react-experiments";
import React, { Component } from "react";
import { IUserInfo } from "../../../backend/src/controllers/games";
import { getAllUsers } from "../api/users";


export interface IUserListProps {

  itemsPerPage: number;
}

export interface IUserListState {
  currentPage: number;
  columns: IColumn[];
  users: IUserInfo[];
  error: string | undefined;
}

const getDefaultColumns = (): IColumn[] => ([
  { key: 'username', name: 'User', fieldName: 'username', minWidth: 100, maxWidth: 200, isResizable: true, isCollapsible: false },
  { key: 'ratingGamesPlayed', name: 'Rating games played', fieldName: 'ratingGamesPlayed', minWidth: 100, maxWidth: 200, isResizable: true, isCollapsible: false },
  { key: 'activeInSeasons', name: 'Active in Seasons', fieldName: 'activeInSeasons', minWidth: 100, maxWidth: 200, isResizable: true, isCollapsible: false },
  { key: 'famePoints', name: 'Fame', fieldName: 'famePoints', minWidth: 100, maxWidth: 200, isResizable: true, isCollapsible: false },
]);

export default class UserList extends Component<IUserListProps, IUserListState> {

  public constructor(props: IUserListProps) {
    super(props);
    this.state = {
      currentPage: 0,
      columns: getDefaultColumns(),
      users: [],
      error: undefined
    }
  }

  public async componentDidMount() {
    try {
      const userData = await getAllUsers();
      const { data: { users } } = userData;
      const usersConverted = users
        .sort((a, b) => b.famePoints - a.famePoints);
      this.setState({ users: usersConverted });
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err}` })
    }
  }

  private getCurrentPage() {
    const currentIndex = this.state.currentPage * this.props.itemsPerPage;
    return this.state.users.slice(currentIndex, currentIndex + this.props.itemsPerPage)
  }

  public render() {
    const pages = Math.floor(this.state.users.length / this.props.itemsPerPage);
    return (<div>
      {this.state.users.length === 0 ? (<div>loading...</div>) : ("")}
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
      />
    </div>);
  }
}

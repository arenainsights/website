import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import TopMenu from "../top-menu";
import UserList from "./user-list";

export interface IUserListPageProps { }
export interface IUserListPageState { }

export default class UserListPage extends Component<IUserListPageProps, IUserListPageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <TopMenu />
      </StackItem>
      <StackItem>
        <UserList itemsPerPage={20} />
      </StackItem>
    </Stack>)
  }
}

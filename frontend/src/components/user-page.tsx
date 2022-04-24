import { Stack, StackItem } from "@fluentui/react";
import { Component } from "react";
import TopMenu from "./top-menu";
import UserList from "./user-list";

export interface IUserPageProps { }
export interface IUserPageState { }

export default class UserPage extends Component<IUserPageProps, IUserPageState> {

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

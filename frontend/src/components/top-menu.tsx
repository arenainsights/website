import { Link, Stack, StackItem } from "@fluentui/react";
import { Component } from "react";

export interface ITopMenuProps { }

export interface ITopMenuState { }

export default class TopMenu extends Component<ITopMenuProps, ITopMenuState> {
  public render() {
    return (
      <Stack horizontal={true}>
        <StackItem>
          <Link href="/">
            <img src="/android-chrome-192x192.png" alt="arena insights Logo" height={"100px"} />
          </Link>
        </StackItem>
        <StackItem>
          <Stack>
            <StackItem>
              <Link href="/">arena insights</Link>
            </StackItem>
            <StackItem>
              <Link href="/bots">Bots</Link>
            </StackItem>
            <StackItem>
              <Link href="/games">Games</Link>
            </StackItem>
          </Stack>
        </StackItem>
      </Stack>
    )
  }
}

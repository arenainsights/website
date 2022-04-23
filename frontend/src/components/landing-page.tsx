import { Link, Stack, StackItem } from "@fluentui/react";
import { Component } from "react";

export interface ILandingPageProps { }
export interface ILandingPageState { }

export default class LandingPage extends Component<ILandingPageProps, ILandingPageState> {

  public render() {
    return (<Stack>
      <StackItem>
        <img src={"/android-chrome-512x512.png"} alt="arena insights Logo" width="20%" />
      </StackItem>
      <StackItem>
        <Link href="/bots">Bots</Link>
      </StackItem>
      <StackItem>
        <Link href="/games">Games</Link>
      </StackItem>
    </Stack>)
  }
}

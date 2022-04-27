import { Tooltip, TooltipProps } from "@mui/material";
import copy from "clipboard-copy";
import * as React from "react";

interface ChildProps {
  copy: (content: any) => void;
}

interface Props {
  TooltipProps?: Partial<TooltipProps>;
  children: (props: ChildProps) => React.ReactElement<any>;
}

interface OwnState {
  showTooltip: boolean;
}

class CopyToClipboard extends React.Component<Props, OwnState> {
  public state: OwnState = { showTooltip: false };

  public render() {
    return (
      <Tooltip
        open={this.state.showTooltip}
        title={"Link copied to clipboard!"}
        leaveDelay={1500}
        onClose={this.handleOnTooltipClose}
        {...this.props.TooltipProps || {}}
      >
        {this.props.children({ copy: this.onCopy }) as React.ReactElement<any>}
      </Tooltip>
    );
  }

  private onCopy = (content: any) => {
    copy(content);
    this.setState({ showTooltip: true });
  };

  private handleOnTooltipClose = () => {
    this.setState({ showTooltip: false });
  };
}

export default CopyToClipboard;

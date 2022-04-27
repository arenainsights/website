import { Button } from "@mui/material";
import React from "react";
import CopyToClipboard from "./copy-to-clipboard";

export default function CopyButton(props: {
  toCopy: string; color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  description: React.ReactNode;
}) {
  return (
    <CopyToClipboard>
      {({ copy }) => (
        <Button
          variant="contained"
          color={props.color}
          onClick={() => copy(props.toCopy)}
        >
          {props.description}
        </Button>
      )}
    </CopyToClipboard>
  );

};

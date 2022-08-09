import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CopyButton from "../utility/copy-button";

export const URL_STUB_ARENA_GAME = "screeps-arena://game/";

export default function GameLinker() {
  let { code } = useParams();
  if (code && code.includes("screeps-arena")) {
    const splitUrl = window.location.href.split(URL_STUB_ARENA_GAME);
    if (splitUrl.length > 1) {
      code = splitUrl[splitUrl.length - 1];
      console.debug(`full url detected, set code to `, code);
    }
  }


  useEffect(() => {
    window.location.href = `${URL_STUB_ARENA_GAME}${code}`;
  }, [code]);
  return (<div>For linux users:
    <pre>./arena {URL_STUB_ARENA_GAME}{code}</pre><CopyButton toCopy={`./arena ${URL_STUB_ARENA_GAME}${code}`} color="secondary" description={<ContentCopyIcon />} />
  </div>);
}

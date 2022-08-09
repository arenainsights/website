import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CopyButton from "../utility/copy-button";

export const URL_STUB_ARENA_GAME = "screeps-arena://game/";

export default function GameLinker() {
  let { code } = useParams();
  if (code && code.startsWith(URL_STUB_ARENA_GAME)) {
    code = code.replace(URL_STUB_ARENA_GAME, "");
  }


  useEffect(() => {
    window.location.href = `${URL_STUB_ARENA_GAME}${code}`;
  }, [code]);
  return (<div>For linux users:
    <pre>./arena {URL_STUB_ARENA_GAME}{code}</pre><CopyButton toCopy={`./arena ${URL_STUB_ARENA_GAME}${code}`} color="secondary" description={<ContentCopyIcon />} />
  </div>);
}

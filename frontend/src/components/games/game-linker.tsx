import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CopyButton from "../utility/copy-button";

export default function GameLinker() {
  let { code } = useParams();


  useEffect(() => {
    window.location.href = `screeps-arena://game/${code}`;
  }, [code]);
  return (<div>For linux users:
    <pre>./arena screeps-arena://game/{code}</pre><CopyButton toCopy={`./arena screeps-arena://game/${code}`} color="secondary" description={<ContentCopyIcon />} />
  </div>);
}

import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function GameLinker() {
  let { code } = useParams();


  useEffect(() => {
    window.location.href = `screeps-arena://game/${code}`;
  }, [code]);
  return null;
}

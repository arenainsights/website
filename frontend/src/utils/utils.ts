export const getArenaNameFromInfo = (info: { advanced: boolean; name: string }): string =>
  `${info.advanced ? "Advanced" : "Basic"} ${info.name}`;

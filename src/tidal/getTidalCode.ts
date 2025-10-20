import { getDrumsCode } from "./getDrumsCode";
import { State } from "./../state/state";

export const getTidalCode = (state: State) => {
  const drums = getDrumsCode(state);
  return `
do
  let gtfo = id
  ${drums}
`;
};

import { Action } from "./action";

export type NavToExplorer = {
  type: "NAV_TO_EXPLORER";
};

export const navToExplorer = (): Action => ({
  type: "NAV_TO_EXPLORER"
});

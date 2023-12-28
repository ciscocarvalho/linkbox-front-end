import { Dispatch } from "react";
import { createContext } from "react";
import { DashboardView, DashboardAction } from "../types";

type DashboardDispatch = Dispatch<DashboardAction>;

// NOTE: We fake the types because the initial dashboard must be computed and
// there would be no point in using undefined, since typescript would force us
// to type check everytime we try to use the context, leading to too much
// unecessary code. As long as we make sure the default value is provided
// before a subcomponent tries to use it, everything is fine.
export const DashboardContext = createContext<DashboardView>(null as any as DashboardView);
export const DashboardDispatchContext = createContext<DashboardDispatch>(null as any as DashboardDispatch);

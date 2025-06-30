import { useContext } from "react";

import { SnackbarContext } from "../Contexts/SnackBarContext";

export const useSnackBar = () => useContext(SnackbarContext);
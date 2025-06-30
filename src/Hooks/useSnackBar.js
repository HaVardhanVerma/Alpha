import { useContext } from "react";

import { SnackbarContext } from "../Contexts/snackBarContext";

export const useSnackBar = () => useContext(SnackbarContext);
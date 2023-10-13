import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#666CFF",
          },
          secondary: {
            main: "#6D788D",
          },
          error: {
            main: "#FF4D49",
          },
          background: {
            default: "#F4F6F8",
            paper: "#FFFFFF",
          },
        }
      : {
          primary: {
            main: "#666CFF",
          },
          secondary: {
            main: "#6D788D",
          },
          error: {
            main: "#FF4D49",
          },
          background: {
            default: "#30334E",
            paper: "#666CFF",
          },
        }),
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === "light" ? "#FFFFFF" : "#666CFF",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#FFFFFF" : "#1E1E1E",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#FFFFFF" : "#1E1E1E",
        },
      },
    },
  },
});

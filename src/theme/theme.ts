import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    primary: {
      main: "#666CFF",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {
      main: "#FF4D49",
    },
    success: {
      main: "#1BC5BD",
    },
    text: {
      light: "#FFFFFF",
      dark: "#1E1E1E",
    },
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#F4F6F8",
            paper: "#FFFFFF",
          },
        }
      : {
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
          backgroundColor: "#666CFF",
          color: "#FFFFFF",
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
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: mode === "light" ? "#EFF1F3" : "#303030",
          },
          "&:last-child td, &:last-child th": {
            border: 0,
          },
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

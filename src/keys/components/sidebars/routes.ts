import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
export interface Menu {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  url: string;
}

export const menu: Menu[] = [
  {
    title: "Llaves Prestadas",
    icon: PlaylistAddOutlinedIcon,
    url: "/",
  },
  {
    title: "Listado de Llaves",
    icon: KeyOutlinedIcon,
    url: "/load-keys",
  },
  // {
  //     title: "Historial",
  //     icon: "fa-history",
  //     url: "/history"
  // },
];

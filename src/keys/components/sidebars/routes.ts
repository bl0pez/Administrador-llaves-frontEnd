interface Menu {
    title: string;
    icon: string;
    url: string;
}

export const menu: Menu[] = [
    {
        title: "Llaves",
        icon: "fa-key",
        url: "/"
    },
    {
        title: "Llaves prestadas",
        icon: "fa-key",
        url: "/load-keys"
    },
    {
        title: "Historial",
        icon: "fa-history",
        url: "/history"
    },
]
interface Menu {
    title: string;
    icon: string;
    url: string;
}

export const menu: Menu[] = [
    {
        title: "Crear llave",
        icon: "fa-plus",
        url: "/admin/new"
    },
    {
        title: "Llaves",
        icon: "fa-key",
        url: "/admin/keys"
    },
    {
        title: "Historial",
        icon: "fa-history",
        url: "/admin/history"
    },
]
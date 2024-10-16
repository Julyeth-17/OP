import { ColDef, ColGroupDef } from "@ag-grid-community/core";

export const userColumns: (ColDef | ColGroupDef)[] = [
    {
        field: 'docs.usuario',
        headerName: 'Usuario',
        width: 150
    },
    {
        field: 'docs.correo',
        headerName: 'Correo',
        width: 150
    }
]

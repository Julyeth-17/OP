import { ColDef } from "ag-grid-community";

export const columnDefs: ColDef[] = [
    {
    field: 'usuario',
    headerName: 'Usuarios Registrados',
    width: 200
    },
    {
    field: 'correo',
    width: 250
    },
    {
      headerName: 'Acciones',
      field: 'actions',
      cellRenderer: (params: any) => {
        return `
          <button class="btn btn-warning btn-sm" data-action="edit" data-id="${params.data._id}">Editar</button>
          <button class="btn btn-danger btn-sm" data-action="delete" data-id="${params.data._id}">Eliminar</button>
        `;
      },
      width: 200
    },
];

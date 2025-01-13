import { ColDef, ColGroupDef } from 'ag-grid-community';

export const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: 'Zona Horaria',
    field: 'name',
    sortable: true,
    filter: true,
    resizable: false,
    width: 200
  },
  {
    headerName: 'Hora Actual',
    field: 'currentTime',
    sortable: true,
    resizable: false,
    width: 350
  },
  {
    headerName: '',
    cellRenderer: (params: any) => {
      return `<button class="btn btn-danger btn-sm" data-action="delete">
                <i class="fa-solid fa-trash"></i>
              </button>`;
    },
    resizable: false,
    width: 100,
  },
];

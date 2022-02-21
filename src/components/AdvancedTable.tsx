import { FC, useMemo } from 'react';
import { useTable } from 'react-table';

interface IProps {}

export const AdvancedTable: FC<IProps> = () => {
  const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'Hello',
        col2: 'World',
      },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    [],
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data });
  return (
    <table {...tableInstance.getTableProps()}>
      {/* <thead>
        {
          // Loop over the header rows
          tableInstance.headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()} key={column.id}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props 
      <tbody {...tableInstance.getTableBodyProps()}>
        {
          // Loop over the table rows
          tableInstance.rows.map((row) => {
            // Prepare the row for display
            tableInstance.prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()} key={row.id}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell, i) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()} key={`${row.id}-${i}`}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody> */}
    </table>
  );
};

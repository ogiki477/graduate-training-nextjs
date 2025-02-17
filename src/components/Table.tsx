import React from 'react';

const Table = ({
  columns,
  renderRow,
  data = [], // Default to an empty array if `data` is undefined
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data?: any[]; // Make `data` optional
}) => {
  return (
    <table className='w-full mt-4'>
      <thead>
        <tr className='text-left text-gray-500 text-sm'>
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
};

export default Table;
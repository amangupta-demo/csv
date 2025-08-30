import React ,{useMemo} from "react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,

  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper

} from "@tanstack/react-table";


// it will used for fetch api
const fetchUsers = async ()=>{
try{
  const res = await axios.get('http://localhost:3000/getAllUser')
  // console.log(res)
  return  res.data
}catch(error){
 console.log(error.message)
}

};

const ShowAllRecords =()=> {

    //  useQuery takes a unique key and fetch function
  const { data=[], isLoading, isError, error } = useQuery({
    queryKey: ['users'], // key to identify this query
    queryFn: fetchUsers  // the fetch function
  });

  console.log(error);
  console.log(data)
  
  const columnHelper = createColumnHelper()

  const column = useMemo(()=>[

    columnHelper.accessor('id',{
      header:'ID',
      cell:(info)=> info.getValue(),
    }),

    columnHelper.accessor("UserId",{
      header:"User Id",
      cell:(info)=> info.getValue(),
    }),

    columnHelper.accessor("date",{
      header:"Date",
      cell:(info)=> info.getValue(),
    }),

    columnHelper.accessor("punchIn",{
      header:"Punch In",
      cell:(info)=> info.getValue(),
    }),

    columnHelper.accessor("punchOut",{
      header:"punch Out",
      cell:(info)=>info.getValue(),
    }),
    columnHelper.accessor('status',{
      header:'Status',
      cell:(info)=>info.getValue()
    }),
    columnHelper.accessor('work_hours',{
      header:'work_hours',
      cell:(info)=>info.getValue()
    })
// 
// : 
// "Present"
// updatedAt
// : 
// "2025-08-25T10:42:55.655Z"
// work_hours
// : 
// "00:00:02"

  ],[columnHelper] )


  const table = useReactTable(
    {
      data: data ?? [], // this will be the data which will display
      columns:column,
       getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    }
  )



  //  ✅ While data is loading
  if (isLoading) {
    return <p>Loading users...</p>;
  }

  // ✅ If there's an error
  if (isError) {
    return <p>Error fetching users: {error.message}</p>;
  }




  // ✅ When data is successfully fetched
  return (
    <div className="w-full flex flex-col items-center p-10 ">
      <h2>Users List</h2>

 <input type="text" placeholder="Search..." onChange={(e) =>
          table.setGlobalFilter(e.target.value || undefined)
        }
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <table border="1" cellPadding="8" className="w-full ">
         <thead style={{ backgroundColor: "#f2f2f2" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ cursor: "pointer" }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody >
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}  >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{textAlign:'center'}}  >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

      {/* 🔎 Pagination Controls */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    



      {/* <ul>
        {data.map(user => (
         <div key={user.id} >
          <div style={{background:'blue'}} > <span>id: </span> <span>{user.id}</span> </div>
          <div> <span>UserId: </span> <span>{user.UserId}</span> </div>
          <div> <span>date: </span> <span>{user.date}</span> </div>
          <div> <span>punchIn: </span> <span>{user.punchIn}</span> </div>
          <div> <span>punchOut: </span> <span>{user.punchOut}</span> </div>
          <div> <span>work_hours: </span> <span>{user.work_hours}</span> </div>
          <div> <span>status: </span> <span>{user.status}</span> </div>
         </div>
        ))}
      </ul> */}


    </div>
  );

}

export default ShowAllRecords;
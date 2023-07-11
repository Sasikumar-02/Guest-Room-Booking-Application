import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Swal from 'sweetalert2';

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  
  useEffect(() => {
    setList(data);
  }, [data]);

  // Function to handle deletion of a row
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title:"Are you sure?",
        text: "You won't be able to revert this!",
        icon:"warning",
        showCancelButton:true,
        confirmButtonColor:"#d33",
        cancelButtonColor:"#3085d6",
        confirmButtonText:"Yes, delete it!"
      });
      if(result.isConfirmed){
        await axios.delete(`/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
        Swal.fire("Deleted!","The row has been deleted.","success");
      }    
      } 
      catch (err) {
        // Handle error if deletion fails
        console.log(err);
        Swal.fire("Error","An error occurred while deleting the row.","error");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      {list && (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;

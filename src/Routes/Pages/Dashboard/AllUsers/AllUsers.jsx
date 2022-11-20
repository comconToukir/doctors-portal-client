import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useQuery } from '@tanstack/react-query';

import { DataGrid, GridActionsCellItem  } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';

import Loading from '../../../../Components/Loading/Loading';
import toast from 'react-hot-toast';

const AllUsers = () => {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      const data = await res.json();
      return data;
    }
  })

  const deleteUser = () => {

  }
  
  const toggleAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      if (data.modifiedCount > 0) {
        toast.success("Admin made successfully")
        refetch();
      }
    })
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      // sortable: false,
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label="Toggle Admin"
          onClick={() => toggleAdmin(params.id)}
          // showInMenu
        />
      ],
    },
  ];

  if (isLoading) return <Loading />
  return (
    <div>
      <Typography component="h1" variant="h4" mb={2}>
        My Appointments
      </Typography>
      <Box sx={{ height: 800, width: '100%', paddingRight: "25px" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        // experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </div>
  );
};

export default AllUsers;
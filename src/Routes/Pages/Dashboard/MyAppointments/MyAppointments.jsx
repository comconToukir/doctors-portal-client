import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';

const columns = [
  {
    field: 'patient',
    headerName: 'Name',
    width: 160,
  },
  {
    field: 'treatmentName',
    headerName: 'Treatment',
    width: 200,
  },
  {
    field: 'appointmentDate',
    headerName: 'Date',
    width: 150,
  },
  {
    field: 'timeSlot',
    headerName: 'Time',
    sortable: false,
    width: 160,
  },
];



const MyAppointments = () => {
  const { user } = useContext(UserContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) return <Loading />
  return (
    <div>
      <Typography component="h1" variant="h4" mb={2}>
        My Appointments
      </Typography>
      <Box sx={{ height: 635, width: '100%', paddingRight: "25px" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={bookings}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </div>
  );
};

export default MyAppointments;
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Typography, Box, Tooltip } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import Loading from "../../../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const columns = [
  {
    field: "isPaid",
    headerName: "Status",
    width: 75,
    renderCell: (params) => [
      params.row?.isPaid ? (
        <Typography
          key={params.id + "paid"}
          variant="subtitle2"
          component="h3"
          style={{
            color: "green",
          }}
        >
          Paid
        </Typography>
      ) : (
        <Typography
          key={params.id + "unpaid"}
          variant="subtitle2"
          component="h3"
          style={{
            color: "red",
          }}
        >
          Unpaid
        </Typography>
      ),
    ],
  },
  // {
  //   field: "patient",
  //   headerName: "Name",
  //   width: 100,
  // },
  {
    field: "treatmentName",
    headerName: "Treatment",
    width: 150,
  },
  {
    field: "appointmentDate",
    headerName: "Appointed Date",
    width: 150,
  },
  {
    field: "timeSlot",
    headerName: "Appointed Time",
    sortable: false,
    width: 160,
  },
  {
    field: "price",
    headerName: "Price",
    sortable: true,
    width: 25,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Pay",
    sortable: true,
    width: 25,
    renderCell: (params) => [
      params.row?.price && !params.row?.isPaid ? (
        <Tooltip title="Pay" key={params.id + "pay"} placement="bottom-end">
          <Link
            to={`/dashboard/payment/${params.id}`}
            style={{ color: "darkgreen" }}
          >
            <MonetizationOnIcon />
          </Link>
        </Tooltip>
      ) : null,
    ],
  },
  {
    field: "transactionId",
    headerName: "Transaction Id",
    // sortable: true,
    width: 250,
  },
  {
    field: "transactionTime",
    headerName: "Transaction Time",
    sortable: true,
    width: 260,
    renderCell: (params) => [
      params.row?.transactionTime ? (
        <Typography key={params.id + "transactionDate"}>
          {dayjs(params.row?.transactionTime).format(
            "DD MMMM, YYYY - hh:mm:ss a"
          )}
        </Typography>
      ) : null,
    ],
  },
];

const MyAppointments = () => {
  const { user } = useContext(UserContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div>
      <Typography component="h1" variant="h4" mb={2}>
        My Appointments
      </Typography>
      <Box sx={{ height: 635, width: "100%", paddingRight: "25px" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={bookings}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};

export default MyAppointments;

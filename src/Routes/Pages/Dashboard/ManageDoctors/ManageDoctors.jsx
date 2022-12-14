import { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Typography, Box, Tooltip, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Loading from "../../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ManageDoctors = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingDoctor, setDeletingDoctor] = useState("");

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("https://doctors-portal-server-flax-eta.vercel.app/doctors", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const columns = [
    {
      field: "id",
      headerName: "Row",
      filterable: false,
      width: 10,
      renderCell: (params) => params.api.getRowIndex(params.id) + 1,
    },
    {
      field: "imgUrl",
      headerName: "Image",
      width: 25,
      sortable: false,
      renderCell: (params) => (
        // console.log(index)
        <Avatar alt={params.name} src={params.row.imgUrl} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "specialty",
      headerName: "Specialty",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit" placement="left-end">
              <EditIcon />
            </Tooltip>
          }
          label="Toggle Admin"
          // onClick={() => toggleAdmin(params.id)}
          // showInMenu
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete" placement="right-end">
              <DeleteIcon />
            </Tooltip>
          }
          label="Delete"
          onClick={() => {
            handleClickOpen();
            console.log(params.row)
            setDeletingDoctor(params.row);
          }}
        />,
      ],
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div>
      <Typography component="h1" variant="h4" mb={2}>
        Manage Doctors: {doctors?.length}
      </Typography>
      <Box style={{ height: 800, width: "100%"}}>
        <DataGrid
          autoHeight 
          getRowId={(row) => row._id}
          rows={doctors}
          columns={columns}
          // getRowHeight={() => 'auto'}
          rowHeight={75}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 15, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <DeleteConfirmModal
        open={modalOpen}
        handleClose={handleClose}
        deletingDoctor={deletingDoctor}
        refetch={refetch}
      />
    </div>
  );
};

export default ManageDoctors;

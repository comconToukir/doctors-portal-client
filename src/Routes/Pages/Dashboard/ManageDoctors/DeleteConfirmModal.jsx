import toast from "react-hot-toast";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteConfirmModal = ({ open, handleClose, refetch, deletingDoctor }) => {
  const deleteDoctor = () => {
    fetch(`https://doctors-portal-server-flax-eta.vercel.app/doctors/${deletingDoctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          handleClose();
          toast.success(`${deletingDoctor.name} removed from database successfully`);
          refetch();
        }
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Delete-doctor"
        aria-describedby="Delete-doctor-modal"
      >
        <DialogTitle>
          {`Remove ${deletingDoctor.name} from database?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Warning! Deleted data cannot be recovered. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteDoctor} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmModal;

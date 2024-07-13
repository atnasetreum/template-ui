import { forwardRef, ReactElement, Ref } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  isOpen: boolean;
  close: (confirm: boolean) => void;
}

export const DialogConfirmNotification = ({ isOpen, close }: Props) => {
  const handleClose = (confirm = false) => {
    close(confirm);
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Use Notification service?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let the service help you by notifying you of the most important events
          within the app.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleClose(true)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ThematicAreasDetail from "./ThematicAreasDetail";

function MuseumModal({ open, onClose, museum }) {
  if (!museum) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>{museum.displayName}</DialogTitle>
      <DialogContent>
        <ThematicAreasDetail museum={museum} />
      </DialogContent>
    </Dialog>
  );
}

export default MuseumModal;

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ThematicAreasDetail from "./ThematicAreasDetail";

function ThematicAreasModal({ open, onClose, thematicArea }) {
  if (!thematicArea) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>{thematicArea.displayName}</DialogTitle>
      <DialogContent>
        <ThematicAreasDetail thematicArea={thematicArea} />
      </DialogContent>
    </Dialog>
  );
}

export default ThematicAreasModal;

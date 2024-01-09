/* MuseumModal.js
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import MuseumDetail from './MuseumDetail';

function MuseumModal({ open, onClose, museum }) {
  if (!museum) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>{museum.displayName}</DialogTitle>
      <DialogContent>
        <MuseumDetail museum={museum} />
      </DialogContent>
    </Dialog>
  );
}

export default MuseumModal;

*/

// MuseumModal.js
import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import MuseumDetail from './MuseumDetail';

function MuseumModal({ open, onClose, museum }) {
  if (!museum) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogContent>
        <MuseumDetail museum={museum} customTitle="Dettagli museo" />
      </DialogContent>
    </Dialog>
  );
}

export default MuseumModal;

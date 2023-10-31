import React, { useRef, useState } from 'react';
import { Button, Stack, Tooltip, Modal, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';

function RuleFormButtons({
  editingIndex,
  clearFields,
  handleSaveRules,
  handleSubmit,
  handleFileUpload,
  handleQuickTip,
  handleValidateRule,
}) {
  const fileInputRef = useRef(null);
  const [isTipModalOpen, setTipModalOpen] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleOpenTipModal = () => {
    setTipModalOpen(true);
  };

  const handleCloseTipModal = () => {
    setTipModalOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* ... rest of your buttons ... */}

      <Tooltip title="Quick Tips">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenTipModal}
          sx={{ display: 'block', margin: '0 auto' }}
        >
          Quick Tips
        </Button>
      </Tooltip>

      {/* ... rest of your buttons ... */}

      <Modal
        open={isTipModalOpen}
        onClose={handleCloseTipModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="simple-modal-title" variant="h6" component="h2">
            Dica Rápida
          </Typography>
          <Typography id="simple-modal-description" sx={{ mt: 2 }}>
            column_name: "abi_campaign"
            <br />
            Operator: "LIKE"
            <br />
            Values: "%Michelob Ultra Exercise Bike%"
            <br />
            Output_value: "MICHELOB ULTRA EXERCISE BIKE"
          </Typography>
        </Box>
      </Modal>
    </Stack>
  );
}

export default RuleFormButtons;

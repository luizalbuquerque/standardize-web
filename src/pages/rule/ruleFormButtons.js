import React, { useRef } from 'react';
import { Button, Stack, Tooltip } from '@mui/material';
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

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button
        startIcon={<AddIcon />}
        type="submit"
        variant="contained"
        color="primary"
        sx={{ display: 'block', margin: '0 auto' }}
        onClick={handleSubmit}
      >
        {editingIndex === -1 ? 'ADD Rule' : 'Atualizar Regra'}
      </Button>

      <Button
        startIcon={<PublishIcon />}
        variant="contained"
        color="info"
        onClick={handleImportClick}
        sx={{ display: 'block', margin: '0 auto' }}
      >
        Import
      </Button>
      <input
        type="file"
        accept=".csv, .txt"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />

      <Button
        variant="contained"
        color="inherit"
        onClick={clearFields}
        sx={{ display: 'block', margin: '0 auto' }}
      >
        Clear All
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={handleSaveRules}
        sx={{ display: 'block', margin: '0 auto' }}
      >
        Save all Rules
      </Button>

      <Tooltip title="Quick Tips">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleQuickTip}
          sx={{ display: 'block', margin: '0 auto' }}
        >
          Quick Tips
        </Button>
      </Tooltip>

      <Button
        variant="contained"
        color="warning"
        onClick={handleValidateRule}
        sx={{ display: 'block', margin: '0 auto' }}
      >
        Validate Rule
      </Button>
    </Stack>
  );
}

export default RuleFormButtons;

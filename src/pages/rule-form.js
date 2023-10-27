import { useState, useRef } from 'react';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@mui/icons-material/ArrowUpward'; // Certifique-se de que a importação do ícone está correta

import {
  Box, Button, Container, Grid, Stack, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Paper
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';




const RuleForm = () => {
  const [formData, setFormData] = useState({
    user: 'ABI_user',
    zone: '',
    country: '',
    date: new Date().toISOString().slice(0, 10),
    columnName: '',
    operator: '',
    values: '',
    columnNameOutput: '',
    logic: 'AND',
    outputValue: '',
    collunName: '', // Novo campo 1
    operator: '', // Novo campo 2
    values: '', // Novo campo 3
    logic: '', // Novo campo 4
    outputValue: '' // Novo campo 5
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [uniqueIdCounter, setUniqueIdCounter] = useState(1); // Contador para IDs únicos
  const [sqlSimulation, setSqlSimulation] = useState(''); // Estado para armazenar a simulação SQL
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false); // Estado para controlar a abertura/fechamento do modal
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Função para copiar SQL para a área de transferência
  const handleCopiarSql = () => {
    navigator.clipboard.writeText(simulacaoSql).then(() => {
      alert("SQL copiado para a área de transferência!");
      setOpenModal(false);
    });
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContents = e.target.result;
        };
        reader.readAsText(file);
      } else {
        alert('Por favor, selecione um arquivo CSV ou TXT válido.');
      }
    }
  };

  const clearFields = () => {
    setFormData({
      user: 'ABI_user',
      zone: '',
      country: '',
      date: new Date().toISOString().slice(0, 10),
      columnName: '',
      operator: '',
      values: '',
      columnNameOutput: '',
      logic: 'AND',
      outputValue: '',
      collunName: '',
      operator: '',
      values: '',
      logic: '',
      outputValue: ''
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingIndex === -1) {
      const newRule = {
        ...formData,
        id: uniqueIdCounter, // Definir um ID único
      };
      setUniqueIdCounter(uniqueIdCounter + 1);

      const newSubmittedData = [...submittedData, newRule];
      setSubmittedData(newSubmittedData);
    } else {
      const updatedData = [...submittedData];
      updatedData[editingIndex] = formData;
      setSubmittedData(updatedData);
      setEditingIndex(-1);
    }

    clearFields();
  };

  const handleEdit = (index) => {
    const dataToEdit = submittedData[index];
    setFormData(dataToEdit);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    setSubmittedData(updatedData);
  };

  const handleShowSQL = (index) => {
    if (index >= 0 && index < submittedData.length) {
      const data = submittedData[index];
      const sql = `SELECT * FROM tabela WHERE user = '${data.user}' AND zone = '${data.zone}'`;
      setSqlSimulation(sql);
      setIsSqlModalOpen(true);
    }
  };

  const handleCloseSqlModal = () => {
    setIsSqlModalOpen(false);
  };

  const handleSaveRules = () => {
    setIsProgressModalOpen(true);
    setProgress(0);



    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 20;
        if (newProgress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProgressModalOpen(false);
            setProgress(0);
          }, 1000);
        }
        return newProgress;
      });
    }, 1000);
  };


  return (
    <>
      <Head>
        <title>Create a new rule</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md-2">
          <Typography variant="h4" align="center">
            Create a new rule
          </Typography>
          <br />
          <br />
          <Button
            color="inherit"
            variant="contained"
            onClick={() => fileInputRef.current.click()}
            startIcon={<ArrowUpOnSquareIcon fontSize="small" />}
          >
            Import File of Rules
          </Button>

          <Button
                    color="info"
                    type="submit"
                    variant="contained"
                    
                    sx={{ display: 'block', margin: '0 auto' }}
                  >
                    {editingIndex === -1 ? 'Validate Rule' : 'Validate Rule'}
                  </Button>

          <br />
          <br />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Campos do formulário */}
              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="User"
                    name="user"
                    onChange={handleChange}
                    value={formData.user}
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>ZONE</InputLabel>
                    <Select
                      label="Zone"
                      name="zone"
                      onChange={handleChange}
                      value={formData.zone}
                      variant="outlined"
                    >
                      <MenuItem value={"NAZ"}>NAZ</MenuItem>
                      <MenuItem value={"SAZ"}>SAZ</MenuItem>
                      <MenuItem value={"MIDAM"}>MIDAM</MenuItem>
                      <MenuItem value={"EUR"}>EUR</MenuItem>
                      <MenuItem value={"AFRICA"}>AFRICA</MenuItem>
                      <MenuItem value={"APAC"}>APAC</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Country</InputLabel>
                    <Select
                      label="Country"
                      name="country"
                      onChange={handleChange}
                      value={formData.country}
                      variant="outlined"
                    >
                      <MenuItem value={"US"}>United States</MenuItem>
                      <MenuItem value={"BR"}>Brazil</MenuItem>
                      <MenuItem value={"CA"}>Canada</MenuItem>
                      <MenuItem value={"UK"}>United Kingdom</MenuItem>
                      <MenuItem value={"AU"}>Australia</MenuItem>
                      <MenuItem value={"DE"}>Germany</MenuItem>
                      <MenuItem value={"FR"}>France</MenuItem>
                      <MenuItem value={"JP"}>Japan</MenuItem>
                      <MenuItem value={"IN"}>India</MenuItem>
                      <MenuItem value={"MX"}>Mexico</MenuItem>
                      <MenuItem value={"CN"}>China</MenuItem>
                      <MenuItem value={"RU"}>Russia</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    onChange={handleChange}
                    value={formData.date}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {/* <Button
                    color="inherit"
                    type="submit"
                    variant="contained"
                    sx={{ display: 'block', margin: '0 auto' }}
                  >
                    {editingIndex === -1 ? 'Validate Rule' : 'Validate Rule'}
                  </Button> */}
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    sx={{ display: 'block', margin: '0 auto' }}
                  >
                    {editingIndex === -1 ? 'ADD Rule' : 'Atualizar Regra'}
                  </Button>
                  <Button
                    color="inherit"
                    variant="contained"
                    onClick={clearFields}
                    sx={{ display: 'block', margin: '0 auto' }}
                  >
                    Clear All
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={handleSaveRules}
                    sx={{ display: 'block', margin: '0 auto' }}
                  >
                    Save all Rules
                  </Button>
                  <input
                    type="file"
                    accept=".csv, .txt"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />

                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Collun Name"
                    name="collunName"
                    onChange={handleChange}
                    value={formData.collunName}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Operator"
                    name="operator"
                    onChange={handleChange}
                    value={formData.operator}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Values"
                    name="values"
                    onChange={handleChange}
                    value={formData.values}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Logic"
                    name="logic"
                    onChange={handleChange}
                    value={formData.logic}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Output Value"
                    name="outputValue"
                    onChange={handleChange}
                    value={formData.outputValue}
                    variant="outlined"
                  />
                </Stack>
              </Grid>
            </Grid>
          </form>
          <Box mt={10}>
            {submittedData.length > 0 && (
              <div>
                <Typography variant="h5">Rule List:</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Zone</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Collun_Name</TableCell>
                        <TableCell>Operator</TableCell>
                        <TableCell>Values</TableCell>
                        <TableCell>Logic</TableCell>
                        <TableCell>Output Value</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {submittedData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data.id}</TableCell>
                          <TableCell>{data.user}</TableCell>
                          <TableCell>{data.zone}</TableCell>
                          <TableCell>{data.country}</TableCell>
                          <TableCell>{data.date}</TableCell>
                          <TableCell>{data.collunName}</TableCell>
                          <TableCell>{data.operator}</TableCell>
                          <TableCell>{data.values}</TableCell>
                          <TableCell>{data.logic}</TableCell>
                          <TableCell>{data.outputValue}</TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={1}>
                              <Button
                                color="info"
                                variant="contained"
                                onClick={() => handleShowSQL(index)}
                              >
                                Show SQL
                              </Button>
                              <Button
                                color="warning"
                                variant="contained"
                                onClick={() => handleEdit(index)}
                              >
                                Editar
                              </Button>
                              <Button
                                color="error"
                                variant="contained"
                                onClick={() => handleDelete(index)}
                              >
                                Excluir
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </Box>
        </Container>
      </Box>

      <Modal
        open={isSqlModalOpen}
        onClose={handleCloseSqlModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
          <Paper elevation={3} sx={{ padding: '2rem', position: 'relative' }}>
            <Typography variant="h6" id="modal-title" gutterBottom>
              SQL Simulation
            </Typography>
            <Typography variant="body2" id="modal-description" sx={{ marginBottom: '16px' }}>
              {sqlSimulation}
            </Typography>
            <IconButton
              onClick={handleCloseSqlModal}
              sx={{ position: 'absolute', top: '8px', right: '8px' }}
            >
              <CloseIcon />
            </IconButton>
            <Button
              startIcon={<ContentCopyIcon />}
              variant="contained"
              onClick={() => navigator.clipboard.writeText(sqlSimulation)}
              sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
            >
              Copy
            </Button>
          </Paper>
        </Box>
      </Modal>

      <Modal
        open={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        aria-labelledby="progress-modal-title"
        aria-describedby="progress-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white', p: 4 }}>
          <Typography id="progress-modal-title" variant="h6" component="h2">
            Enviando regras...
          </Typography>
          <Box sx={{ width: '100%', my: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Typography id="progress-modal-description" sx={{ mt: 2 }}>
            {progress === 100 ? 'Regras enviadas com sucesso!' : `Enviando... ${progress}%`}
          </Typography>
        </Box>
      </Modal>


    </>
  );
};

RuleForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RuleForm;

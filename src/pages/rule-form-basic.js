import { useState } from 'react';
import Head from 'next/head';
import {
  Box, Button, Container, Grid, Stack, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Paper
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';

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
    newField1: '', // Novo campo 1
    newField2: '', // Novo campo 2
    newField3: '', // Novo campo 3
    newField4: '', // Novo campo 4
    newField5: '' // Novo campo 5
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [uniqueIdCounter, setUniqueIdCounter] = useState(1); // Contador para IDs únicos
  const [sqlSimulation, setSqlSimulation] = useState(''); // Estado para armazenar a simulação SQL
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false); // Estado para controlar a abertura/fechamento do modal

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
      outputValue: ''
    });
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
    // Verifique se o índice está dentro dos limites do array
    if (index >= 0 && index < submittedData.length) {
      // Implementação da simulação de SQL com base nos dados do índice
      const data = submittedData[index];
      const sql = `SELECT * FROM tabela WHERE user = '${data.user}' AND zone = '${data.zone}'`; // Adicione outras condições conforme necessário
      setSqlSimulation(sql);
      setIsSqlModalOpen(true);
    }
  };
  

  const handleCloseSqlModal = () => {
    setIsSqlModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Cadastro de Regras</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md-2">
          <Typography variant="h4" align="center">
            Create a new rule
          </Typography>
          <br/>
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
                  <TextField
                    fullWidth
                    label="Zone"
                    name="zone"
                    onChange={handleChange}
                    value={formData.zone}
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Country</InputLabel>
                    <Select
                      label="Country"
                      name="country"
                      onChange={handleChange}
                      value={formData.country}
                    >
                      <MenuItem value={"US"}>US</MenuItem>
                      <MenuItem value={"BR"}>BR</MenuItem>
                      {/* Adicione outros países conforme necessário */}
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
                   <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    sx={{ display: 'block', margin: '0 auto' }}
                  >
                    {editingIndex === -1 ? 'Save' : 'Atualizar Regra'}
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>

                  <TextField
                    fullWidth
                    label="Collun Name"
                    name="newField1"
                    onChange={handleChange}
                    value={formData.newField1}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Value"
                    name="newField2"
                    onChange={handleChange}
                    value={formData.newField2}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Logic"
                    name="newField3"
                    onChange={handleChange}
                    value={formData.newField3}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Output Value"
                    name="newField4"
                    onChange={handleChange}
                    value={formData.newField4}
                    variant="outlined"
                  />
                  {/* <TextField
                    fullWidth
                    label="Description"
                    name="newField5"
                    onChange={handleChange}
                    value={formData.newField5}
                    variant="outlined"
                  /> */}
                  {/* <Button
                    color="secondary"
                    variant="contained"
                    sx={{ display: 'block', margin: '0 auto' }}
                    onClick={() => handleShowSQL(editingIndex)}
                  >
                    Show SQL
                  </Button> */}
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
                        <TableCell>Date</TableCell>
                        <TableCell>Collun_Name</TableCell>
                        <TableCell>VALUE</TableCell>
                        <TableCell>Logic</TableCell>
                        <TableCell>Output Value</TableCell>
                        <TableCell>Ações</TableCell>
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
                          <TableCell>{data.operator}</TableCell>
                          <TableCell>{data.values}</TableCell>
                          <TableCell>{data.logic}</TableCell>
                          <TableCell>{data.outputValue}</TableCell>
                          <TableCell>
  <Stack direction="row" spacing={1}>
    <Button
      color="primary"
      variant="contained"
      onClick={() => handleShowSQL(index)}
    >
      Show SQL
    </Button>
    <Button
      color="primary"
      variant="contained"
      onClick={() => handleEdit(index)}
    >
      Editar
    </Button>
    <Button
      color="secondary"
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

      {/* Modal para exibir a simulação de SQL */}
      <Modal
        open={isSqlModalOpen}
        onClose={handleCloseSqlModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Paper elevation={3} sx={{ padding: '2rem' }}>
            <Typography variant="h6" id="modal-title">
              SQL Simulation
            </Typography>
            <Typography variant="body2" id="modal-description">
              {sqlSimulation}
            </Typography>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

RuleForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RuleForm;

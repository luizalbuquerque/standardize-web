import { useState } from 'react';
import Head from 'next/head';
import {
  Box, Button, Container, Grid, Stack, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingIndex === -1) {
      const newSubmittedData = [...submittedData, formData];
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

  return (
    <>
      <Head>
        <title>Cadastro de Regras</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={3}>
                <Typography variant="h4">Cadastro de Regras</Typography>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {/* Campos do formulário */}
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
                    <TextField
  fullWidth
  label="Novo Campo 1"
  name="newField1"
  onChange={handleChange}
  value={formData.newField1}
  variant="outlined"
/>
  <TextField
    fullWidth
    label="Novo Campo 2"
    name="newField2"
    onChange={handleChange}
    value={formData.newField2}
    variant="outlined"
  />
  <TextField
    fullWidth
    label="Novo Campo 3"
    name="newField3"
    onChange={handleChange}
    value={formData.newField3}
    variant="outlined"
  />
  <TextField
    fullWidth
    label="Novo Campo 4"
    name="newField4"
    onChange={handleChange}
    value={formData.newField4}
    variant="outlined"
  />
  <TextField
    fullWidth
    label="Novo Campo 5"
    name="newField5"
    onChange={handleChange}
    value={formData.newField5}
    variant="outlined"
  />
                    <Button color="primary" type="submit" variant="contained">
                      {editingIndex === -1 ? 'Cadastrar Regra' : 'Atualizar Regra'}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Grid>
          </Grid>
          <Box mt={10}>
            {submittedData.length > 0 && (
              <div>
                <Typography variant="h5">Dados Cadastrados:</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Zone</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Operator</TableCell>
                        <TableCell>Values</TableCell>
                        <TableCell>Logic</TableCell>
                        <TableCell>Output Value</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {submittedData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data.user}</TableCell>
                          <TableCell>{data.zone}</TableCell>
                          <TableCell>{data.country}</TableCell>
                          <TableCell>{data.date}</TableCell>
                          <TableCell>{data.operator}</TableCell>
                          <TableCell>{data.values}</TableCell>
                          <TableCell>{data.logic}</TableCell>
                          <TableCell>{data.outputValue}</TableCell>
                          <TableCell>
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
    </>
  );
};

RuleForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RuleForm;

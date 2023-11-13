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
    tableName: '',
    columnName: '',
    operator: '',
    conditionValues: '',
    outputValue: '',
    priority: ''
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [uniqueIdCounter, setUniqueIdCounter] = useState(1); 
  const [sqlSimulation, setSqlSimulation] = useState(''); 
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
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
      tableName: '',
      columnName: '',
      operator: '',
      conditionValues: '',
      outputValue: '',
      priority: ''
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingIndex === -1) {
      const newRule = {
        ...formData,
        id: uniqueIdCounter,
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

// const handleShowSQL = (index) => {
//     if (index >= 0 && index < submittedData.length) {
//       const data = submittedData[index];
//       let sql = `
//         SELECT 
//             CASE 
//                 WHEN ${data.columnName} ${data.operator} '${data.conditionValues}' THEN '${data.outputValue}'
//                 ELSE ${data.columnName}
//             END AS NormalizedName
//         FROM your_table_name;
//       `;
//       setSqlSimulation(sql);
//       setIsSqlModalOpen(true);
//     }
// };

const handleShowSQL = (index) => {
  if (index >= 0 && index < submittedData.length) {
    const data = submittedData[index];
    let sql = `
      SELECT
        ${data.columnName},
        CASE
          WHEN ${data.condition} THEN '${data.outputValue}'
          ELSE ${data.columnName}
        END as Normalized${data.columnName},
        -- Substitua 'other_columns' com as outras colunas que você quer selecionar ou use '*' para todas as outras
        *
      FROM
        ${data.tableName};
    `;
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
            onClick={() => {
              alert(`table_name: "can_ecommerce_orders"
          column_name: "abi_brand"
          Operator: "LIKE"
          Values: "%2021 BL LIFESTYLE APPAREL %"
          Output_value: "'Bud Light - PIN'"`);
            }}
          >
            {editingIndex === -1 ? 'Quicly TIP' : 'Quicly TIP'}
          </Button>



          <br />

          <Button
            color="warning"
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

                  <form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={3}>

                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Table Name</InputLabel>
                            <Select
                              label="Table Name"
                              name="tableName"
                              onChange={handleChange}
                              value={formData.tableName}
                              variant="outlined"
                            >
                              <MenuItem value={"can_ecommerce_orders"}>can_ecommerce_orders</MenuItem>
                              <MenuItem value={"can_file_uploads"}>can_file_uploads</MenuItem>
                              <MenuItem value={"can_page_clicks"}>can_page_clicks</MenuItem>
                              <MenuItem value={"can_page_views"}>can_page_views</MenuItem>
                              <MenuItem value={"can_sfmc_customers"}>can_sfmc_customers</MenuItem>
                              <MenuItem value={"can_wayin"}>can_wayin</MenuItem>
                              <MenuItem value={"can_web_form"}>can_web_form</MenuItem>
                              <MenuItem value={"can_fandom_app"}>can_fandom_app</MenuItem>
                              <MenuItem value={"can_mobile_form"}>can_mobile_form</MenuItem>
                              <MenuItem value={"can_sfsc_contacts"}>can_sfsc_contacts</MenuItem>
                              <MenuItem value={"can_facebook_ads"}>can_facebook_ads</MenuItem>
                              <MenuItem value={"can_additional_column_1"}>can_additional_column_1</MenuItem>
                              <MenuItem value={"can_additional_column_2"}>can_additional_column_2</MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Collun_Name</InputLabel>
                            <Select
                              label="Collun Name"
                              name="columnName"
                              onChange={handleChange}
                              value={formData.columnName}
                              variant="outlined"
                            >
                              <MenuItem value={"abi_brand"}>abi_brand</MenuItem>
                              <MenuItem value={"abi_province"}>abi_province</MenuItem>
                              <MenuItem value={"abi_interests"}>abi_interests</MenuItem>
                              <MenuItem value={"abi_campaign"}>abi_campaign</MenuItem>
                            </Select>
                          </FormControl>

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
                            label="Condition Value"
                            name="conditionValues"
                            onChange={handleChange}
                            value={formData.conditionValues}
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

                          <TextField
                            fullWidth
                            label="Priority (optional)"
                            name="priority"
                            onChange={handleChange}
                            value={formData.priority}
                            variant="outlined"
                            type="number"
                          />

                        </Stack>
                      </Grid>
                    </Grid>
                  </form>

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
                        <TableCell>Table Name</TableCell>
                        <TableCell>Collun Name</TableCell>
                        <TableCell>Operator</TableCell>
                        <TableCell>Condition Values</TableCell>
                        <TableCell>Output Value</TableCell>
                        <TableCell>Priority</TableCell>
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
                          <TableCell>{data.tableName}</TableCell>
                          <TableCell>{data.columnName}</TableCell>
                          <TableCell>{data.operator}</TableCell>
                          <TableCell>{data.conditionValues}</TableCell>
                          <TableCell>{data.outputValue}</TableCell>
                          <TableCell>{data.priority}</TableCell>
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
              SQL Simulation - Copy and Test in TD
            </Typography>
            <br />
            <Typography variant="body2" id="modal-description" sx={{ marginBottom: '16px' }}>
              {sqlSimulation}
            </Typography>
            <br />
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

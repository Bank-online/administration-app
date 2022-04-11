import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MoreIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import {
  TextField,
  ListItem,
  Grid,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Dialog,
  Slide,
  CircularProgress,
  CloseIcon,
  IconButton,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AccountHelper from '../../../helpers/AccountHelper';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanelVerticale(props) {
  const { children, value, section, ...other } = props;

  return (
    <div
      role="TabPanelVerticale"
      hidden={value !== section}
      id={`vertical-tabpanel-${section}`}
      aria-labelledby={`vertical-tab-${section}`}
      {...other}
    >
      {value === section && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanelVerticale.propTypes = {
  children: PropTypes.node,
  section: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProp(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const columns = [
  { id: 'date', label: 'Date', minWidth: 180 },
  { id: 'label', label: 'Operation', minWidth: 300 },

  {
    id: 'debit',
    label: 'Débit (fc)',
    minWidth: 110,
    align: 'right',
    format: 1,
  },
  {
    id: 'credit',
    label: 'Crédit (fc)',
    minWidth: 110,
    align: 'right',
    format: 1,
  },
];

function createData(date, label, credit, debit) {
  return { date, label, credit, debit };
}

export default function VerticalTabs(props) {
  const { modal, setModal } = props;
  const [value, setValue] = React.useState(0);
  const [valueVertical, setValueVertical] = React.useState(0);
  const theme = useTheme();
  const handleChangeVertical = (event, newValue) => {
    setValueVertical(newValue);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  /**
   * historique operation
   */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (modal) {
      AccountHelper.service
        .getAccount(props.account.uuid)
        .then(({ data }) => {
          let row = [];

          data.operation.map((value, index) => {
            var today = new Date(value.createdAt);
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            row.push(
              createData(
                today,
                value.label,
                value.type == 'credit' ? value.amount : '',
                value.type == 'debit' ? value.amount : ''
              )
            );
          });

          setRows(row);
        })
        .catch((e) => console.log(e));
    }
  }, [modal]);

  return (
    <BootstrapDialog
      maxWidth={'md'}
      aria-labelledby="customized-dialog-title"
      open={modal}
      onClose={() => {
        setModal(false);
      }}
    >
      <DialogContent
        dividers
        style={{
          widthMin: '750px',
          padding: 0,
          height: '600px',
          width: '900px',
        }}
      >
        <Grid container style={{ p: 0 }}>
          <Box sx={{ bgcolor: 'primary', width: '100%' }}>
            <AppBar position="static" color="primary">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="historique " {...a11yProps(0)} />
                <Tab label="carte" {...a11yProps(1)} />
                <Tab label="gestionnaire" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Box
                  sx={{
                    bgcolor: 'primary',
                    display: 'flex',
                    height: '100%',
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    value={valueVertical}
                    onChange={handleChangeVertical}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                  >
                    <Tab label="Opération" {...a11yProp(0)} />
                    <Tab label="Virement" {...a11yProp(1)} />
                    <Tab label="Prélèvement" {...a11yProp(2)} />
                    <Tab label="a venir" {...a11yProp(2)} />
                  </Tabs>
                  <TabPanelVerticale
                    sx={{ p: 0 }}
                    value={valueVertical}
                    section={0}
                  >
                    <Paper sx={{ width: '100%' }}>
                      <TableContainer
                        sx={{ maxHeight: 445, height: 437, width: '100%' }}
                      >
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row) => {
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                  >
                                    {columns.map((column) => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                          style={{
                                            color:
                                              column.id == 'credit' ||
                                              column.id == 'debit'
                                                ? column.id == 'credit'
                                                  ? 'green'
                                                  : 'red '
                                                : null,
                                            fontSize:
                                              column.id == 'credit' ||
                                              column.id == 'debit'
                                                ? column.id == 'credit'
                                                  ? '1.1em'
                                                  : '1.1em'
                                                : null,
                                          }}
                                        >
                                          {column.format &&
                                          typeof value === 'number'
                                            ? column.id == 'credit'
                                              ? '+ ' + value
                                              : column.id == 'debit' && value
                                            : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </TabPanelVerticale>
                  <TabPanelVerticale value={valueVertical} section={1}>
                    Item Two
                  </TabPanelVerticale>
                  <TabPanelVerticale value={valueVertical} section={2}>
                    Item Three
                  </TabPanelVerticale>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
              </TabPanel>
              <Tab icon={<MoreIcon />} aria-label="person" />
            </SwipeableViews>
          </Box>
        </Grid>
      </DialogContent>
      {/* <DialogActions>
        <Button style={{ color: 'red' }} onClick={}></Button>

        <Button variant="contained"></Button>
      </DialogActions> */}
    </BootstrapDialog>
  );
}

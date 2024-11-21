import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const guruData = [
    { id: 1, name: "Bpk. Mustabahar", subject: "Bahasa Inggris" },
    { id: 2, name: "Bpk. Ali Musarof", subject: "Program Keahlian" },
    { id: 3, name: "Bpk. Rian", subject: "PPKN" },
  ];

  const siswaData = [
    { id: 1, name: "Agus", grade: "TKJ" },
    { id: 2, name: "Faik", grade: "TKR" },
    { id: 3, name: "Dioz", grade: "TB" },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: "#f4f6f9" }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#3F51B5",
          textAlign: "center",
          marginBottom: 4,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Selamat Datang di Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container justifyContent="center" spacing={3}>
        {/* Guru Card */}
        <Grid item xs={12} sm={6} md={5}>
          <Card
            sx={{
              backgroundColor: "#5C6BC0",
              color: "#fff",
              boxShadow: 4,
              borderRadius: 2,
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 8,
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                <SchoolIcon sx={{ marginRight: 1 }} /> Guru
              </Typography>
              <Button
                component={Link}
                to="/TabelGuru"
                fullWidth
                sx={{
                  color: "#fff",
                  backgroundColor: "#3949AB",
                  "&:hover": { backgroundColor: "#303F9F" },
                  borderRadius: 2,
                  padding: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Siswa Card */}
        <Grid item xs={12} sm={6} md={5}>
          <Card
            sx={{
              backgroundColor: "#66BB6A",
              color: "#fff",
              boxShadow: 4,
              borderRadius: 2,
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 8,
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                <GroupIcon sx={{ marginRight: 1 }} /> Siswa
              </Typography>
              <Button
                component={Link}
                to="/TabelSiswa"
                fullWidth
                sx={{
                  color: "#fff",
                  backgroundColor: "#43A047",
                  "&:hover": { backgroundColor: "#2E7D32" },
                  borderRadius: 2,
                  padding: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Guru Table */}
      <Box sx={{ marginTop: 5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#3F51B5",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          Daftar Guru
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 4,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#E8EAF6",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3949AB",
                    color: "#fff",
                    textAlign: "center",
                    padding: "14px",
                    fontSize: "1rem",
                  }}
                >
                  Nama Guru
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3949AB",
                    color: "#fff",
                    textAlign: "center",
                    padding: "14px",
                    fontSize: "1rem",
                  }}
                >
                  Mata Pelajaran
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guruData.map((guru) => (
                <TableRow key={guru.id}>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                    {guru.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                    {guru.subject}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Siswa Table */}
      <Box sx={{ marginTop: 5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#3F51B5",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          Daftar Siswa
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 4,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#E8F5E9",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#43A047",
                    color: "#fff",
                    textAlign: "center",
                    padding: "14px",
                    fontSize: "1rem",
                  }}
                >
                  Nama Siswa
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#43A047",
                    color: "#fff",
                    textAlign: "center",
                    padding: "14px",
                    fontSize: "1rem",
                  }}
                >
                  Kelas
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswaData.map((siswa) => (
                <TableRow key={siswa.id}>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                    {siswa.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                    {siswa.grade}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;

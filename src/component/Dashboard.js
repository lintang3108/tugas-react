import React, { useState, useEffect } from "react";
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
import axios from "axios";

const Dashboard = () => {
  // State untuk menyimpan data guru dan siswa
  const [guruData, setGuruData] = useState([]);
  const [siswaData, setSiswaData] = useState([]);
  const [loadingGuru, setLoadingGuru] = useState(true);
  const [loadingSiswa, setLoadingSiswa] = useState(true);

  // Fetch data guru dari API
  useEffect(() => {
    axios
      .get("http://localhost:3030/gurus") // Ganti dengan URL API yang sesuai
      .then((response) => {
        setGuruData(response.data);
        setLoadingGuru(false);
      })
      .catch((error) => {
        console.error("Error fetching guru data:", error);
        setLoadingGuru(false);
      });
  }, []);

  // Fetch data siswa dari API
  useEffect(() => {
    axios
      .get("http://localhost:3030/siswas") // Ganti dengan URL API yang sesuai
      .then((response) => {
        setSiswaData(response.data);
        setLoadingSiswa(false);
      })
      .catch((error) => {
        console.error("Error fetching siswa data:", error);
        setLoadingSiswa(false);
      });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
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
      <Grid container justifyContent="center" spacing={2}>
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
                  }}
                >
                  Mata Pelajaran
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingGuru ? (
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : guruData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                    Tidak ada data guru.
                  </TableCell>
                </TableRow>
              ) : (
                guruData.map((guru) => (
                  <TableRow key={guru.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {guru.nama}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {guru.mapel}
                    </TableCell>
                  </TableRow>
                ))
              )}
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
                  }}
                >
                  Kelas
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingSiswa ? (
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : siswaData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                    Tidak ada data siswa.
                  </TableCell>
                </TableRow>
              ) : (
                siswaData.map((siswa) => (
                  <TableRow key={siswa.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {siswa.nama}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {siswa.kelas}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;

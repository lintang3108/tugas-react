import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
  // Sample data for Guru and Siswa
  const guruData = [
    { id: 1, name: "Bpk. Mustabahar", subject: "Bahasa Inggris" },
    { id: 2, name: "Bpk. Ali Musarof", subject: "Progam Keahlian" },
    { id: 3, name: "Bpk. Rian", subject: "PPKN" },
  ];

  const siswaData = [
    { id: 1, name: "Agus", grade: "A" },
    { id: 2, name: "Faik", grade: "B" },
    { id: 3, name: "Dioz", grade: "A" },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#283593" }}
      ></Typography>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {/* Guru Data Summary */}
        <Grid item xs={12} sm={6} md={5}>
          <Card
            sx={{
              backgroundColor: "#5C6BC0", // Soft blue shade
              color: "#fff",
              boxShadow: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ display: "flex", alignItems: "center", mb: 3 }}
              >
                <SchoolIcon sx={{ marginRight: 1 }} />
                Guru
              </Typography>

              <Button
                component={Link}
                to="/Tabel"
                sx={{
                  color: "#fff",
                  backgroundColor: "#3F51B5", // Slightly darker blue
                  borderRadius: 2,
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#303F9F", // Darker blue
                  },
                  padding: "12px",
                }}
              >
                Detail
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Siswa Data Summary */}
        <Grid item xs={12} sm={6} md={5}>
          <Card
            sx={{
              backgroundColor: "#81C784", // Fresh green shade
              color: "#fff",
              boxShadow: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ display: "flex", alignItems: "center", mb: 3 }}
              >
                <GroupIcon sx={{ marginRight: 1 }} />
                Siswa
              </Typography>

              <Button
                component={Link}
                to="/Siswa"
                sx={{
                  color: "#fff",
                  backgroundColor: "#66BB6A", // Lighter green
                  borderRadius: 2,
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#388E3C", // Darker green
                  },
                  padding: "12px",
                }}
              >
                Detail
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Guru Table Section */}
      <Box sx={{ marginTop: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#283593", // Matching navbar blue
            marginBottom: 2,
          }}
        >
          Guru List
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 5,
            borderRadius: 3,
            marginTop: 2,
            overflow: "hidden",
            backgroundColor: "#E8EAF6", // Lighter blue background
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3F51B5", // Matching navbar blue
                    color: "#fff",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Nama
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3F51B5",
                    color: "#fff",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Mata Pelajaran
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guruData.map((guru) => (
                <TableRow
                  key={guru.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#E8EAF6", // Highlight row on hover
                    },
                  }}
                >
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

      {/* Siswa Table Section */}
      <Box sx={{ marginTop: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#283593", // Consistent title color
            marginBottom: 2,
          }}
        >
          Siswa List
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 5,
            borderRadius: 3,
            marginTop: 2,
            overflow: "hidden",
            backgroundColor: "#E8F5E9", // Light green background
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#66BB6A", // Lighter green header
                    color: "#fff",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Nama
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#66BB6A",
                    color: "#fff",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Kelas
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswaData.map((siswa) => (
                <TableRow
                  key={siswa.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#E8F5E9", // Highlight row on hover
                    },
                  }}
                >
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

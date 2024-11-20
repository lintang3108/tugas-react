import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(90deg, #1A237E 0%, #673AB7 100%)",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#424242",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#f7f7f9",
  },
  "&:hover": {
    backgroundColor: "#E3F2FD",
    transition: "background-color 0.3s ease",
  },
}));

export default function Guru() {
  const [gurus, setGurus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGurus();
  }, []);

  const fetchGurus = () => {
    axios
      .get("http://localhost:3030/gurus")
      .then((response) => {
        setGurus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/gurus/${id}`)
          .then(() => {
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
            fetchGurus(); // Refresh data setelah penghapusan
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Gagal!", "Data tidak berhasil dihapus.", "error");
          });
      }
    });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#EDE7F6", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          color: "primary.main",
          fontWeight: "bold",
          fontFamily: "Poppins",
          background: "linear-gradient(90deg, #1A237E, #673AB7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Daftar Guru
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/tambah_guru")}
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1A237E, #673AB7)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(90deg, #3F51B5, #9575CD)",
            },
          }}
        >
          Tambah Guru
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={6}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Nama Guru</StyledTableCell>
              <StyledTableCell align="center">Mata Pelajaran</StyledTableCell>
              <StyledTableCell align="center">NIK</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Jabatan</StyledTableCell>
              <StyledTableCell align="center">Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gurus.map((guru, index) => (
              <StyledTableRow key={guru.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{guru.nama}</StyledTableCell>
                <StyledTableCell align="center">{guru.mapel}</StyledTableCell>
                <StyledTableCell align="center">{guru.nik}</StyledTableCell>
                <StyledTableCell align="center">{guru.gender}</StyledTableCell>
                <StyledTableCell align="center">{guru.jabatan}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/ubah_guru/${guru.id}`)}
                    sx={{
                      fontWeight: "bold",
                      mr: 1,
                      backgroundColor: "#FFD54F",
                      color: "#424242",
                      "&:hover": { backgroundColor: "#FFC107" },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(guru.id)}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#D32F2F",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#C62828" },
                    }}
                  >
                    Hapus
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

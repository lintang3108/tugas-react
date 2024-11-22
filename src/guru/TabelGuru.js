import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell"; // Tambahkan ini
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";

// Styled TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3F51B5",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#424242",
  },
}));

// Styled TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#f8f9fa",
  },
  "&:hover": {
    backgroundColor: "#E8EAF6",
    transition: "background-color 0.3s ease",
  },
}));

// Komponen Utama
export default function Guru() {
  const [gurus, setGurus] = useState([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

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
            fetchGurus();
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
        variant={isMobile ? "h5" : "h4"}
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "#283593",
        }}
      >
        Daftar Guru
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          mb: 3,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/Tambah_guru")}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#5C6BC0",
            color: "#fff",
            "&:hover": { backgroundColor: "#3F51B5" },
            mb: isMobile ? 2 : 0,
          }}
        >
          Tambah Guru
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 700, width: "100%" }}>
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
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{guru.nama}</StyledTableCell>
                <StyledTableCell align="center">{guru.mapel}</StyledTableCell>
                <StyledTableCell align="center">{guru.nik}</StyledTableCell>
                <StyledTableCell align="center">{guru.gender}</StyledTableCell>
                <StyledTableCell align="center">{guru.jabatan}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/Ubah_guru/${guru.id}`)}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#FFB74D",
                      color: "#fff",
                      mr: 1,
                      "&:hover": { backgroundColor: "#FFA726" },
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
                      backgroundColor: "#E53935",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#D32F2F" },
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

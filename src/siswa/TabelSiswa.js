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
    backgroundColor: "#388E3C", // Hijau utama
    color: theme.palette.common.white, // Warna teks tetap putih
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#2E7D32", // Warna teks isi tabel hijau gelap
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#E8F5E9", // Hijau terang
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F1F8E9", // Hijau lebih terang
  },
  "&:hover": {
    backgroundColor: "#C8E6C9", // Highlight hijau terang saat di-hover
    transition: "background-color 0.3s ease",
  },
}));

export default function Siswa() {
  const [siswas, setSiswas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSiswas();
  }, []);

  const fetchSiswas = () => {
    axios
      .get("http://localhost:3030/siswas")
      .then((response) => {
        setSiswas(response.data);
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
      confirmButtonColor: "#D32F2F",
      cancelButtonColor: "#388E3C",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/siswas/${id}`)
          .then(() => {
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
            fetchSiswas(); // Refresh data setelah penghapusan
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Gagal!", "Data tidak berhasil dihapus.", "error");
          });
      }
    });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#E8F5E9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",

          background: "linear-gradient(90deg, #1B5E20, #4CAF50)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Daftar Siswa
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/Tambah_siswa")}
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1B5E20, #4CAF50)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(90deg, #388E3C, #81C784)",
            },
          }}
        >
          Tambah Siswa
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={6}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Nama Siswa</StyledTableCell>
              <StyledTableCell align="center">Kelas</StyledTableCell>
              <StyledTableCell align="center">Jurusan</StyledTableCell>
              <StyledTableCell align="center">NISN</StyledTableCell>
              <StyledTableCell align="center">Asal Sekolah</StyledTableCell>
              <StyledTableCell align="center">Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siswas.map((siswa, index) => (
              <StyledTableRow key={siswa.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{siswa.nama}</StyledTableCell>
                <StyledTableCell align="center">{siswa.kelas}</StyledTableCell>
                <StyledTableCell align="center">
                  {siswa.jurusan}
                </StyledTableCell>
                <StyledTableCell align="center">{siswa.nisn}</StyledTableCell>
                <StyledTableCell align="center">
                  {siswa.asalSekolah}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/Ubah_siswa/${siswa.id}`)}
                    sx={{
                      fontWeight: "bold",
                      mr: 1,
                      backgroundColor: "#FFB74D",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#FFA726" },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(siswa.id)}
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

import React, { useState, useEffect } from "react"; // Impor React dan hooks
import axios from "axios"; // Impor axios
import { styled } from "@mui/material/styles"; // Impor styled untuk custom table cell
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
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material"; // Impor komponen Material UI
import { tableCellClasses } from "@mui/material/TableCell"; // Impor tableCellClasses untuk styling
import Swal from "sweetalert2"; // Impor SweetAlert2
import { useNavigate } from "react-router-dom"; // Impor useNavigate untuk navigasi
import SearchIcon from "@mui/icons-material/Search"; // Impor icon pencarian

// Styled TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3949AB",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#424242",
    textAlign: "center",
  },
}));

// Styled TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F4F6F8",
  },
  "&:hover": {
    backgroundColor: "#E8EAF6",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
}));

// Komponen Utama
export default function Guru() {
  const [gurus, setGurus] = useState([]);
  const [filteredGurus, setFilteredGurus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGurus();
  }, []);

  const fetchGurus = () => {
    setLoading(true);
    axios
      .get("http://localhost:3030/gurus")
      .then((response) => {
        setGurus(response.data);
        setFilteredGurus(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = gurus.filter(
      (guru) =>
        guru.nama.toLowerCase().includes(value) ||
        guru.mapel.toLowerCase().includes(value) ||
        guru.nik.toString().includes(value) ||
        guru.jabatan.toLowerCase().includes(value)
    );
    setFilteredGurus(filtered);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#EDE7F6", minHeight: "100vh" }}>
      {/* Judul Halaman */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#283593",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Daftar Guru
      </Typography>

      {/* Search dan Tombol Tambah */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* Tombol Tambah Guru */}
        <Button
          variant="contained"
          onClick={() => navigate("/Tambah_guru")}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#5C6BC0",
            color: "#fff",
            borderRadius: 2,
            px: 3,
            "&:hover": { backgroundColor: "#3949AB" },
          }}
        >
          Tambah Guru
        </Button>

        {/* Input Pencarian */}
        <TextField
          label="Cari Guru"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: "300px",
            borderRadius: "50px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
            "& .MuiOutlinedInput-input": {
              paddingLeft: "30px",
            },
            "& .MuiInputAdornment-root": {
              marginLeft: "-10px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#3949AB" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Loading Spinner */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredGurus.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            color: "#757575",
            fontStyle: "italic",
            mt: 4,
          }}
        >
          Tidak ada data yang sesuai.
        </Typography>
      ) : (
        // Tabel Guru
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: 6,
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 700, width: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Nama Guru</StyledTableCell>
                <StyledTableCell>Mata Pelajaran</StyledTableCell>
                <StyledTableCell>NIK</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Jabatan</StyledTableCell>
                <StyledTableCell>Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGurus.map((guru, index) => (
                <StyledTableRow key={guru.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{guru.nama}</StyledTableCell>
                  <StyledTableCell>{guru.mapel}</StyledTableCell>
                  <StyledTableCell>{guru.nik}</StyledTableCell>
                  <StyledTableCell>{guru.gender}</StyledTableCell>
                  <StyledTableCell>{guru.jabatan}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/Ubah_guru/${guru.id}`)}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#FFB74D",
                        color: "#fff",
                        mr: 1,
                        borderRadius: 2,
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
                        borderRadius: 2,
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
      )}
    </Box>
  );
}

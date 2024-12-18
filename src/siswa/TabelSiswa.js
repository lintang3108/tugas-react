import React, { useEffect, useState } from "react";
import axios from "axios";
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
  CircularProgress,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { tableCellClasses } from "@mui/material/TableCell";
import SearchIcon from "@mui/icons-material/Search";

// Styled TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#388E3C",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#2E7D32",
  },
}));

// Styled TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#E8F5E9",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F1F8E9",
  },
  "&:hover": {
    backgroundColor: "#C8E6C9",
    transition: "background-color 0.3s ease",
  },
}));

export default function Siswa() {
  const [siswas, setSiswas] = useState([]);
  const [filteredSiswas, setFilteredSiswas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchSiswas();
  }, []);

  const fetchSiswas = () => {
    setLoading(true);
    axios
      .get("http://localhost:3030/siswas")
      .then((response) => {
        setSiswas(response.data);
        setFilteredSiswas(response.data);
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

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = siswas.filter(
      (siswa) =>
        siswa.nama.toLowerCase().includes(value) ||
        siswa.kelas.toLowerCase().includes(value) ||
        siswa.jurusan.toLowerCase().includes(value) ||
        siswa.nisn.toString().includes(value)
    );
    setFilteredSiswas(filtered);
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        backgroundColor: "#E8F5E9",
        minHeight: "100vh",
      }}
    >
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

      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}
      >
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

        <TextField
          label="Cari Siswa"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: isMobile ? "100%" : "300px",
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
                <SearchIcon sx={{ color: "#388E3C" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredSiswas.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            color: "#757575",
            fontWeight: "bold",
            mt: 4,
            fontSize: "1.2rem",
          }}
        >
          Tidak ada data siswa yang sesuai dengan pencarian.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={6}
          sx={{
            borderRadius: 3,
            overflowX: "auto",
          }}
        >
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
              {filteredSiswas.map((siswa, index) => (
                <StyledTableRow key={siswa.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{siswa.nama}</StyledTableCell>
                  <StyledTableCell align="center">
                    {siswa.kelas}
                  </StyledTableCell>
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
      )}
    </Box>
  );
}

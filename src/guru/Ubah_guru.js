import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import Swal from "sweetalert2";

export default function EditGuru() {
  const { id } = useParams(); // Ambil ID dari parameter URL
  const navigate = useNavigate();

  const [guru, setGuru] = useState({
    nama: "",
    mapel: "",
    nik: "",
    gender: "",
    jabatan: "",
  });

  // Deteksi layar kecil
  const isMobile = useMediaQuery("(max-width:600px)");

  // Ambil data guru berdasarkan ID
  useEffect(() => {
    fetchGuruById();
  }, []);

  const fetchGuruById = () => {
    axios
      .get(`http://localhost:3030/gurus/${id}`)
      .then((response) => {
        const data = response.data;
        setGuru({
          nama: data.nama,
          mapel: data.mapel,
          nik: data.nik,
          gender: data.gender,
          jabatan: data.jabatan,
        });
      })
      .catch((error) => {
        console.error("Error fetching guru data:", error);
        Swal.fire("Gagal!", "Data guru tidak ditemukan.", "error").then(
          () => navigate("/TabelGuru") // Kembali ke tabel guru jika gagal
        );
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuru({ ...guru, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3030/gurus/${id}`, guru)
      .then(() => {
        Swal.fire(
          "Berhasil!",
          "Data guru berhasil diperbarui.",
          "success"
        ).then(() => navigate("/TabelGuru")); // Kembali ke tabel guru setelah sukses
      })
      .catch((error) => {
        console.error("Error updating guru data:", error);
        Swal.fire("Gagal!", "Data guru tidak berhasil diperbarui.", "error");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #283593, #7E57C2)",
        padding: isMobile ? 2 : 3, // Padding berbeda untuk layar kecil
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: isMobile ? 3 : 4, // Padding menyesuaikan ukuran layar
          width: "100%",
          maxWidth: isMobile ? "360px" : "420px", // Lebar maksimum dinamis
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            color: "#512DA8",
            mb: isMobile ? 2 : 3, // Margin bawah berubah di layar kecil
          }}
        >
          Edit Data Guru
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Guru"
            variant="outlined"
            fullWidth
            name="nama"
            value={guru.nama}
            onChange={handleInputChange}
            sx={{ mb: isMobile ? 1.5 : 2 }} // Margin bawah dinamis
            required
          />
          <TextField
            label="Mata Pelajaran"
            variant="outlined"
            fullWidth
            name="mapel"
            value={guru.mapel}
            onChange={handleInputChange}
            sx={{ mb: isMobile ? 1.5 : 2 }}
            required
          />
          <TextField
            label="NIK"
            variant="outlined"
            fullWidth
            name="nik"
            type="number"
            value={guru.nik}
            onChange={handleInputChange}
            sx={{ mb: isMobile ? 1.5 : 2 }}
            required
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            name="gender"
            value={guru.gender}
            onChange={handleInputChange}
            sx={{ mb: isMobile ? 1.5 : 2 }}
            required
          />
          <TextField
            label="Jabatan"
            variant="outlined"
            fullWidth
            name="jabatan"
            value={guru.jabatan}
            onChange={handleInputChange}
            sx={{ mb: isMobile ? 2 : 3 }}
            required
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row", // Vertikal di layar kecil
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/TabelGuru")}
              sx={{
                flex: 1,
                background: "#EF5350",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#D32F2F" },
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                flex: 1,
                background: "linear-gradient(90deg, #7E57C2, #673AB7)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  background: "linear-gradient(90deg, #673AB7, #512DA8)",
                },
              }}
            >
              Simpan
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

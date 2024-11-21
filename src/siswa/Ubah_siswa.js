import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function UbahSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState({
    nama: "",
    kelas: "",
    jurusan: "",
    nisn: "",
    asalSekolah: "",
  });

  useEffect(() => {
    // Fetch data siswa berdasarkan id
    axios
      .get(`http://localhost:3030/siswas/${id}`)
      .then((response) => {
        setSiswa(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        Swal.fire("Error!", "Data siswa tidak ditemukan!", "error");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiswa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !siswa.nama ||
      !siswa.kelas ||
      !siswa.jurusan ||
      !siswa.nisn ||
      !siswa.asalSekolah
    ) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      await axios.put(`http://localhost:3030/siswas/${id}`, siswa);
      Swal.fire("Berhasil!", "Data siswa berhasil diperbarui.", "success");
      navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
      Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat memperbarui data siswa.",
        "error"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #388E3C, #81C784)",
        padding: 3,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          width: "90%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            color: "#388E3C",
          }}
        >
          Edit Siswa
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Murid"
            variant="outlined"
            fullWidth
            value={siswa.nama}
            onChange={handleChange}
            name="nama"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Kelas"
            variant="outlined"
            fullWidth
            value={siswa.kelas}
            onChange={handleChange}
            name="kelas"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Jurusan"
            variant="outlined"
            fullWidth
            value={siswa.jurusan}
            onChange={handleChange}
            name="jurusan"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="NISN"
            variant="outlined"
            fullWidth
            type="number"
            value={siswa.nisn}
            onChange={handleChange}
            name="nisn"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Asal Sekolah"
            variant="outlined"
            fullWidth
            value={siswa.asalSekolah}
            onChange={handleChange}
            name="asalSekolah"
            sx={{ marginBottom: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 3,
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                flex: 1,
                background: "#E53935", // Merah untuk tombol batal
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#D32F2F",
                },
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                flex: 1,
                background: "linear-gradient(45deg, #66BB6A, #388E3C)", // Hijau untuk tombol simpan
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  background: "linear-gradient(45deg, #388E3C, #2C6B29)",
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

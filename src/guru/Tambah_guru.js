import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import { useMediaQuery } from "@mui/material";

export default function TambahGuru() {
  const [namaGuru, setNamaGuru] = useState("");
  const [mapel, setMapel] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [jabatan, setJabatan] = useState("");
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaGuru || !mapel || !nik || !gender || !jabatan) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3030/gurus");
      const teachers = response.data;

      const lastId =
        teachers.length > 0
          ? Math.max(...teachers.map((teacher) => parseInt(teacher.id)))
          : 0;

      const newTeacher = {
        id: (lastId + 1).toString(),
        no: lastId + 1,
        nama: namaGuru,
        mapel,
        nik,
        gender,
        jabatan,
      };

      await axios.post("http://localhost:3030/gurus", newTeacher);

      Swal.fire("Berhasil!", "Guru berhasil ditambahkan.", "success");

      // Navigasi otomatis ke halaman daftar guru
      navigate("/TabelGuru", { replace: true });
    } catch (error) {
      console.error("Error adding teacher:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan guru.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #5C6BC0, #7986CB)",
        padding: isMobile ? 2 : 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: isMobile ? 3 : 4,
          width: "100%",
          maxWidth: isMobile ? "360px" : "420px",
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
            color: "#283593",
            mb: isMobile ? 2 : 3,
          }}
        >
          Tambah Guru
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Guru"
            variant="outlined"
            fullWidth
            value={namaGuru}
            onChange={(e) => setNamaGuru(e.target.value)}
            sx={{ mb: isMobile ? 1.5 : 2 }}
          />
          <TextField
            label="Mata Pelajaran"
            variant="outlined"
            fullWidth
            value={mapel}
            onChange={(e) => setMapel(e.target.value)}
            sx={{ mb: isMobile ? 1.5 : 2 }}
          />
          <TextField
            label="NIK"
            variant="outlined"
            fullWidth
            type="number"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            sx={{ mb: isMobile ? 1.5 : 2 }}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            sx={{ mb: isMobile ? 1.5 : 2 }}
          />
          <TextField
            label="Jabatan"
            variant="outlined"
            fullWidth
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            sx={{ mb: isMobile ? 2 : 3 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
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
                background: "linear-gradient(90deg, #42A5F5, #1E88E5)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  background: "linear-gradient(90deg, #1E88E5, #1976D2)",
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

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

export default function TambahSiswa() {
  const [namaMurid, setNamaMurid] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [nisn, setNisn] = useState("");
  const [asalSekolah, setAsalSekolah] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!namaMurid || !kelas || !jurusan || !nisn || !asalSekolah) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    // Checking NISN uniqueness
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3030/siswas");
      const students = response.data;
      const nisnExists = students.some((student) => student.nisn === nisn);

      if (nisnExists) {
        Swal.fire("Gagal!", "NISN sudah terdaftar!", "error");
        setLoading(false);
        return;
      }

      const lastId =
        students.length > 0
          ? Math.max(...students.map((student) => parseInt(student.id)))
          : 0;

      const newStudent = {
        id: (lastId + 1).toString(),
        no: lastId + 1,
        nama: namaMurid,
        kelas,
        jurusan,
        nisn,
        asalSekolah,
      };

      await axios.post("http://localhost:3030/siswas", newStudent);

      Swal.fire("Berhasil!", "Siswa berhasil ditambahkan.", "success");
      navigate("/", {
        state: { refresh: true, asalSekolah: newStudent.asalSekolah },
      });
    } catch (error) {
      console.error("Error adding student:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan siswa.", "error");
    } finally {
      setLoading(false); // Reset loading state
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
          Tambah Siswa
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Murid"
            variant="outlined"
            fullWidth
            value={namaMurid}
            onChange={(e) => setNamaMurid(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Kelas"
            variant="outlined"
            fullWidth
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Jurusan"
            variant="outlined"
            fullWidth
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="NISN"
            variant="outlined"
            fullWidth
            type="number"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Asal Sekolah"
            variant="outlined"
            fullWidth
            value={asalSekolah}
            onChange={(e) => setAsalSekolah(e.target.value)}
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
                backgroundColor: "#E53935", // Merah untuk tombol batal
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
              disabled={loading}
              sx={{
                flex: 1,
                background: "linear-gradient(45deg, #66BB6A, #388E3C)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  background: "linear-gradient(45deg, #388E3C, #2C6B29)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Simpan"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

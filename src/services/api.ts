import type { MahasiswaType } from '@/types/mahasiswa'; // Sesuaikan path
import type { MatakuliahType } from '@/types/matakuliah'; // Sesuaikan path
import axios from 'axios';

// Ganti URL base sesuai dengan lokasi backend kamu
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// === MAHASISWA ENDPOINT ===
export const getMahasiswa = () =>
  api.get<MahasiswaType[]>('/mahasiswa');

export const getMahasiswaByNim = (nim: string) =>
  api.get<MahasiswaType>(`/mahasiswa/${nim}`);

export const createMahasiswa = (data: MahasiswaType) =>
  api.post('/mahasiswa', data);

export const updateMahasiswa = (nim: string, data: MahasiswaType) =>
  api.put(`/mahasiswa/${nim}`, data);

export const deleteMahasiswa = (nim: string) =>
  api.delete(`/mahasiswa/${nim}`);

// === MATAKULIAH ENDPOINT ===
export const getMatakuliah = () =>
  api.get<MatakuliahType[]>('/matakuliah');

export const getMatakuliahByKode = (kode: string) =>
  api.get<MatakuliahType>(`/matakuliah/${kode}`);

export const createMatakuliah = (data: MatakuliahType) =>
  api.post('/matakuliah', data);

export const updateMatakuliah = (kode: string, data: MatakuliahType) =>
  api.put(`/matakuliah/${kode}`, data);

export const deleteMatakuliah = (kode: string) =>
  api.delete(`/matakuliah/${kode}`);

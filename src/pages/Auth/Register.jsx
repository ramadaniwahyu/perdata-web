import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfileImageSelector from '../../components/inputs/ProfileImageSelector';
import Input from '../../components/inputs/Input';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileImage, setProfileImage] = useState(null)

  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Silakan masukkan nama anda.")
      return;
    }

    if (!validateEmail(email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    if (!password) {
      setError("Silakan input kata sandi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Kata sandi anda tidak sesuai")
      return;
    }

    setError("")
    // Register API Call
  }
  return (
    <AuthLayout>
      <div className='lg:w-[90%] h3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl text-semibold text-black'>Buat Akun Anda</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Registrasikan diri anda untuk menggunakan aplikasi ini.
        </p>

        <form onSubmit={handleRegister}>
          <ProfileImageSelector image={profileImage} setImage={setProfileImage} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              label="Nama Pengguna"
              placeholder="Masukkan nama lengkap anda"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Alamat email"
              placeholder="Misal: pengguna@email.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Kata Sandi"
              placeholder="Masukkan sandi anda"
              type="password"
            />
            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Konfirmasi Kata Sandi"
              placeholder="Masukkan kembali kata sandi anda"
              type="password"
            />
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>REGISTER</button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Sudah punya akun? {" "}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Register
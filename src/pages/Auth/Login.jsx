import React, {useContext, useState} from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)){
      setError("Masukkan alamat email yang valid.");
      return;
    }

    if (!password){
      setError("Silakan input password.");
      return;
    }

    setError("")

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password
      });
      const {token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setError(error.response.data.msg)
      } else {
        console.log(error)
        setError("Something went error. Try again later.")
      }
    }
  }
  
  return (
    <AuthLayout>
      <div className='lg:w-[90%] h3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl text-semibold text-black'>Selamat Datang Kembali</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Silakan masukkan detail anda untuk melanjutkan
        </p>

        <form onSubmit={handleLogin}>
          <Input 
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Alamat email"
          placeholder="pengguna@email.com"
          type="text"
          />
          <Input 
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Kata Sandi"
          placeholder="Masukkan sandi anda"
          type="password"
          />

          { error&& <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Tidak punya akun? {" "}
            <Link className='font-medium text-primary underline' to='/register'>
            Register
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
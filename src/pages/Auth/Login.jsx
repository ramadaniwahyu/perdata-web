import React, {useState} from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  }
  
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl text-semibold text-black'>Selamat Datang Kembali</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Silakan masukkan detail anda untuk melanjutkan
        </p>

        <form onSubmit={handleLogin}>
          <Input 
          value={email}
          onChange={({target}) => setEmail(target.email)}
          label="Alamat email"
          placeholder="pengguna@email.com"
          type="text"
          />
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
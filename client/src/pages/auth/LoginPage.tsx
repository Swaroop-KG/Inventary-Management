import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import toastMessage from '../../lib/toastMessage';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import bgImage from './assets/bg1.avif';
import divImage from './assets/bgimage1.avif';


const LoginPage = () => {
  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'visitor@gmail.com',
      password: 'pass123',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging...');
    try {
      const res = await userLogin(data).unwrap();
  
      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success('Successfully logged in!', { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };
  
  return (
    <Flex justify='center' align='center' style={{ height: '100vh', position: 'relative' ,backgroundImage: `url(${bgImage})`, // Background image for the form
      backgroundSize: 'cover',
      backgroundPosition: 'center', }}>
      
      
      <Flex
        vertical
        style={{
          width: '400px',
          padding: '3rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
          backgroundImage: `url(${divImage})`, // Background image for the form
          
          backgroundPosition: 'center',
        }}
      >
        <h1 style={{ marginBottom: '.7rem', textAlign: 'center', textTransform: 'uppercase' }}>
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            {...register('email', { required: true })}
            placeholder='Your Email*'
            className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
          />
          <input
            type='password'
            placeholder='Your Password*'
            className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
            {...register('password', { required: true })}
          />
        <Flex justify='center'>
  <Button
    htmlType='submit'
    type='primary'
    style={{
      textTransform: 'uppercase',
      fontWeight: 'bold',
      backgroundColor: '#000080', // Navy blue background
      borderColor: '#0ffff0',      // Navy blue border
      color: '#fff',               // White text color for contrast
    }}
  >
    Login
  </Button>
</Flex>
</form>
<p style={{ marginTop: '1rem' }}>
  Don't have an account? 
  <Link to='/register' style={{ color: '#000080' , fontWeight: 'bold'  }}> Register Here</Link> {/* Navy blue color for the link */}
</p>

      </Flex>
    </Flex>
  );
};

export default LoginPage;

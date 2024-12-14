import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useRegisterMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import { toast } from 'sonner';
import bgImage from './assets/bg1.avif';
import divImage from './assets/bgimage1.avif';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Registering new account!');
    try {
      const res = await userRegistration(data).unwrap();

      if (data.password !== data.confirmPassword) {
        toastMessage({ icon: 'error', text: 'Password and confirm password must be same!' });
        return;
      }
      if (res.statusCode === 201) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Flex justify='center' align='center' style={{ height: '100vh', position: 'relative', backgroundImage: `url(${bgImage})`, // Background image for the form
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
         
        }}
      >
        <h1 style={{ marginBottom: '.7rem', textAlign: 'center', textTransform: 'uppercase' }}>
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            {...register('name', { required: true })}
            placeholder='Your Name*'
            className={`input-field ${errors['name'] ? 'input-field-error' : ''}`}
          />
          <input
            type='text'
            {...register('email', { required: true })}
            placeholder='Your Email*'
            className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
          />
          <input
            type='password'
            placeholder='Your Password*'
            {...register('password', { required: true })}
            className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
          />
          <input
            type='password'
            placeholder='Confirm Password*'
            {...register('confirmPassword', { required: true })}
            className={`input-field ${errors['confirmPassword'] ? 'input-field-error' : ''}`}
          />
          <Flex justify='center'>
            <Button
              htmlType='submit'
              type='primary'
              style={{ textTransform: 'uppercase', fontWeight: 'bold' ,backgroundColor: '#000080', // Navy blue background
                borderColor: '#0ffff0',      // Navy blue border
                color: '#fff', }}
            >
              Register
            </Button>
          </Flex>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to='/login' style={{ color: '#000080' , fontWeight: 'bold'  }}>Login Here</Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;

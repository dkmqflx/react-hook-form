import './App.css';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch('password');

  // console.log(watch('email')); // 어떠한 값이 입력되는지 알 수 있다.

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input type="email" {...register('email', { required: 'this is require', pattern: /^\S+@\S+$/i })} />
      {errors.email && <p>This email field is required</p>}

      <label>Name</label>
      <input {...register('name', { required: true, maxLength: 10 })} />
      {/* 유효성 검사 두개 하기 때문에 각각의 유효셩 검사 걸렸을 때 다른 메시지 보여주도록 한다 */}
      {errors.name && errors.name.type === 'required' && <p> This name field is required</p>}
      {errors.name && errors.name.type === 'maxLength' && <p> Your input exceed maximum length</p>}

      <label>Password</label>
      <input type="password" {...register('password', { required: true, minLength: 6 })} />

      {errors.password && errors.password.type === 'required' && <p> This password field is required</p>}
      {errors.password && errors.password.type === 'minLength' && <p> Password must have at least 6 characters</p>}

      <label>Password Confirm</label>
      <input
        type="password"
        {...register('password_confirm', { required: true, validate: (value) => value === password.current })}
      />
      {errors.password_confirm && errors.password_confirm.type === 'required' && (
        <p> This password confirm field is required</p>
      )}
      {errors.password_confirm && errors.password_confirm.type === 'validate' && <p>The passwords do not match</p>}

      <input type="submit" style={{ marginTop: '40px' }} />
    </form>
  );
}

export default App;

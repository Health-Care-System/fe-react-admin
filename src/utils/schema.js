import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Email harap diisi!'),
  password: Yup.string().required('Password harap diisi!')
})
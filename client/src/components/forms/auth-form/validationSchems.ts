import * as yup from 'yup';

export const signInValidationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(5, 'Password should be of minimum 5 characters length')
        .max(12, 'Password should be of maximum 12 characters length')
        .required('Password is required'),
});

export const signUpValidationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(5, 'Password should be of minimum 5 characters length')
        .max(12, 'Password should be of maximum 12 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

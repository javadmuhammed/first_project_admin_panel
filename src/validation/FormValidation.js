import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

export const forgetPasswordValidate = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"), 
});


export const passwordResetValidation = Yup.object().shape({
    password: Yup.string().required('Enter a password').oneOf([Yup.ref('cpassword'), null], 'Passwords must match').min(8, 'Password is too short - should be 8 chars minimum.'),
    cpassword: Yup.string().required('Enter a confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match').min(8, 'Password is too short - should be 8 chars minimum.')
});
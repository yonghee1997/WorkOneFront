import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from '@components/@extended/IconButton';
import AnimateButton from '@components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

import api from '@utils/axios'
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@store/userSlice';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ isDemo = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return (
    <>
      <Formik
        initialValues={{
          userId: '',
          userPw: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().required('ID is required'),
          userPw: Yup.string()
            .required('Password is required')
        })}
        onSubmit={async (values, {setErrors, setSubmitting}) => {
          try {
            const response = await api.post('/auth/login', {
              userId: values.userId,
              userPw: values.userPw
            });

            console.log('로그인 성공:', response.data);
            dispatch(setUser({
              userId: response.data.userId,
              userNm: response.data.userNm
            }));
            navigate('/dashboard/default');
          } catch (err) {
            console.error('로그인 실패:', err.response?.data || err.message);
            setErrors({ submit: err.response?.data || '로그인 실패' });
            setSubmitting(false)
        }
      }}
      >
        {({ errors, handleBlur, handleChange, touched, values, handleSubmit  }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="userId">ID</InputLabel>
                  <OutlinedInput
                    id="userId"
                    type="text"
                    value={values.email}
                    name="userId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter ID"
                    fullWidth
                    error={Boolean(touched.userId && errors.userId)}
                  />
                </Stack>
                {touched.userId && errors.userId && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.userId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="userPw">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.userPw && errors.userPw)}
                    id="userPw"
                    type={showPassword ? 'text' : 'password'}
                    value={values.userPw}
                    name="userPw"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.userPw && errors.userPw && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.userPw}
                  </FormHelperText>
                )}
              </Grid>
              <Grid sx={{ mt: -1 }} size={12}>
                <Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              <Grid size={12}>
                <AnimateButton>
                  <Button type="submit" fullWidth size="large" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };

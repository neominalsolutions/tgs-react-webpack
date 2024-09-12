import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './login.css';
//module import
import * as styles from './login.module.css';
import { Button, FormHelperText, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

console.log('styles', styles['login-input']);

type LoginFormState = {
	email: string;
	password: string;
};

const schema = yup
	.object({
		email: yup
			.string()
			.email('E-posta formatında gir')
			.required('E-post boş geçilemez'),
		password: yup
			.string()
			.matches(new RegExp('', 'i'))
			.min(8, 'Min 8 karakter olmalıdır')
			.required('Parola boş geçilemez'),
		address: yup.object({
			city: yup.string(),
			street: yup.string(),
		}),
	})
	.required();

function LoginPage() {
	console.log('...rendering');

	const navigate = useNavigate();

	const {
		register,
		watch,
		handleSubmit,
		control,
		formState: { isValid, errors },
	} = useForm<LoginFormState>({
		resolver: yupResolver<LoginFormState>(schema),
	});

	const onFormSubmit = (formvalue: LoginFormState) => {
		console.log('formValue', formvalue);

		axios
			.post('https://reqres.in/api/login', formvalue)
			.then((response) => {
				console.log('response', response);
				localStorage.setItem('xxx-tgs-tokenn', response.data.token);
				navigate('/admin');
			})
			.catch((err) => {
				console.log('hata');
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				{/* <input className={styles['login-input']} {...register('email')} /> */}

				{/* <Controller
					name="email"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField {...field} label="Email" variant="outlined" />
					)}
				/> */}

				<TextField
					sx={{ marginBottom: '5px' }}
					{...register('email')}
					id="email"
					label="Email"
					variant="outlined"
					onChange={() => {
						console.log('changed');
					}}
				/>

				<FormHelperText>{errors.email?.message}</FormHelperText>

				<br></br>

				<TextField
					type="password"
					{...register('password')}
					id="password"
					label="Password"
					variant="outlined"
				/>

				<FormHelperText>{errors.password?.message}</FormHelperText>

				{/* <input type="password" {...register('password')} /> */}
				<span>{errors.password?.message}</span>
				<br></br>
				<Button sx={{ marginTop: '5px' }} type="submit" variant="contained">
					Gönder
				</Button>
			</form>
		</>
	);
}

export default LoginPage;

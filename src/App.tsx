import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {
	Container,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	Button,
	Paper,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'

function App() {
	const [user, setUser] = useState<{ access_token: string; username: string } | null>(null)
	const [loginFormName, setLoginFormName] = useState<'login' | 'register'>('login')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleLoginFormChange = (
		_: React.MouseEvent<HTMLElement>,
		newForm: 'login' | 'register'
	) => {
		if (newForm) setLoginFormName(newForm)
	}

	const handleLogin = async () => {
		setIsLoading(true)

		try {
			const loginResponse = await fetch('https://todos-be.vercel.app/auth/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				mode: 'cors',
				headers: {
					'content-type': 'application/json',
				},
			})
			if (!loginResponse.ok) {
				throw new Error('Invalid credentials')
			}
			const loginData = (await loginResponse.json()) as {
				access_token: string
				username: string
			}
			const accessToken = loginData.access_token
			console.warn(jwtDecode(accessToken))
			setUser(loginData)
			localStorage.setItem('access_token', accessToken)
		} catch (error) {
			alert(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleRegister = async () => {
		setIsLoading(true)
		try {
			const registerResponse = await fetch('https://todos-be.vercel.app/auth/register', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				mode: 'cors',
				headers: {
					'content-type': 'application/json',
				},
			})
			if (!registerResponse.ok) {
				throw new Error('User already exists')
			}
		} catch (error) {
			alert(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<AppBar username={user?.username} />
			<Container maxWidth="sm" sx={{ paddingTop: '80px' }}>
				<Paper elevation={3} sx={{ padding: 3 }}>
					<Typography variant="h5" gutterBottom>
						{loginFormName === 'login' ? 'Вход' : 'Регистрация'}
					</Typography>
					{loginFormName === 'login' ? (
						<Stack spacing={2}>
							<ToggleButtonGroup
								value={loginFormName}
								exclusive
								onChange={handleLoginFormChange}
								disabled={isLoading}
								fullWidth
								size="small"
							>
								<ToggleButton value="login">Вход</ToggleButton>
								<ToggleButton value="register">Регистрация</ToggleButton>
							</ToggleButtonGroup>
							<TextField
								label="Email"
								type="email"
								value={username}
								onChange={handleUsernameChange}
								disabled={isLoading}
								slotProps={{ input: { startAdornment: <AccountCircle /> } }}
								variant="outlined"
								size="small"
							/>
							<TextField
								label="Пароль"
								type="password"
								value={password}
								onChange={handlePasswordChange}
								disabled={isLoading}
								slotProps={{ input: { startAdornment: <LockIcon /> } }}
								variant="outlined"
								size="small"
							/>
							<Button
								onClick={handleLogin}
								loading={isLoading}
								variant="contained"
								fullWidth
							>
								Войти
							</Button>
						</Stack>
					) : (
						<Stack spacing={2}>
							<ToggleButtonGroup
								value={loginFormName}
								exclusive
								onChange={handleLoginFormChange}
								disabled={isLoading}
								fullWidth
								size="small"
							>
								<ToggleButton value="login">Вход</ToggleButton>
								<ToggleButton value="register">Регистрация</ToggleButton>
							</ToggleButtonGroup>
							<TextField
								label="Email"
								type="email"
								value={username}
								onChange={handleUsernameChange}
								disabled={isLoading}
								slotProps={{ input: { startAdornment: <AccountCircle /> } }}
								variant="outlined"
								size="small"
							/>
							<TextField
								label="Пароль"
								type="password"
								value={password}
								onChange={handlePasswordChange}
								disabled={isLoading}
								slotProps={{ input: { startAdornment: <LockIcon /> } }}
								variant="outlined"
								size="small"
							/>
							<Button
								onClick={handleRegister}
								loading={isLoading}
								variant="contained"
								fullWidth
							>
								Зарегистрироваться
							</Button>
						</Stack>
					)}
				</Paper>
			</Container>
		</div>
	)
}

export default App

import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import { useState } from 'react'
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

	const handleSubmit = () => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			console.log({ username, password, form: loginFormName })
		}, 2000)
	}

	return (
		<div>
			<AppBar />
			<Container maxWidth="sm" sx={{ paddingTop: '80px' }}>
				<Paper elevation={3} sx={{ padding: 3 }}>
					<Stack spacing={2}>
						<Typography variant="h5" gutterBottom>
							{loginFormName === 'login' ? 'Вход' : 'Регистрация'}
						</Typography>
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
							onClick={handleSubmit}
							loading={isLoading}
							variant="contained"
							fullWidth
						>
							{loginFormName === 'login' ? 'Войти' : 'Зарегистрироваться'}
						</Button>
					</Stack>
				</Paper>
			</Container>
		</div>
	)
}

export default App

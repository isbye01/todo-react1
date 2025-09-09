import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

const SwitchTheme = () => {
	const { mode, setMode } = useColorScheme()
	if (!mode) {
		return null
	}
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'end',
				color: 'text.primary',
				borderRadius: 1,
				p: 3,
				minHeight: '56px',
			}}
		>
			<FormControl>
				<RadioGroup
					aria-labelledby="demo-theme-toggle"
					name="theme-toggle"
					row
					value={mode}
					onChange={(event) => setMode(event.target.value as 'light' | 'dark')}
				>
					<FormControlLabel value="light" control={<Radio />} label="Light" />
					<FormControlLabel value="dark" control={<Radio />} label="Dark" />
				</RadioGroup>
			</FormControl>
		</Box>
	)
}

export default SwitchTheme

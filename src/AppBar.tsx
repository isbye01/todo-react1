import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import { Stack, Tooltip } from '@mui/material'
import SwitchTheme from './Switch.tsx'

const ButtonAppBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }} marginBottom={5}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						<Typography variant="h6" component="div">
							Todo's
						</Typography>
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>
					<SwitchTheme />
					<Button color="inherit">Login</Button>
					<Tooltip title="User">
						<Avatar src={''} />
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import backgroundImg from '../img/background_login.jpeg'

class signup extends React.Component {

    render() {
        return (
            <div style={{ backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: ' 100 00',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw', 
            }} className='Page-cover'>
                <Box sx={{p:5}}>
                    <Typography variant="h2" component="div" gutterBottom align='center'>
                        SignUp
                    </Typography>
                </Box>
            </div>
        )
    }
}

export default signup;
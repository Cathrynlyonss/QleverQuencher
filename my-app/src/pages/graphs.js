import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

class graphs extends React.Component {

    render() {
        return (
            <div className='Page-cover'>
                <Box sx={{p:5}}>
                    <Typography variant="h2" component="div" gutterBottom align='center'>
                        Graphs
                    </Typography>
                </Box>
            </div>
        )
    }
}

export default graphs;
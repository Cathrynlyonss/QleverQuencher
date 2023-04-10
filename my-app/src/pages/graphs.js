import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';




class graphs extends React.Component {

    render() {
        return (
            <div style = {{
                backgroundColor: '#DAEDFF',
                width: '100vw',
                height: '100vh'
            }}>
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

import { Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import BlockIcon from '@mui/icons-material/Block';
import styles from './block-alert.module.css'


const BlockAlert = ({username, id} : {username: string, id : number}) => {
  return (
    <Paper className={styles.container}>
        <Typography variant='h5' align='center'>Alert</Typography>
        <Stack spacing={ 1}>
            <Typography align='center'>
                You are Blocking {username}, Id {id}
            </Typography>

            <Button variant='contained' size='small' startIcon={<BlockIcon/>}>
                Block
            </Button>
        </Stack>
    </Paper>
  )
}

export default BlockAlert
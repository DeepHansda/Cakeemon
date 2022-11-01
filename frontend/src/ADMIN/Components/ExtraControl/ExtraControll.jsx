import { Box, Container, Divider } from '@mui/material'
import React from 'react'
import Banners from './Banners'
import Brands from './Brands'
import Categories from './Categories'

function ExtraControll() {
  return (
    <>
    <Box>
      <Banners/>
    </Box>
    <Divider/>
    <Container sx={{ display: "flex",mt:4}}>
      <Categories/>
      <Brands/>
    </Container>
    </>
  )
}

export default ExtraControll
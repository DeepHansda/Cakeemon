import { Container, Divider, Typography } from '@mui/material'
import React from 'react'
import Star from '../../Utils/Star'

function ReviewCard({review}) {
  return (
    <div className="review-card">
          <Container sx={{marginTop:'16px'}}>
            <Container>
            <Typography variant="h3" sx={{fontSize:'20px',textTransform: "capitalize"}}>
              {review.name}
            </Typography>
            </Container>

            <Container>
              <Star ratings={review.rating}/>
            </Container>

            <Container>
              <Typography variant="body1" >
                {review.comment}
              </Typography>
            </Container>
          </Container>
          <Divider/>
          </div>
  )
}

export default ReviewCard
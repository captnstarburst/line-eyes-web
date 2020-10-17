import React, { useState } from 'react'
import AppBar from '../UI/AppBar'
import Editor from './Editor'
import Review from './Review'
import { withAuthorization } from '../Session'

const PhotoPage = props => {
  const [page, setNextPage] = useState(1)
  const [base64, setBase64] = useState()

  const incrementNext = url => {
    alert(url)
    setBase64(url)
    setNextPage(prevState => prevState + 1)
  }

  return (
    <>
      <AppBar />
      {page === 1 ? (
        <Editor propagateUrl={incrementNext} />
      ) : (
        <Review url={base64} />
      )}
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(PhotoPage)

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  bottomLinks: {
    textAlign: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(10)
    }
  }
}))

const Footer = () => {
  const preventDefault = event => event.preventDefault()
  const classes = useStyles()

  return (
    <footer style={{ marginTop: '150px' }}>
      <Typography
        style={{ textAlign: 'center', fontSize: '16px' }}
        variant='h6'
      >
        Line-Eyes &copy;
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '50%'
          }}
        >
          <Link href='/privacy-policy' color='primary'>
            Privacy Policy
          </Link>
          <Link href='/terms-and-conditions' color='primary'>
            Terms & Conditions
          </Link>
        </Typography>
      </div>
    </footer>
  )
}

export default Footer

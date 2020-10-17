import React from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const myTheme = {
  'menu.backgroundColor': 'white',
  'common.backgroundColor': '#151515',
  'downloadButton.backgroundColor': 'white',
  'downloadButton.borderColor': 'white',
  'downloadButton.color': 'black'
}

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    backgroundColor: 'white',
    border: '1px solid #fdba3b',
    borderTopColor: 'rgb(253, 186, 59)',
    borderRightColor: 'rgb(253, 186, 59)',
    borderBottomColor: 'rgb(253, 186, 59)',
    borderLeftColor: 'rgb(253, 186, 59)',
    borderColor: 'white',
    marginRight: '40px',
    marginTop: '10px'
  }
}))

function HomePage (props) {
  const classes = useStyles()

  const imageEditor = React.createRef()

  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst
    const data = imageEditorInst.toDataURL()
    props.propagateUrl(data)
    console.log(data)
  }

  return (
    <div style={{ background: '#151515' }}>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button
          variant='contained'
          color={'green'}
          size='large'
          startIcon={<SaveIcon />}
          onClick={saveImageToDisk}
          className={classes.buttonStyle}
        >
          Save
        </Button>
      </div>

      <ImageEditor
        includeUI={{
          theme: myTheme,
          menu: ['filter'],
          initMenu: 'filter',
          uiSize: {
            height: '700px'
          },
          menuBarPosition: 'top'
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={true}
        ref={imageEditor}
      />
    </div>
  )
}
export default HomePage

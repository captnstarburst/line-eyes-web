import React from 'react'
import AppBar from '../UI/AppBar'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import { withAuthorization } from '../Session';

const myTheme = {
    // Theme object to extends default dark theme.
  };

const PhotoPage = props => {
    return(
        <>
            <AppBar />
            <ImageEditor
    includeUI={{
      loadImage: {
        path: 'img/sampleImage.jpg',
        name: 'SampleImage'
      },
      theme: myTheme,
      menu: ['shape', 'filter'],
      initMenu: 'filter',
      uiSize: {
        width: '1000px',
        height: '700px'
      },
      menuBarPosition: 'bottom'
    }}
    cssMaxHeight={500}
    cssMaxWidth={700}
    selectionStyle={{
      cornerSize: 20,
      rotatingPointOffset: 70
    }}
    usageStatistics={true}
  />
        </>
        
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PhotoPage);

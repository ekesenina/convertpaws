import React, { useState } from 'react';
import CustomEditor from '../utils/CustomEditor';

function ImageEditor() {
  const [file, setFile] = useState();

  return (
    <div className='editor'>
        <CustomEditor file={file} setFile={setFile} />
    </div>
  );
}

export default ImageEditor;



// style={{ margin: '1%' }}
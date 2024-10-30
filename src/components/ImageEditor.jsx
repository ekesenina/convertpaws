import React, { useState } from 'react';
import ReusableDragAndDrop from '../utils/DragNDrop';
import CustomEditor from '../utils/CustomEditor';

const ImageEditor = () => {
  const [files, setFiles] = useState([]); 

  const handleFilesAdded = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Добавляем новые файлы в массив
  };

  return (
    <div className="imageEditor">
      <ReusableDragAndDrop onFilesAdded={handleFilesAdded} />
      <div className="imageEditor__fileContainer">
        {files.map((file, index) => (
          <CustomEditor key={index} file={file} />
        ))}
      </div>
    </div>
  );
};

export default ImageEditor;

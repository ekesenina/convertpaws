import React, { useState } from "react";

import upload from '../assets/icons/upload.svg'

const ReusableDragAndDrop = ({ onFilesAdded }) => {
  const [files, setFiles] = useState([]);

  const setFileData = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onFilesAdded(newFiles); // Передаем новые файлы в родительский компонент
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onFilesAdded(newFiles); // Передаем новые файлы в родительский компонент
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div 
      className="dnd"
      onDrop={handleDrop} 
      onDragOver={handleDragOver} 
    >
      {/* <img className="dnd__icon" src={upload} alt="Reset Icon" /> */}
      <input
        type="file"
        onChange={setFileData}
        multiple
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input" style={{ cursor: "pointer" }} className="dnd__text">
        <img className="dnd__icon" src={upload} alt="Reset Icon" />
        Перетащите файлы сюда или нажмите для выбора
      </label>
      <p className="dnd__note">Загружено: {files.length} файлов</p>
      {/* {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default ReusableDragAndDrop;

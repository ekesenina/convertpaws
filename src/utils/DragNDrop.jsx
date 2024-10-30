import React, { useState } from "react";

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
      onDrop={handleDrop} 
      onDragOver={handleDragOver} 
      style={{ border: "2px dashed #ccc", padding: "20px", borderRadius: "8px", textAlign: "center" }}
    >
      <input
        type="file"
        onChange={setFileData}
        multiple
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input" style={{ cursor: "pointer" }}>
        Перетащите файлы сюда или нажмите для выбора
      </label>
      
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReusableDragAndDrop;

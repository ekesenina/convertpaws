import React, { useState } from 'react';
import ReusableDragAndDrop from '../utils/DragNDrop';
import CustomEditor from '../utils/CustomEditor';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const ImageEditor = () => {
  const [files, setFiles] = useState([]); 

  const handleFilesAdded = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Добавляем новые файлы в массив
  };

  return (
    <div className="imageEditor">
      <ReusableDragAndDrop onFilesAdded={handleFilesAdded} />
      <div className="imageEditor__fileContainer">
        <Swiper
          className='slider'
          modules={[Navigation, Pagination, A11y, Autoplay]}
          grabCursor={true}
          zoom={true}
          allowTouchMove={false}
          slidesPerView={3}
          spaceBetween={0}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            1520: {
                slidesPerView: 4
            },
            1150: {
                slidesPerView: 3
            },
            660: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1
              },
            }}
        >
          {files.map((file, index) => (
            <SwiperSlide key={index} className='slider__slide'>
              <p className='slider__slide__fileName'>{file.name}</p>
              <CustomEditor file={file} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageEditor;

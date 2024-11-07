import React, { useState, useRef, useEffect } from 'react';
import { usePhotoEditor } from '../hooks/usePhotoEditor';
import edit from '../assets/icons/editIcon.svg';
import save from '../assets/icons/saveIcon.svg';
import reset from '../assets/icons/resetIcon.svg';
import brightnessIcon from '../assets/icons/brightnessIcon.svg';
import contrastIcon from '../assets/icons/contrastIcon.svg';
import saturateIcon from '../assets/icons/saturateIcon.svg';
import grayscaleIcon from '../assets/icons/grayscaleIcon.svg';
import rotateIcon from '../assets/icons/rotateIcon.svg';
import zoomIcon from '../assets/icons/zoomIcon.svg';
import flipHorizontalIcon from '../assets/icons/flip-horizontal.svg';
import flipVerticalIcon from '../assets/icons/flip-vertical.svg';
import convertIcon from '../assets/icons/convertIcon.svg';

function CustomEditor({ file }) {
  const rangeRefs = useRef([]);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isFlipedHorizontal, setIsFlipedHorizontal] = useState(false);
  const [isFlipedVertical, setIsFlipedVertical] = useState(false);

  const {
    canvasRef,
    imageSrc,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    saturate,
    setSaturate,
    grayscale,
    setGrayscale,
    tint,
    setTint,
    rotate,
    setRotate,
    flipHorizontal,
    setFlipHorizontal,
    flipVertical,
    setFlipVertical,
    zoom,
    setZoom,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleWheel,
    downloadImage,
    convertAndDownloadImage,
    resetFilters,
    isDragging,
  } = usePhotoEditor({ file });

  useEffect(() => {
    const updateProgress = (rangeInput) => {
      rangeInput.style.setProperty('--value', (rangeInput.value / rangeInput.max) * 100);
    };

    rangeRefs.current.forEach((rangeInput) => {
      if (rangeInput) {
        const handleInput = () => updateProgress(rangeInput);
        rangeInput.addEventListener('input', handleInput);
        updateProgress(rangeInput); // Initialize progress on mount

        return () => rangeInput.removeEventListener('input', handleInput);
      }
    });
  }, []);

  const handleEditorClick = () => {
    setIsEditorActive(!isEditorActive); // Переключаем состояние
  };

  const handleFlipHorizontalClick = () => {
    setIsFlipedHorizontal(!isFlipedHorizontal); // Переключаем состояние
  };
  
  const handleFlipVerticalClick = () => {
    setIsFlipedVertical(!isFlipedVertical); // Переключаем состояние
  };

  const handleResetClick = () => {
    // Первый вызов resetFilters
    resetFilters(() => {
      setIsFlipedHorizontal(false);
      setIsFlipedVertical(false);
      // Обновляем стили инпутов после сброса
      rangeRefs.current.forEach((rangeInput) => {
        if (rangeInput) updateProgress(rangeInput);
      });
    });
  
    // Второй вызов resetFilters через небольшой интервал
    setTimeout(() => {
      resetFilters(() => {
        setIsFlipedHorizontal(false);
        setIsFlipedVertical(false);
        rangeRefs.current.forEach((rangeInput) => {
          if (rangeInput) updateProgress(rangeInput);
        });
      });
    }, 1); // Тайм-аут в 1 мс для имитации двойного клика
  };

  const updateProgress = (rangeInput) => {
    rangeInput.style.setProperty('--value', (rangeInput.value / rangeInput.max) * 100);
  };

  return (
    <div className="file">
      {imageSrc && (
        <div className="canvas-container">
          <canvas
            className={`canvas ${isDragging ? 'dragging' : ''}`}
            ref={canvasRef}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onWheel={handleWheel}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          />
          <div className="tools">
            <button className="tools__resetButton" onClick={handleResetClick} aria-label="Reset changes">
              <img className="tools__resetButton__img" src={reset} alt="Reset Icon" />
            </button>
            <button className="tools__editButton" onClick={handleEditorClick} aria-label="Edit">
              <img className="tools__editButton__img" src={edit} alt="Edit Icon" />
            </button>
            {/* <button className="tools__saveButton" onClick={downloadImage}>
              <img className="tools__saveButton__img" src={save} alt="Save Icon" />
            </button> */}
          </div>
        </div>
      )}

      <div className={`controls ${isEditorActive ? 'activeEditor' : ''}`}>
        {[{ label: 'Brightness', icon: brightnessIcon, value: brightness, setter: setBrightness, min: 0, max: 200 },
          { label: 'Contrast', icon: contrastIcon, value: contrast, setter: setContrast, min: 0, max: 200 },
          { label: 'Saturate', icon: saturateIcon, value: saturate, setter: setSaturate, min: 0, max: 200, className: 'saturate' },
          { label: 'Grayscale', icon: grayscaleIcon, value: grayscale, setter: setGrayscale, min: 0, max: 100 },
          { label: 'Tint', icon: brightnessIcon, value: tint, setter: setTint, min: 0, max: 360 },
          { label: 'Rotate', icon: rotateIcon, value: rotate, setter: setRotate, min: 0, max: 360 },
          { label: 'Zoom', icon: zoomIcon, value: zoom, setter: setZoom, min: 0.1, max: 100, step: 0.01 }
        ].map((control, index) => (
          <div key={control.label} className="controls__property">
            <label className="controls__property__label">
              {control.label}
              <img className={`controls__property__label__img ${control.className || ''}`} src={control.icon} alt={`${control.label} Icon`} />
            </label>
            <input
              className="controls__property__input"
              type="range"
              min={control.min}
              max={control.max}
              value={control.value}
              onChange={(e) => control.setter(Number(e.target.value))}
              ref={(el) => (rangeRefs.current[index] = el)}
            />
          </div>
        ))}
        <div className='controls__property flip'>
           <label className='controls__property__label'>
             <input
              className='controls__property__input flipCheckbox'
              type="checkbox"
              checked={flipHorizontal}
              onClick={handleFlipHorizontalClick}
              onChange={(e) => setFlipHorizontal(e.target.checked)}
            />
            <img 
              className={`controls__property__label__img ${isFlipedHorizontal ? 'flipedHorizontal' : ''}`}
              // className='controls__property__label__img' 
              src={flipHorizontalIcon}
            />
            Flip Horizontal
          </label>
        </div>

        <div className='controls__property flip'>
          <label className='controls__property__label'>
            <input
              className='controls__property__input flipCheckbox'
              type="checkbox"
              checked={flipVertical}
              onClick={handleFlipVerticalClick}
              onChange={(e) => setFlipVertical(e.target.checked)}
            />
            <img 
              className={`controls__property__label__img ${isFlipedVertical ? 'flipedVertical' : ''}`}
              // className='controls__property__label__img' 
              src={flipVerticalIcon}
            />
            Flip Vertical
          </label>
        </div>
      </div>
      <div className="btns">
        <div className="btns__container">
          <button className="btns__container__download" onClick={convertAndDownloadImage}>
            <img className="btns__container__download__img" src={convertIcon} alt="Save Icon" />
            Конвертировать в WebP и скачать
          </button>
        </div>
        <div className="btns__container">
          <button className="btns__container__download" onClick={downloadImage}>
            <img className="btns__container__download__img" src={save} alt="Save Icon" />
            Скачать
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomEditor;

import React, { useState, useRef, useEffect  } from 'react';
import { usePhotoEditor } from '../hooks/usePhotoEditor';
import edit from '../assets/icons/editIcon.svg'
import save from '../assets/icons/saveIcon.svg'
import reset from '../assets/icons/resetIcon.svg'
import brightnessIcon from '../assets/icons/brightnessIcon.svg'
import contrastIcon from '../assets/icons/contrastIcon.svg'
import saturateIcon from '../assets/icons/saturateIcon.svg'
import grayscaleIcon from '../assets/icons/grayscaleIcon.svg'
import rotateIcon from '../assets/icons/rotateIcon.svg'
import zoomIcon from '../assets/icons/zoomIcon.svg'
import flipHorizontalIcon from '../assets/icons/flip-horizontal.svg'
import flipVerticalIcon from '../assets/icons/flip-vertical.svg'

function CustomEditor({ file }) {
  const rangeRef = useRef(null);

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
    resetFilters,
  } = usePhotoEditor({ file });

  const handleEditorClick = () => {
    setIsEditorActive(!isEditorActive); // Переключаем состояние
  };

  const handleFlipHorizontalClick = () => {
    setIsFlipedHorizontal(!isFlipedHorizontal); // Переключаем состояние
  };
  
  const handleFlipVerticalClick = () => {
    setIsFlipedVertical(!isFlipedVertical); // Переключаем состояние
  };

  return (
    <div className='file'>
      {imageSrc && (
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onWheel={handleWheel}
          />
          <div className='tools'>
            <button 
              className='tools__resetButton'
              onClick={resetFilters}
              aria-label="Reset changes"
            >
              <img className='tools__resetButton__img' src={reset}/>
            </button>
            <button 
              className='tools__editButton' 
              onClick={handleEditorClick}
              aria-label="Edit">
                <img className='tools__editButton__img' src={edit}/>
            </button>
            <button 
              className='tools__saveButton'
              onClick={downloadImage}
            >
              <img className='tools__saveButton__img' src={save}/>
            </button>
          </div>
        </div>
      )}

      <div className={`controls ${isEditorActive ? 'activeEditor' : ''}`} >
        <div className='controls__property'>
          <label className='controls__property__label'>
            Brightness
            <img className='controls__property__label__img' src={brightnessIcon}/>
          </label>
          <input
            className='controls__property__input'
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />
        </div>

        <div className='controls__property'>
          <label className='controls__property__label'>
            Contrast
            <img className='controls__property__label__img' src={contrastIcon}/>
          </label>
          <input
            className='controls__property__input'
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
          />
        </div>

        <div className='controls__property'>
          <label className='controls__property__label'>
            Saturate
            <img className='controls__property__label__img saturate' src={saturateIcon}/>
          </label>
          <input
            className='controls__property__input'
            type="range"
            min="0"
            max="200"
            value={saturate}
            onChange={(e) => setSaturate(Number(e.target.value))}
          />
        </div>

        <div className='controls__property'>
          <label className='controls__property__label'>
            Grayscale
            <img className='controls__property__label__img' src={grayscaleIcon}/>
          </label>
          <input
            className='controls__property__input'
            type="range"
            min="0"
            max="100"
            value={grayscale}
            onChange={(e) => setGrayscale(Number(e.target.value))}
          />
        </div>

        <div className='controls__property'>
          <label className='controls__property__label'>
            Rotate
            <img className='controls__property__label__img' src={rotateIcon}/>
          </label>
          <input
            className='controls__property__input'
            type="range"
            min="0"
            max="360"
            value={rotate}
            onChange={(e) => setRotate(Number(e.target.value))}
          />
        </div>

        <div className='controls__property'>
          <label className='controls__property__label'>
            Zoom
            <img className='controls__property__label__img' src={zoomIcon}/>
          </label>
          <input
            className='controls__property__input'
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <div className='controls__property'>
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

        <div className='controls__property'>
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
    </div>
  );
}

export default CustomEditor;

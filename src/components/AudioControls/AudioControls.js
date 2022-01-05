import React from 'react'
import play from '../../img/icon_play.svg'
import pause from '../../img/icon_paused.svg'
import prev from  '../../img/icon_prev.svg'
import next from  '../../img/icon_next.svg'
import classes from './audioControls.module.sass'

const AudioControls = ({ isPlaying, onNextClick, onPlayPauseClick, onPrevClick }) => {
  return (
    <div className={classes.controls}>
      <img
        className={classes.controls__iconNav}
        src={prev} alt="prev"
        onClick={onPrevClick}
      />
      <img
        className={classes.controls__iconPlay}
        src={isPlaying ? pause : play}
        alt={isPlaying ? 'pause' : 'play'}
        onClick={() => isPlaying ? onPlayPauseClick(false) : onPlayPauseClick(true)}
      />
      <img
        className={classes.controls__iconNav}
        src={next} alt="next"
        onClick={onNextClick}
      />
    </div>
  )
}

export default AudioControls

import React, {useEffect, useState} from 'react'
import classes from './turntable.module.sass'
import {DataSound} from './dataSound'
import icon_play from '../../img/icon_play.svg'
import icon_paused from '../../img/icon_paused.svg'
import icon_next from '../../img/icon_next.svg'

const getDataItem = (numTrack) => {
  return DataSound.find(item => item.id === numTrack)
}

const Turntable = () => {
  const [playing, setPlaying] = useState(false)
  const [numTrack, setNumTrack] = useState(0)
  const [audio] = useState(new Audio(getDataItem(numTrack).soundSrc))

  const nextTrack = () => {
    setNumTrack(prev => {
      if (prev < DataSound.length) {
        return prev + 1
      } else {
        return 1
      }
    })
  }

  const toggle = () => {
    setPlaying(prev => !prev)
  }

  const stopPlay = () => {
    playing ? audio.play() : audio.pause()
  }

  useEffect(() => stopPlay(), [playing])

  useEffect(() => {
    audio.src = getDataItem(numTrack).soundSrc
    stopPlay()
  }, [numTrack])

  useEffect(() => {
    audio.addEventListener('ended', () => nextTrack())
    return () => {
      audio.removeEventListener('ended', () => nextTrack())
    }
  }, [])

  return (
    <div className={classes.turntable}>
      <div>
        <img
          src={getDataItem(numTrack).imgSrc}
          alt={getDataItem(numTrack).title}
        />
        <h3>{getDataItem(numTrack).title} {getDataItem(numTrack).id}</h3>
        <nav className={classes.nav}>
          <img
            className={classes.nav__iconPlay}
            src={playing ? icon_paused : icon_play}
            alt={playing ? 'Play' : 'Pause'}
            onClick={toggle}
          />
          <img
            className={classes.nav__iconPause}
            src={icon_next}
            alt="Next"
            onClick={nextTrack}
          />
        </nav>
      </div>
      <div>progressBar</div>

    </div>
  )
}

export default Turntable

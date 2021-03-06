import React, {useEffect, useRef, useState} from 'react'
import { DataTracks } from './dataTracks'
import AudioControls from '../AudioControls/AudioControls'
import classes from './audioPlayer.module.sass'
import audioMute from '../../img/audio-0.svg'
import audioOn from '../../img/audio-100.svg'
import audio66 from '../../img/audio-66.svg'
import audio33 from '../../img/audio-33.svg'

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [volume, setVolume] = useState(35)
  const [isPlaying, setIsPlaying] = useState(false)

  const { title, author, imgSrc, soundSrc } = DataTracks[trackIndex]

  const audioRef = useRef(new Audio(soundSrc))
  const intervalRef = useRef()
  const isReady = useRef(false)
  const nowVolume = useRef([])
  const titleRef = useRef()

  const { duration } = audioRef.current

  const startTimer = () => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack()
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, 1000)
  }

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    setTrackProgress(audioRef.current.currentTime)
  }

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(DataTracks.length - 1)
    } else {
      setTrackIndex(trackIndex - 1)
    }
  }

  const toNextTrack = () => {
    if (trackIndex < DataTracks.length - 1) {
      setTrackIndex(trackIndex + 1)
    } else  {
      setTrackIndex(0)
    }
  }

  const changeVolume = (value) => {
    setVolume(value * 100)
    audioRef.current.volume = value
  }

  const addZero = (num) => num < 10 ? '0' + num : num

  const showTime = (value) => {
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return (
      <span className={classes.progressTime}>{`${addZero(minutes)}:${addZero(seconds)}`}</span>
    )
  }

  const showVolumeIcon = (volume = 0.25) => {
    let elemVolumeIcon = audio33
    if (volume > 0.8) {
      elemVolumeIcon = audioOn
    } else if (volume >= 0.34 && volume <= 0.8) {
      elemVolumeIcon = audio66
    } else if (volume > 0 && volume <= 0.33) {
      elemVolumeIcon = audio33
    } else if (volume === 0) {
      elemVolumeIcon = audioMute
    }
    return (
      <img
        className={classes.volumeImg}
        src={elemVolumeIcon}
        alt={`volume: ${volume}`}
        onClick={toMutedPlayer}
      />
    )
  }
  const toMutedPlayer = () => {
    nowVolume.current.push(audioRef.current.volume)

    if (nowVolume.current.length > 2) {
      nowVolume.current.shift()
    }

    if (audioRef.current.volume === 0) {
      setVolume(nowVolume.current[0] * 100)
        audioRef.current.volume = nowVolume.current[0]
    } else if (audioRef.current.volume > 0) {
      setVolume(0)
        audioRef.current.volume = 0
    }
  }

  const runLineAnimation = () => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.offsetWidth
      const titleWrapperWidth = titleRef.current.parentElement.offsetWidth

      titleRef.current.classList.remove(classes.runLineAnimation)

      if (titleWidth > titleWrapperWidth) {
        titleRef.current.style
          .setProperty('--width-translateX',
            `-${titleWidth - titleWrapperWidth + 5}px`)
        titleRef.current.style
          .setProperty('--time-translateX',
            `${(titleWidth - titleWrapperWidth) * 120}ms`)

        setTimeout(() => {
          titleRef.current.classList.add(classes.runLineAnimation)
        }, 1000)
      } else {
        titleRef.current.classList.remove(classes.runLineAnimation)
      }
    }
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const pausedNuw = audioRef.current.paused
    audioRef.current.pause()

    audioRef.current = new Audio(soundSrc)
    audioRef.current.volume = volume / 100
    setTrackProgress(audioRef.current.currentTime)

    if (isReady.current && !pausedNuw) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      isReady.current = true
    }
    runLineAnimation()
  }, [trackIndex])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className={classes.player}>
      <div className={classes.topWrapper}>
        <img
          className={classes.trackImg}
          src={imgSrc}
          alt={title}
        />
        <div className={classes.descriptionWrapper}>
          <h2 ref={titleRef} className={classes.title}>{title}</h2>
          <h3 className={classes.author}>{author}</h3>
        </div>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
      </div>
      <div className={classes.progressWrapper}>
        {showTime(audioRef.current.currentTime)}
        <input
          className={classes.progressInput}
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          onChange={(event => onScrub(event.target.value))}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
        {showTime(duration ? duration : 0)}
      </div>
      <div className={classes.volumeWrapper}>
        {showVolumeIcon(audioRef.current.volume)}
        <input
          className={classes.volumeInput}
          type="range"
          value={volume}
          step="1"
          min="0"
          max="100"
          onChange={(event => changeVolume(event.target.value / 100))}
        />
      </div>
    </div>
  )
}

export default AudioPlayer

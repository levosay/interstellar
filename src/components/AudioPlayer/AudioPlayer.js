import React, {useEffect, useRef, useState} from 'react'
import { DataTracks } from './dataTracks'
import AudioControls from '../AudioControls/AudioControls'
import classes from './audioPlayer.module.sass'

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [volume, setVolume] = useState(25)
  const [isPlaying, setIsPlaying] = useState(false)

  const { title, author, imgSrc, soundSrc } = DataTracks[trackIndex]

  const audioRef = useRef(new Audio(soundSrc))
  const intervalRef = useRef()
  const isReady = useRef(false)

  const { duration } = audioRef.current

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%"
  // console.log(currentPercentage)

  const startTimer = () => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack()
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, [1000])
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

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.pause()

    audioRef.current = new Audio(soundSrc)
    audioRef.current.volume = volume / 100
    setTrackProgress(audioRef.current.currentTime)

    if (isReady.current) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      isReady.current = true
    }
  }, [trackIndex])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  console.log(audioRef.current.volume)

  return (
    <div className={classes.player}>
      <div className={classes.topWrapper}>
        <img
          className={classes.trackImg}
          src={imgSrc}
          alt={title}
        />
        <div className={classes.descriptionWrapper}>
          <h2 className={classes.title}>{title}</h2>
          <h3 className={classes.author}>{author}</h3>
        </div>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
      </div>
      <input
        className={classes.progress}
        type="range"
        value={trackProgress}
        step="1"
        min="0"
        max={duration ? duration : `${duration}`}
        onChange={(event => onScrub(event.target.value))}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
      />
      <input
        className={classes.volume}
        type="range"
        value={volume}
        step="1"
        min="0"
        max="100"
        onChange={(event => changeVolume(event.target.value / 100))}
      />

    </div>
  )
}

export default AudioPlayer

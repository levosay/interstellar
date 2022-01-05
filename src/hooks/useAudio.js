// import {useEffect, useState} from 'react'
//
// export const UseAudio = (track) => {
//   const [audio] = useState(new Audio(track))
//   const [playing, setPlaying] = useState(false)
//
//   const toggle = () => setPlaying(prev => !prev)
//
//   useEffect(() => {
//     playing ? audio.play() : audio.pause()
//   }, [playing])
//
//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false))
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false))
//     }
//   }, [])
//
//   return [playing, toggle]
// }

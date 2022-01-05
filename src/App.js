import React from 'react'
import {useEffect, useState} from 'react'
import {FetchTemplate} from './utils/fetchTemplate'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    FetchTemplate()
      .then(data => setData(data))
      .catch(err => console.log(err))
  }, [])

  // console.log('data ', data)


  return (
    <div className="App">
      <AudioPlayer />
    </div>
  )
}

export default App;

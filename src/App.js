import React from 'react'
import {useEffect, useState} from 'react'
import {FetchTemplate} from './utils/fetchTemplate'
import Turntable from './components/Turntable/Turntable'

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
      <Turntable />
    </div>
  )
}

export default App;

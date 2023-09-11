import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useActivate, useUnactivate } from 'react-activation'

import './index.less'

export default function Databoard() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('did mounted')
    return () => {
      console.log('did unmounted')
    }
  }, [])
  useActivate(() => {
    console.log('activate')
  })
  useUnactivate(() => {
    console.log('unactivate')
  })
  return (
    <div className="databoard">
      databoard. {count}
      <button onClick={() => setCount(c => c + 1)}>+1</button><br />
      <Link to="/detail">to detail.</Link><br />
      <Link to="/data-table">to data table.</Link>
    </div>
  )
}
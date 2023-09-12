import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLifeEventLog } from '@/hooks'

import './index.less'

export default function Databoard() {
  const [count, setCount] = useState(0)
  useLifeEventLog('databoard')
  return (
    <div className="databoard">
      databoard. {count}
      <button onClick={() => {
        setCount(c => c + 1)
      }}>+1</button><br />
      <Link to="/detail">to detail.</Link><br />
      <Link to="/data-table">to data table.</Link>
    </div>
  )
}
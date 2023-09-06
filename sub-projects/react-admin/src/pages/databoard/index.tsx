import { Link } from 'react-router-dom'
import './index.less'

export default function Databoard() {
  return (
    <div className="databoard">
      databoard.
      <Link to="/detail">to detail.</Link>
      <Link to="/data-table">to data table.</Link>
    </div>
  )
}
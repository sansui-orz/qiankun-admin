import { Link } from 'react-router-dom'
import { useLifeEventLog } from '@/hooks'

export default function DataTable() {
  useLifeEventLog('datatable')
  return (<div className="data-table">
    data table.
    <Link to="/">to databoard.</Link>
  </div>)
}
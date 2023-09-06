import { useNavigate } from 'react-router-dom'

import './index.less'

function DataboardDetail() {
  const navigate = useNavigate()
  return (
    <div className="databoard-detail">
      databoard detail.
      <button onClick={() => {
        navigate(-1)
      }}>back</button>
    </div>
  )
}

export default DataboardDetail
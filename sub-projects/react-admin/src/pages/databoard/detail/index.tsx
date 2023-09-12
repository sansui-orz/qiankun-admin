import { useNavigate } from 'react-router-dom'
import { useAliveController } from 'react-activation'
import { useLifeEventLog } from '@/hooks'

import './index.less'

function DataboardDetail() {
  const { drop } = useAliveController()
  
  const navigate = useNavigate()
  const onClick = () => {
    drop('/databoard')
  }
  useLifeEventLog('databoard-detail')
  return (
    <div className="databoard-detail">
      databoard detail.<br />
      <button onClick={() => {
        navigate(-1)
      }}>back</button><br />
      <button onClick={onClick}>delete cache</button>
    </div>
  )
}

export default DataboardDetail
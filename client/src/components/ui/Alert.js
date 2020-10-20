import React, { useEffect } from 'react'
import '../../assests/css/alert.css'

const Alert = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const {msg, reason} = props
  const color = reason ? 'red' : 'green'
  const _class = `Alert ${color}`
  return (
    <div className={_class}>
      {msg}
    </div>
  )
}

export default Alert
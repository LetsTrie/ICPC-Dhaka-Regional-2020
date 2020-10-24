import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { upload } from '../../action/index'

export const Upload = () => {
  const [Image, setImage] = useState([  ])
  const dispatch = useDispatch()

  const handleChange = (e, i) => {
    const image = [...Image]
    image.push(...e.target.files)
    setImage(image)
  }

  const submit = e => {
    console.log(Image)
    const fd = new FormData()
    Image.map(img => fd.append('image', img))
    dispatch(upload(fd))
  }
  return (
    <div style={{padding: '200px'}}>
      {
        [1, 2].map((el, i) => (
          <input type='file' name='image' onChange={(e, i) => handleChange(e, i)} />
        ))
      }
      <br />
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default Upload
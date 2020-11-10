import React, { useState, useEffect } from 'react'
import '../../assests/css/admin.css'
import { useDispatch, useSelector } from 'react-redux'
import { adminUploadImage, loadAdminGallery, adminUpdateImageVisibility } from '../../action/index'
import Add from '@material-ui/icons/AddCircle'
import '../../assests/css/gallery.css'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'; 
import { v4 as uuid } from 'uuid'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch'
import Image from '@material-ui/icons/Image'
import Delete from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';

const AdminGallery = () => {
  const [image, setImage] = useState({})
  const [gallery, loadGallery] = useState([])
  const [displayImage, setDisplayImage] = useState(null)
  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin)

  const handleChange = e => {
    let img = {...image}
    img = e.target.files[0]
    setImage(img)
    let formData = new FormData()
    formData.append('image', img)
    dispatch(adminUploadImage(formData))
  }

  useEffect(() => {
    if (admin.gallery == null) {
      dispatch(loadAdminGallery())
    } else {
      let gal = [...gallery]
      gal = admin.gallery
      loadGallery(gal)
    }
  }, [admin])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  const classes = useStyles()
  const inputStyles = {
    width: '100%'
  }

  const onPreview = (e, i) => {
    setDisplayImage(gallery[i].name)
  }

  const onSwitch = (e, i) => {
    const data = {
      name: gallery[i].name,
      visibility: !gallery[i].visibility
    }
    dispatch(adminUpdateImageVisibility(data))
    let temp = [...gallery]
    temp[i].visibility = !gallery[i].visibility
    loadGallery(temp)
  }

  return (
    <div className='AdminGallery'>

            <div className='top-row'>
              <div className='header'>
                <h1>Gallery</h1>
              </div>
              <div className='numbers'>
              <label className='upload-label'>
              <Add color='secondary' style={{fontSize: 40, cursor: 'pointer'}} />
              <input type='file' onChange={ handleChange } name='image'/>
            </label>
              </div>
            </div>

      {
        displayImage && <Lightbox 
          mainSrc={require(`../../assests/gallery/${displayImage}`)}
          onCloseRequest={() => { setDisplayImage(null) }}
        />
      }

      <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Preview</TableCell>
            <TableCell align="right">File name</TableCell>
            <TableCell align="right">Visibility</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            gallery.map((img, i) => (
              <TableRow key={ uuid() }>
                <TableCell>
                  <Image color='primary' style={{ fontSize: 20, cursor: 'pointer' }} 
                    onClick={e => onPreview(e, i)}
                  />
                </TableCell>
                <TableCell align='right'>
                  { img.name }
                </TableCell>
                <TableCell align='right'>
                  <Switch checked={img.visibility} onClick={ e => onSwitch(e, i) }/>
                </TableCell>
                <TableCell align='right'>
                  <Delete color='primary' style={{ fontSize: 20, cursor: 'pointer' }}  />
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AdminGallery

import React, { useState, useEffect, useRef, createRef } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Delete from '@material-ui/icons/Delete'

const Temp =() => {
  const [open, setOpen] = useState(false)
  const modalRef = createRef(null)

  const modalStyles = {
    padding: '20px', 
    position: 'fixed', 
    backgroundColor: '#eee',
    width: '90%', 
    height: '80%'
  }

  const useOutsideClick = (ref, callback, when) => {
    const savedCallback = useRef(callback)
    useEffect(() => {
      savedCallback.current = callback
    })
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        savedCallback.current()
      }
    }
    useEffect(() => {
      if (when) {
          document.addEventListener('click', handler)
          return () => {document.removeEventListener('click', handler)}
      }
    }, [when])
  }

  useOutsideClick(modalRef, () => {setOpen(false)}, open)

  return (
    <div style={{ height: '100vh', padding: '100px', display: 'flex'}}>
      <Button 
      style={{height: '50px'}} 
      variant='contained' 
      color='primary' 
      size='large'
      onClick={() => setOpen(!open)}
      >
        Open Modal
      </Button>
      
      { open && (
        <div style={modalStyles} ref={modalRef}>
          <h1>This is a modal</h1>
          <h3>Click anywhere outside to dismiss it!</h3>
      </div>
      ) }

    </div>
  );
}

export default Temp
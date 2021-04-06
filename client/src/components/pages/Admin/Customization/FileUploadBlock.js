import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const urlSlug = (url) => url.toLowerCase().split(' ').join('-');

const FileUploadBlock = ({
  title,
  container,
  setContainer,
  section,
  extension,
  ...props
}) => {
  const { accessToken } = props.cred;
  let slugTitle = urlSlug(title) + `.${extension}`;

  const [formSuccess, setFormSuccess] = useState(null);
  const [formError, setFormError] = useState(null);

  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handleFileChange = async (e) => {
    if (e.target.files[0].name !== slugTitle) {
      console.log(e.target.files[0].name, slugTitle);
      setFormError(`File name should be "${slugTitle}"`);
    } else {
      setShowSubmitButton(true);
      setContainer((prev) => ({
        ...prev,
        [urlSlug(title)]: e.target.files[0],
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    slugTitle = slugTitle.split('.')[0];
    const reqFiles = new FormData();
    reqFiles.append(slugTitle, container[slugTitle]);
    const headers = { Authorization: `Bearer ${accessToken}` };
    await axios.post(`/api/v1/admin/${section}/${slugTitle}`, reqFiles, {
      headers,
    });
    setShowSubmitButton(false);
    setFormSuccess(`"${slugTitle}" has updated!!`);
  };

  useEffect(() => {
    if (formSuccess) {
      setTimeout(() => {
        setFormSuccess(null);
      }, 5000);
    }
    if (formError) {
      setTimeout(() => {
        setFormError(null);
      }, 5000);
    }
  }, [formSuccess, formError]);

  return (
    <div className="subBlock" style={{ marginBottom: 5 }}>
      {(formError || formSuccess) && (
        <Alert
          variant="filled"
          severity={formError ? 'error' : 'success'}
          style={{ fontSize: 17, marginTop: 5, marginBottom: 8 }}
        >
          {formError || formSuccess}
        </Alert>
      )}
      <p className="subBlockHeader" style={{ fontSize: '1.85rem' }}>
        {title}
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
        <div>
          <input
            id={urlSlug(title)}
            type="file"
            name={urlSlug(title)}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            onClick={(e) => (e.target.value = null)}
          />
          <label htmlFor={urlSlug(title)}>
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              style={{ fontSize: 15 }}
            >
              Upload your
              <span
                style={{
                  paddingLeft: 7,
                  paddingRight: 7,
                  fontWeight: '700',
                  textTransform: 'lowercase',
                }}
              >{`"${slugTitle}"`}</span>
              File
            </Button>
          </label>
          {showSubmitButton && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              style={{ fontSize: 14.5, marginLeft: 10 }}
              type="Submit"
            >
              Submit File
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(FileUploadBlock);

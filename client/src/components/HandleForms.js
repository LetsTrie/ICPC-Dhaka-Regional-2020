import React from 'react';

function useFormFields(initialValues) {
  const [formFields, setFormFields] = React.useState(initialValues);
  const createChangeHandler = (key, isFile = false) => (e) => {
    let value;
    if (isFile) value = e.target.files[0];
    else value = e.target.value;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };
  return { formFields, createChangeHandler };
}

export default useFormFields;

import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor(props) {
  const [data, setData] = useState('');
  const [active, setActive] = useState(false);
  const [type, setType] = useState('');

  const editorConfiguration = {
    toolbar: ['bold', 'italic'],
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '500px', minWidth: '500px' }}>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={props.dataEditor ? props.dataEditor : ''}
        onChange={(event, editor) => {
          //--- this setter is to get the data in textarea---//
          const dataModified = editor.getData();
          setData(dataModified);
        }}
        onBlur={(event, editor) => {
          //------this setter is to active the update of where you modified the textarea --------//
          props.setDataEditor(data);
        }}
      />
    </Box>
  );
}

export default Editor;

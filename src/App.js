
// import Form from 'react-jsonschema-form';
// import { withTheme } from 'react-jsonschema-form';
// import Form from 'react-jsonschema-form-bs4';
// import Form from '@rjsf/core';

import React, { useState } from 'react'
import TerrThemeForm from './new-theme/terrThemeForm'
// import { Accordion, Card } from 'react-bootstrap';
import { ControlledEditor } from '@monaco-editor/react'
// import Editor from '@monaco-editor/react'
import { formDataTest } from './data'
// import { schemaInfo } from './data'
import { PvtForm } from './pvtable/pvt-form'
import './App.css';

// const isJSON = (str) => {
//   if (typeof (str) !== 'string') {
//     return false;
//   }
//   try {
//     JSON.parse(str);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

function App() {
  // const defaultSchema = JSON.stringify(defaultSchemaJS)
  // const defSchemaUI = JSON.stringify(defaultSchemaUI)
  const editorFontSize = 12;
  // const defaultData = JSON.stringify(formDataTest)
  const [recTheme, setRecTheme] = useState("{}")
  const [schema, setSchema] = useState("{}")
  const [UISchema, setUISchema] = useState("{}")
  const [formData, setFormData] = useState(formDataTest)

  const [modalPvtShow, setModalPvtShow] = useState(false)

  const handleEdits = (value, type) => {
    switch (type) {
      case "schema":
        // isJSON(value) && setSchema(value);
        break;
      case "uischema":
        // isJSON(value) && setUISchema(value);
        break;
      case "formdata":
        //isJSON(value) && setFormData(value);
        // setFormData(JSON.stringify(value, null, '  '))
        //setFormData(value)
        break;
      default:
        break;
    }
  }

  const processSubmit = (data) => {
    setRecTheme(JSON.stringify(data, null, '  '))
    setSchema(JSON.stringify(data.json_schema || {}, null, '  '))
    setUISchema(JSON.stringify(data.ui_schema || {}, null, '  '))
  }

  return (
    <React.Fragment>
      <main className="p-3 row">
        {/* <Form
          className="col-7"
          schema={JSON.parse(schema)}
          formData={JSON.parse(formData)}
          uiSchema={JSON.parse(UISchema)}
          onChange={(event) => setFormData(JSON.stringify(event.formData, null, '  '))}
          onError={console.error}
          // ArrayFieldTemplate={ArrayFieldTemplate1}
        /> */}
        <TerrThemeForm
          groupName={"Exemplo de grupo"}
          formData={formDataTest} // {formData}
          onChange={(formData) => setFormData(formData) } //setFormData(JSON.stringify(event.formData, null, '  ')) }
          onSubmit={(data)=> processSubmit(data)}
          className="col-7"
        />
        <aside className="col-5 h-100 position-fixed" style={{ right: 0 }}>
          <div className="col" height="100%">
          <div style={{padding: "20px"}}>
          <button 
            onClick={(event) => { 
              if (event) event.preventDefault()
              setModalPvtShow(true) 
            }}
            >
            PIVOT TABLE
          </button></div>
            <h4>FormData</h4>
            <ControlledEditor
              border="blue solid 1px"
              height="500px"
              language="json"
              options={{readOnly: true, fontSize: editorFontSize}}
              value={JSON.stringify(formData, null, '  ')}
              onChange={(_, value) => handleEdits(value, "formdata")}
            />
          </div >
        </aside>
      </main>
      <div className="row" style={{height: "250px", borderTop: "2px solid gray"}}>
      <section className="col">
          <h4>Schema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            options={{readOnly: true, fontSize: editorFontSize}}
            value={recTheme}
            // onChange={(_, value) => handleEdits(value, "schema")}
          />
        </section>
        <section className="col">
          <h4>Schema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            options={{readOnly: true, fontSize: editorFontSize}}
            value={schema}
            // onChange={(_, value) => handleEdits(value, "schema")}
          />
        </section>
        <section className="col">
          <h4>UISchema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            options={{readOnly: true, fontSize: editorFontSize}}
            value={UISchema}
            // onChange={(_, value) => handleEdits(value, "uischema")}
          />
        </section>
        {/* <section className="col">
          <h4>FormData</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={formData}
            onChange={(_, value) => handleEdits(value, "formadata")}
          />
        </section> */}
      </div>

      <PvtForm
        show={modalPvtShow}
        onHide={() => setModalPvtShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </React.Fragment>
  );
}

export default App;

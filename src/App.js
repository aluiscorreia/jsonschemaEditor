
// import Form from 'react-jsonschema-form';
// import { withTheme } from 'react-jsonschema-form';
// import Form from 'react-jsonschema-form-bs4';
// import Form from '@rjsf/core';

import React, { useState } from 'react'
// import Form from './rjsf-bs4/src/index'
import NewThemeForm from './new-theme/newThemeForm'
import { Accordion, Card } from 'react-bootstrap';
import Editor, { ControlledEditor } from '@monaco-editor/react';
import { formDataTest, schemaInfo } from './data'
import './App.css';
// import { ArrayFieldTemplate1 } from './rjsf-templates/array-template1'

const isJSON = (str) => {
  if (typeof (str) !== 'string') {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

function App() {
  // const defaultSchema = JSON.stringify(defaultSchemaJS)
  // const defSchemaUI = JSON.stringify(defaultSchemaUI)
  const defaultData = JSON.stringify(formDataTest)
  // const [schema, setSchema] = useState(defaultSchema)
  // const [UISchema, setUISchema] = useState(defSchemaUI)
  const [formData, setFormData] = useState(defaultData) // useState("{}")

  const handleEdits = (value, type) => {
    switch (type) {
      case "schema":
        // isJSON(value) && setSchema(value);
        break;
      case "uischema":
        // isJSON(value) && setUISchema(value);
        break;
      case "formdata":
        isJSON(value) && setFormData(value);
        break;
      default:
        break;
    }
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
        <NewThemeForm
          formData={JSON.parse(formData)}
          onChange={(event) => setFormData(JSON.stringify(event.formData, null, '  ')) }
        />
        <aside className="col-5 h-100 position-fixed" style={{ right: 0 }}>
          <Accordion defaultActiveKey="1">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Documentação
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ul>
                    <li>
                      Github: <a target="_blank" rel="noopener noreferrer" href="https://github.com/rjsf-team/react-jsonschema-form">https://github.com/rjsf-team/react-jsonschema-form</a>
                    </li>
                    <li>
                      Docs: <a target="_blank" rel="noopener noreferrer" href="https://react-jsonschema-form.readthedocs.io/">https://react-jsonschema-form.readthedocs.io/</a>
                    </li>
                    <li>
                      Playground:<a target="_blank" rel="noopener noreferrer" href="https://rjsf-team.github.io/react-jsonschema-form/">https://rjsf-team.github.io/react-jsonschema-form/</a>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Schema Properties
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Editor
                  height="430px"
                  language="typescript"
                  value={schemaInfo}
                  options={{
                    readOnly: true
                  }} />
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <div className="col" height="200px">
            <h4>FormData</h4>
            <ControlledEditor
              border="blue solid 1px"
              height="150px"
              language="json"
              value={formData}
              onChange={(_, value) => handleEdits(value, "formadata")}
            />
          </div>
        </aside>
      </main>
      {/* <div className="fixed-bottom row">
        {/* <section className="col">
          <h4>Schema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={schema}
            onChange={(_, value) => handleEdits(value, "schema")}
          />
        </section>
        <section className="col">
          <h4>UISchema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={UISchema}
            onChange={(_, value) => handleEdits(value, "uischema")}
          />
        </section>
        <section className="col">
          <h4>FormData</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={formData}
            onChange={(_, value) => handleEdits(value, "formadata")}
          />
        </section>
      </div> */}
    </React.Fragment>
  );
}

export default App;

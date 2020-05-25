import React, { useState, useEffect } from 'react';
import Form from 'react-jsonschema-form';
import { Accordion, Card } from 'react-bootstrap';
import Editor, { ControlledEditor } from '@monaco-editor/react';
import { defaultSchema, schemaInfo } from './data'
import './App.css';

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
  const [schema, setSchema] = useState(defaultSchema)
  const [UISchema, setUISchema] = useState("{}")
  const [formData, setFormData] = useState("{}")

  const handleEdits = (value, type) => {
    switch (type) {
      case "schema":
        isJSON(value) && setSchema(value);
        break;
      case "uischema":
        isJSON(value) && setUISchema(value);
        break;
      case "formdata":
        isJSON(value) && setFormData(value);
        break;
    }
  }

  return (
    <React.Fragment>
      <main className="p-3 row">
        <Form
          className="col-7"
          schema={JSON.parse(schema)}
          formData={JSON.parse(formData)}
          uiSchema={JSON.parse(UISchema)}
          onChange={(event) => setFormData(JSON.stringify(event.formData))}
          onError={console.error}
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
                      Github: <a target="_blank" href="https://github.com/rjsf-team/react-jsonschema-form">https://github.com/rjsf-team/react-jsonschema-form</a>
                    </li>
                    <li>
                      Docs: <a target="_blank" href="https://react-jsonschema-form.readthedocs.io/">https://react-jsonschema-form.readthedocs.io/</a>
                    </li>
                    <li>
                      Playground:<a target="_blank" href="https://rjsf-team.github.io/react-jsonschema-form/">https://rjsf-team.github.io/react-jsonschema-form/</a>
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
        </aside>
      </main>
      <div className="fixed-bottom row">
        <section className="col">
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
      </div>
    </React.Fragment>
  );
}

export default App;

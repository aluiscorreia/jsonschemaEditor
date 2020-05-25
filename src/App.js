import React, { useState } from 'react';
import Form from 'react-jsonschema-form';
import { ControlledEditor } from '@monaco-editor/react';
import './App.css';

const defaultSchema = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "title": "Age"
    },
    "bio": {
      "type": "string",
      "title": "Bio"
    },
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 3
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
};

function App() {
  const [schema, setSchema] = useState(defaultSchema)
  const [UISchema, setUISchema] = useState({})
  const [formData, setFormData] = useState({})

  return (
    <div>
      <main className="p-3">
        <Form
          schema={schema}
          formData={formData}
          uiSchema={UISchema}
          onChange={(event) => setFormData(event.formData)}
          onError={console.log("errors")} />
      </main>
      <div className="fixed-bottom row">
        <section className="col">
          <h4>Schema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={JSON.stringify(schema)}
            onChange={(_, value) => setSchema(JSON.parse(value))}
          />
        </section>
        <section className="col">
          <h4>UISchema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={JSON.stringify(UISchema)}
            onChange={(_, value) => setUISchema(JSON.parse(value))}
          />
        </section>
        <section className="col">
          <h4>FormData</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={JSON.stringify(formData)}
            onChange={(_, value) => setFormData(JSON.parse(value))}
          />
        </section>
      </div>
    </div>
  );
}

export default App;

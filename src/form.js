import React from "react";
import JSONSchemaForm from "react-jsonschema-form";
import "bootstrap/dist/css/bootstrap.css";

const postSchema = {
  type: "array",
  items: {
    type: "string"
  }
};

export default function Form({ onSubmit }) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <JSONSchemaForm onSubmit={onSubmit} schema={postSchema} />
        </div>
      </div>
    </div>
  );
}
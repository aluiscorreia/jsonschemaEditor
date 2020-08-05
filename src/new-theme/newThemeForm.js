import React from 'react'
import Form from './../rjsf-bs4/src/index'
import { NT_JSSchema, NT_UISchema } from './NewThemeSchemas'
// import { ArrayFieldTemplate1 } from './array-template1'

function NewThemeForm({ formData, onChange }) {

  function createJSSchema(title_form, dataFields) {
    const props = dataFields.reduce((obj, field) => {
      return {
        ...obj,
        [field.campo]: {
          type: field.tipo
        },
      };
    }, {})
    return {
      type: "object",
      title: title_form,
      properties: props
    }
  }

  function createUISchema(dataFields) {
    return {}
  }

  function processSubmit(dataForm) {
    console.log(dataForm)
    const ret = {}
    ret.code_table = dataForm.code_table
    ret.code_group = dataForm.code_group
    ret.data_type = dataForm.data_type
    ret.description = dataForm.description
    ret.name_table = dataForm.code_table.toLowerCase()
    ret.json_schema = createJSSchema(dataForm.title_form, dataForm.table_fields)
    ret.ui_schema = createUISchema(dataForm.table_fields)
    // ret.create_order = // TODO Value to be assigned in backend
    // ret.order_in_group = // TODO Value to be assigned in backend
    // ret.zindex = // TODO Value to be assigned in backend
    console.log(ret)
  }

  return (
  <Form
    className="col-7"
    schema={NT_JSSchema}
    formData={formData}
    uiSchema={NT_UISchema}
    onChange={(event) => onChange(event) }
    onError={console.error}
    //ArrayFieldTemplate={ArrayFieldTemplate1}
    onSubmit={(data)=>processSubmit(data.formData)}
  />
  )
}

export default NewThemeForm
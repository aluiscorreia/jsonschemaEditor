import React, { useState } from 'react'
// DELETE ?? import { Modal, Alert } from 'react-bootstrap'
import Form from '@rjsf/bootstrap-4'
import { NT_ThemeTypes, NT_JSSchema, NT_UISchema } from './terrSchemasDefs'
import { NTwidgets } from './terrThemeWidgets'
import { ListFieldAsTableTemplate } from './terrThemeTemplates'
import './terrThemeForm.css'

// ========================================================================
// Form to create a new theme/layer
function TerrThemeForm({formData: formDataIn, groupName, onChange, onSubmit, ...props }) {
  const [rjsfData, set_rjsfData] = useState(() => { 
    const tmp_JSSchema = Object.assign({}, NT_JSSchema)
    tmp_JSSchema.description = "Formulário de apoio à criação de novo conjunto de dados" + (groupName ? " no grupo '" + groupName + "'" : "")
    return {
      formData: formDataIn, 
      schema: tmp_JSSchema,
      uischema: NT_UISchema
    }
  })
  const [actualThemeType, setActualThemeType] = useState(formDataIn ? formDataIn.data_type : undefined)
  // const previousValues = useRef({data_type: formData ? formData.data_type : undefined}).current
  // const [_jsschema, ] = useState(() => { 
  //   const tmp_JSSchema = Object.assign({}, NT_JSSchema)
  //   tmp_JSSchema.description = "Formulário de apoio à criação de novo conjunto de dados" + (groupName ? " no grupo '" + groupName + "'" : "")
  //   return tmp_JSSchema
  // })
  // DELETE ?? const [errorModalShow, setErrorModalShow] = useState(false)

  /**
   * Create the final JSON Schema for the new theme (in final format to be inserted in database)
   * @param {*} title_form 
   * @param {*} dataFields 
   */
  function createJSSchemaForNewTheme(title_form, dataFields) {
    // TODO
    const templixo = { texto: "string", inteiro: "integer"}
    const fldprops = dataFields.reduce((obj, field) => {
      const fieldDef = {
        type: templixo[field.tipo]
      }
      if (field.chave) fieldDef.database = { "primaryKey": true }
      return {
        ...obj,
        [field.campo]: Object.assign(fieldDef, field.specific || {})
      };
    }, {})
    return {
      type: "object",
      title: title_form,
      properties: fldprops
    }
  }

  /**
   * Create the final UI Schema for the new theme (in final format to be inserted in database)
   * @param {*} dataFields 
   */
  function createUISchemaForNewTheme(dataFields) {
    // TODO
    return { }
  }

  /**
   * Executed on Click on Submit butto
   * @param {*} dataForm 
   */
  function _processSubmit(dataForm) {
    // TODO
    console.log("==> processSubmit in Form os TerrThemeForm")
    console.log(dataForm)
    const ret = {}
    ret.code_table = dataForm.code_table
    ret.code_group = dataForm.code_group
    ret.data_type = dataForm.data_type
    ret.description = dataForm.desc_theme
    ret.name_table = dataForm.code_table.toLowerCase()
    ret.json_schema = createJSSchemaForNewTheme(dataForm.title_form, dataForm.theme_fields)
    ret.ui_schema = createUISchemaForNewTheme(dataForm.theme_fields)
    onSubmit(ret)
  }

  /**
   * Executed on onchange event of JsSchema react Form (updates jsschema and uischema based on theme type)
   * @param {*} event 
   */
  function _onChange(event) {
    if (actualThemeType !== event.formData.data_type) {
      const NT_ThemeType = NT_ThemeTypes[event.formData.data_type]
      event.formData.theme_fields = NT_ThemeType.defaultFields
      event.schema.properties.theme_fields = NT_ThemeType.jsSchema
      if (event.formData.data_type !== 'fromwms')
        event.schema.properties.theme_fields.items.properties.tipo.enum = NT_ThemeType.fieldTypes
    }
    
    setActualThemeType(event.formData.data_type)
    set_rjsfData({ formData: event.formData, schema: event.schema, uischema: event.uiSchema })
    if (onChange) return onChange(event.formData)
  }

  /**
   * Executed on validate event of JsSchema react Form
   * Add erros messages to each field
   * @param {*} formData 
   * @param {*} errors 
   */
  function validateForm(formData, errors) {
    console.log("-- INVOCOU validateForm - ")
    // DELETE ?? setErrorModalShow(true)
    Object.entries(NT_JSSchema.properties).forEach(([field, props]) => {
      let error = null
      if (props.validateField) {
        error = props.validateField(formData[field])
        if (error) errors[field].addError(error)
      }
    })
    // ?? errors.addError("LIXO")
    // ?? errors.addError("LIXO 2 2 2 2 2")
    return errors;
  }

  /**
   * Executed on transformErrors event of JsSchema react Form
   * Allows to "transform" error messages
   * @param {*} errors 
   */
  function transformFormErrors(errors) {
    return errors.map(error => {
      const prop = rjsfData.schema.properties[error.property.slice(1)]
      if (prop && prop.transformError)
        error = prop.transformError(error)
      return error
    });
  }

  /**
   * React Json Schema Form
   */
  return ( 
    <>
      <Form
        className={props.className + " rjsf-newTheme"}
        // omitExtraData={true}
        // liveOmit={true}
        liveValidate={false}
        schema={rjsfData.schema}
        formData={rjsfData.formData}
        uiSchema={rjsfData.uischema}
        showErrorList={false}
        onChange={(event) => _onChange(event) }
        formContext={{ actualThemeType: actualThemeType }}
        onError={(errors) => console.log("I have", errors.length, "errors to fix")} //{console.error}
        ArrayFieldTemplate={ListFieldAsTableTemplate}
        onSubmit={(data)=>_processSubmit(data.formData)}
        validate={validateForm}
        transformErrors={transformFormErrors}
        widgets={NTwidgets}
        // {...props}
      />
      {/* DELETE ??  <Modal // Modal form to show global erros on submit
        show={errorModalShow}
        onHide={() => setErrorModalShow(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Propriedades de campo de novo tema
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <Alert.Heading>Campo com informação incompleta</Alert.Heading><hr/>
            <p>Ocorreu uma situação inválida ao tentar configurar o campo.</p>
            <p className="mb-0">Verifique se o nome do campo (com um mínimo de 4 carateres) e o seu tipo de dados estão corretamente definidos.</p>
          </Alert>
        </Modal.Body>
      </Modal> */}
    </>
  )
}

export default TerrThemeForm
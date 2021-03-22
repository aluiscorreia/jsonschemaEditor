import React, { useState, useEffect } from 'react'
import Form from '@rjsf/bootstrap-4'
import { NT_ThemeTypes, NT_JSSchema, NT_UISchema, NT_ThemesFldDatatypesLabels, NT_FldDatatypesProps } from './terrSchemasDefs'
import { NTwidgets } from './terrThemeWidgets'
import { ListFieldAsTableTemplate } from './terrThemeTemplates'
import './terrThemeForm.css'

// ========================================================================
// Form to create a new theme/layer
function TerrThemeForm({formData: formDataIn, groupName, themesFK, onChange, onSubmit, ...props }) {
  const [rjsfData, set_rjsfData] = useState(() => { 
    const tmp_JSSchema = Object.assign({}, NT_JSSchema)
    tmp_JSSchema.description = "Formulário de apoio à criação de novo conjunto de dados" + (groupName ? " no grupo '" + groupName + "'" : "")
    return {
      formData: formDataIn, 
      schema: tmp_JSSchema,
      uischema: NT_UISchema
    }
  })
  const [actualThemeType, setActualThemeType] = useState(formDataIn ? formDataIn.theme_type : undefined)
  // const previousValues = useRef({theme_type: formData ? formData.theme_type : undefined}).current
  // const [_jsschema, ] = useState(() => { 
  //   const tmp_JSSchema = Object.assign({}, NT_JSSchema)
  //   tmp_JSSchema.description = "Formulário de apoio à criação de novo conjunto de dados" + (groupName ? " no grupo '" + groupName + "'" : "")
  //   return tmp_JSSchema
  // })
  // DELETE ?? const [errorModalShow, setErrorModalShow] = useState(false)

  useEffect(() => {
    console.log('mounted the component terrThemeForm with inicialization');
    NT_FldDatatypesProps.foreignKey.themesFK = themesFK
  }, [themesFK])

  /**
   * Executed on Click on Submit butto
   * @param {*} dataForm 
   */
  function _processSubmit(dataForm) {
    const ret = {}
    ret.code_table = dataForm.code_table
    ret.code_group = dataForm.code_group
    ret.data_type = dataForm.theme_type
    ret.description = dataForm.desc_theme
    ret.name_table = dataForm.code_table.toLowerCase()
    const aux = NT_ThemeTypes[dataForm.theme_type].getFinalSchema(dataForm.theme_type, dataForm.title_form, dataForm.description_form, dataForm.theme_fields)
    Object.assign(ret, aux)

    onSubmit(ret)
  }

  /**
   * Executed on onchange event of JsSchema react Form (updates jsschema and uischema based on theme type)
   * @param {*} event 
   */
  function _onChange(event) {
    if (actualThemeType !== event.formData.theme_type) {
      const NT_ThemeType = NT_ThemeTypes[event.formData.theme_type]
      event.formData.theme_fields = NT_ThemeType.defaultFields
      event.schema.properties.theme_fields = NT_ThemeType.jsSchema
      if (event.formData.theme_type !== 'fromwms') {
        event.schema.properties.theme_fields.items.properties.tipo.enum = NT_ThemeType.allowedFldDatatypes
        event.schema.properties.theme_fields.items.properties.tipo.enumNames = NT_ThemesFldDatatypesLabels(NT_ThemeType.allowedFldDatatypes)
      }
    }
    
    setActualThemeType(event.formData.theme_type)
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
    const validateProps = (formData_level, props_level, errors_level) => {
      Object.entries(props_level).forEach(([field, props]) => {
        let error = null
        if (props.validateField) {
          error = props.validateField(formData_level[field], formData_level)
          if (error) errors_level[field].addError(error)
        }
      })
    }
    // DELETE ?? setErrorModalShow(true)
    // Validate individually each properties of theme (first level - not theme_fields)
    validateProps(formData, NT_JSSchema.properties, errors)
    // Theme type
    const isThemeTableType = rjsfData.schema.properties.theme_fields.items !== undefined
    // Validate each field at theme field level
    const theme_fields_props = 
      isThemeTableType ? rjsfData.schema.properties.theme_fields.items.properties
      : rjsfData.schema.properties.theme_fields.properties || {}
    if (Array.isArray(formData.theme_fields))
      formData.theme_fields.forEach((row, index) => validateProps(row, theme_fields_props, errors.theme_fields[index]))
    else validateProps(formData.theme_fields, theme_fields_props, errors.theme_fields)
    // Validate globally fields at theme level
    /* if (isThemeTableType)
    formData.theme_fields.forEach(row => {
      if (NT_FldDatatypesConfig[row.tipo].requiredProps)

    }) */
    // Validate at theme level
    if (NT_ThemeTypes[formData.theme_type].validateThemeFields) {
      const aux = NT_ThemeTypes[formData.theme_type].validateThemeFields(formData.theme_fields)
      if (aux) aux.forEach(errorMsg => errors.addError(errorMsg))
    }

    return errors;
  }

  /**
   * Executed on transformErrors event of JsSchema react Form
   * Allows to "transform" error messages
   * @param {*} errors 
   */
  function transformFormErrors(errors) {
    return errors.map(error => {
      let prop = rjsfData.schema.properties[error.property.slice(1)]
      if (!prop) prop = rjsfData.schema.properties.theme_fields.items.properties[error.property.slice(1).split(".")[1]]
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
        onError={(errors) => false} //{console.error}
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
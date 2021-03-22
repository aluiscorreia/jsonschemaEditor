/**
 * React component to config fields of a theme
 */
import React, {useEffect, useState} from 'react'
import { Modal, Button, Card, Alert } from 'react-bootstrap'
import Form from '@rjsf/bootstrap-4'
import { NT_nomeCampo, NT_tipoCampo } from './terrThemeTemplates'
import { NTwidgets } from './terrThemeWidgets'
import { NT_FldDatatypesConfig, NT_FldDatatypesProps, NT_FldDatatypeCfgForeignKey, NT_FldDatatypesPropsFK } from './terrSchemasDefs'
import { cloneDeep } from "lodash"

let formDataInput = null

let fldDatatypesConfig = null

const init_FldDatatypesConfig = (fldType) => { 
  fldDatatypesConfig = {}
  fldDatatypesConfig.jsSchema = { 
    title: "Características específicas do campo",
    type: "object",
    properties: {} 
  }
  fldDatatypesConfig.uiSchema = {}
  fldDatatypesConfig.validateField = {}
  fldDatatypesConfig.requiredProps = NT_FldDatatypesConfig[fldType].requiredProps
  NT_FldDatatypesConfig[fldType].properties.forEach(fldProp => {
    if (NT_FldDatatypesProps[fldProp].initField) NT_FldDatatypesProps[fldProp].initField(fldType)
    fldDatatypesConfig.jsSchema.properties[fldProp] = NT_FldDatatypesProps[fldProp].jsSchema
    fldDatatypesConfig.uiSchema[fldProp] = NT_FldDatatypesProps[fldProp].uiSchema
    fldDatatypesConfig.validateField[fldProp] = NT_FldDatatypesProps[fldProp].validateField
  })
  return fldDatatypesConfig 
}

export function FieldConfigForm(props) {
  const [FCF_data, setFCF_data] = useState({
    formData: {}, 
    schema: {}
  })

  useEffect(() => {
    console.log("USE EFFECT " + props.element)
    if (props.element)
      setFCF_data({
        formData: formDataInput.specific, 
        schema: getDatatypeSchema(formDataInput[NT_tipoCampo])
      })
  }, [props.element])

  const handleSubmit = ({ formData }, event) => {
    event.preventDefault()
    // event.stopPropagations()

    props.element.children.props.onChange(Object.assign(formDataInput, { specific: formData }))
    fldDatatypesConfig = null // Clear the local variable
    props.onHide()
  }

  function isInvalidTipoCampo(element)
  {
    return element && element.children.props.formData
     && element.children.props.formData[NT_tipoCampo]
     && NT_FldDatatypesConfig[element.children.props.formData[NT_tipoCampo]] === undefined
  }

  function isValidElement(element) {
    // TODO complete ?? 
    console.log("INIT ModalFieldConfig - function isValidElement(element)")
    const valido = element && element.children.props.formData
      && element.children.props.formData[NT_nomeCampo] && element.children.props.formData[NT_nomeCampo].length >= 4
      && element.children.props.formData[NT_tipoCampo]
      && element.children.props.schema
      && element.children.props.uiSchema
      && NT_FldDatatypesConfig[element.children.props.formData[NT_tipoCampo]]
    if (valido) {
      init_FldDatatypesConfig(element.children.props.formData[NT_tipoCampo])
      formDataInput = props.element.children.props.formData
    }
    return valido
  }

  function getDatatypeSchema(tipoCampo) {
    let schemaNew = Object.assign({}, fldDatatypesConfig.jsSchema)
    schemaNew.required = fldDatatypesConfig.requiredProps

    return schemaNew
  }

  function getDatatypeUiSchema(tipoCampo) {
    let uiSchemaNew = Object.assign({}, fldDatatypesConfig.uiSchema)

    return uiSchemaNew
  } 

  function handleOnChange(event) {
    if (formDataInput[NT_tipoCampo] === NT_FldDatatypeCfgForeignKey) {
      if (event.formData.foreignKey && event.formData.foreignKey.fkTable) {
        const schema = cloneDeep(FCF_data.schema)
        NT_FldDatatypesProps[NT_FldDatatypesPropsFK].initFieldDspFld(event.formData.foreignKey.fkTable, schema.properties.foreignKey)
console.log("===============> setFCF_data")
        setFCF_data({
          formData: event.formData, 
          schema: schema,
          uischema: event.uiSchema
        })
      }
    }
  }

  function validateFields(formData, errors) {
    Object.entries(fldDatatypesConfig.validateField).forEach(([key, validateFunc]) => {
      if (validateFunc) validateFunc(formData[key], errors[key])
    })
    return errors
  }

  if (!props.show)
    return null
  else if (!isValidElement(props.element))
    return (
      <Modal
        // {...props}
        show={props.show}
        onHide={props.onHide}
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
          {!isInvalidTipoCampo(props.element)
            ? ( <Alert variant="warning">
                <Alert.Heading>Campo com informação incompleta</Alert.Heading><hr/>
                <p>Ocorreu uma situação inválida ao tentar configurar o campo.</p>
                <p className="mb-0">Verifique se o nome do campo (com um mínimo de 4 carateres) e o seu tipo de dados estão corretamente definidos.</p>
                </Alert>)
            : ( <Alert variant="danger">
                <Alert.Heading>Erro de execução</Alert.Heading><hr/>
                <p>Ocorreu um erro grave: tipo de dados sem características definidas</p>
                <p>Contacte o gestor da plataforma</p>
                </Alert>)
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    )
  else
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        //onEnter    = { function(){ console.log( "onEnter   " ); console.log( props ) }}
      // onEntering = { function(){ console.log( "onEntering" ) }}
        //onEntered  = { function(){ console.log( "onEntered " ) }}
        // onSubmit = {props.onSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Propriedade de campo de novo tema
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-4">
            <Card.Body variant="info">
              <Card.Subtitle className="mb-2">Especificação das propriedades específicas do campo</Card.Subtitle>
              <Card.Text className="mb-1 text-muted">com o identificador: <span className="font-weight-bold text-dark">{formDataInput[NT_nomeCampo]}</span></Card.Text>
              <Card.Text className="mb-1 text-muted">com o tipo de dados: <span className="font-weight-bold text-dark">{formDataInput[NT_tipoCampo]}</span></Card.Text>
              <Card.Text className="mb-1 text-muted">é campo chave: <span className="font-weight-bold text-dark">{(formDataInput.chave || false) ? "Sim" : "Não"}</span></Card.Text>
              <Card.Text className="mb-1 text-muted">é campo de preenchimento obrigatório: <span className="font-weight-bold text-dark">{(formDataInput.obrigatorio || false) ? "Sim" : "Não"}</span></Card.Text>
              <Card.Text className="mb-0 text-muted">o campo aparece na tabela com a listagem de registos: <span className="font-weight-bold text-dark">{(formDataInput.onList || false) ? "Sim" : "Não"}</span></Card.Text>
            </Card.Body>
          </Card>
          <Form
            className={"rjsf-newTheme-FldConfig"}
            schema={FCF_data.schema} // DELETE ? {props.element && getDatatypeSchema(formDataInput[NT_tipoCampo])}
            uiSchema={props.element && getDatatypeUiSchema(formDataInput[NT_tipoCampo])}
            formData={FCF_data.formData} // DELETE ? {props.element && formDataInput.specific}
            /* schema={props.element && getDatatypeSchema(formDataInput[NT_tipoCampo])}
            uiSchema={props.element && getDatatypeUiSchema(formDataInput[NT_tipoCampo])}
            formData={props.element && formDataInput.specific} */
            onChange={handleOnChange}
            validate={validateFields}
            showErrorList={false}
            onError={(errors) => {}}
            onSubmit={handleSubmit}
            formContext={props.formContext}
            widgets={NTwidgets}
            >
            <Button className="float-left" variant="danger" onClick={props.onHide} >Cancelar</Button>
            <Button className="float-right" type="submit" variant="primary" >Gravar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
}

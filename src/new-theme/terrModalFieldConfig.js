/**
 * React component to config fields of a theme
 */
import React from 'react'
import { Modal, Button, Card, Alert } from 'react-bootstrap'
import Form from '@rjsf/bootstrap-4'
import { NT_nomeCampo, NT_tipoCampo } from './terrThemeTemplates'
import { NTwidgets } from './terrThemeWidgets'
import { NT_fieldTypeConfig } from './terrSchemasDefs'

export function FieldConfig(props) {
  let formDataInput = undefined

  const handleSubmit = ({ formData }, event) => {
    console.log("-- FieldCONFIG -- ENTROU EM handleSubmit " + props.show)
    event.preventDefault()
    // event.stopPropagations()
    
    // console.log(props.element.index, formData)
    // props.updelement(formData)
    props.element.children.props.onChange(Object.assign(formDataInput, { specific: formData }))
    props.onHide()
  }

 /* function updFormData(formData) {
  // event.preventDefault()
  console.log("==> updFormData")
  console.log(formData)
 } */

  function isInvalidTipoCampo(element)
  {
    return element && element.children.props.formData
     && element.children.props.formData[NT_tipoCampo]
     && NT_fieldTypeConfig[element.children.props.formData[NT_tipoCampo]] === undefined
  }

  function isValidElement(element) {
    console.log("-- FieldCONFIG -- ENTROU EM isValidElement " + props.show)
    // TODO complete  
    const valido = element && element.children.props.formData
      && element.children.props.formData[NT_nomeCampo] && element.children.props.formData[NT_nomeCampo].length >= 4
      && element.children.props.formData[NT_tipoCampo]
      && element.children.props.schema
      && element.children.props.uiSchema
      && NT_fieldTypeConfig[element.children.props.formData[NT_tipoCampo]]
    if (valido) formDataInput = props.element.children.props.formData
    return valido
  }

  function getDatatypeSchema(tipoCampo) {
    console.log("-- FieldCONFIG -- ENTROU EM processSchema " + props.show)
    let schemaNew = Object.assign({}, NT_fieldTypeConfig[tipoCampo].schema)
    schemaNew.properties = Object.assign({}, NT_fieldTypeConfig.common_fields.schema_properties, schemaNew.properties)
    // console.log(props.formContext) // ??
    return schemaNew
  }

  function getDatatypeUiSchema(tipoCampo) {
    console.log("-- FieldCONFIG -- ENTROU EM getUiSchema " + props.show)
    let uiSchemaNew = Object.assign({}, NT_fieldTypeConfig[tipoCampo].uiSchema)
    Object.assign(uiSchemaNew, NT_fieldTypeConfig.common_fields.uiSchema)
    return uiSchemaNew
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
              <Card.Text className="mb-1 text-muted">é um campo chave: <span className="font-weight-bold text-dark">{(formDataInput.chave || false) ? "Sim" : "Não"}</span></Card.Text>
              <Card.Text className="mb-0 text-muted">é um campo de preenchimento obrigatório: <span className="font-weight-bold text-dark">{(formDataInput.obrigatorio || false) ? "Sim" : "Não"}</span></Card.Text>
            </Card.Body>
          </Card>
          <Form
            className={"rjsf-newTheme-FldConfig"}
            schema={props.element && getDatatypeSchema(formDataInput[NT_tipoCampo])}
            formData={props.element && formDataInput.specific}
            uiSchema={props.element && getDatatypeUiSchema(formDataInput[NT_tipoCampo])}
            showErrorList={false}
            onError={console.error}
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

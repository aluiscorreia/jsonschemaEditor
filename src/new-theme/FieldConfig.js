
import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from './../rjsf-bs4/src/index'

export function FieldConfig(props) {
  
  return (
    <Modal
      // {...props}
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEnter    = { function(){ console.log( "onEnter   " ); console.log( props ) }}
      onEntering = { function(){ console.log( "onEntering" ) }}
      onEntered  = { function(){ console.log( "onEntered " ) }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        {props.element && (
          <Form
            className="col-7"
            schema={props.element && props.element.children.props.schema}
            formData={props.element && props.element.children.props.formData}
            uiSchema={props.element && props.element.children.props.schema}
            // onChange={(event) => onChange(event) }
            onError={console.error}
            // onSubmit={(data)=>processSubmit(data.formData)}
          >
            <Fragment />
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => console.log("TODO")}>OK</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

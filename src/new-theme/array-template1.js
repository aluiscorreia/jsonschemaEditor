import React, { useState } from "react"
import { FieldConfig } from './terrModalFieldConfig'

const MyStringWidget = (props) => {
  return (
    <input type="text"
      className="custom"
      value={props.value}
      required={props.required}
      onChange={(event) => props.onChange(event.target.value)} />
  )
}

export const myWidgets = {
  myStringWidget: MyStringWidget
}

export function CustomFieldTemplate(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  return (
    <div className={classNames}>
      <label htmlFor={id}>{label}{required ? "*#*" : null}</label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  )
}

export function ObjectFieldTemplate(props) {
  return (
    <div>
      <props.TitleField title={props.title} />
      <div className="row">
        {props.properties.map(prop => (
          <div
            className="col-lg-2 col-md-4 col-sm-6 col-xs-12"
            key={prop.content.key}>
            {prop.content}
          </div>
        ))}
      </div>
      {props.description}
    </div>
  );
}

export function ArrayFieldTemplate1(props) {
  const [modalShow, setModalShow] = useState(false)
  const [actualElement, setActualElement] = useState(null)

  function processSubmit(index, arraydata) {
    console.log("==> processSubmit in FieldConfig in ArrayFieldTemplate1 - Index: " + index)
    console.log(arraydata)
  }

  return (
    <>
    <props.TitleField
        key={`array-field-title-${props.idSchema.$id}`}
        TitleField={props.TitleField}
        idSchema={props.idSchema}
        title={props.uiSchema["ui:title"] || props.title}
        required={props.required}
      />
    <div className={props.className}>
      {props.items &&
        props.items.map(element => (
          <div key={element.key} className={element.className}>
            <div>{element.children}</div>
            {element.hasMoveDown && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1
                )}>
                Down
              </button>
            )}
            {element.hasMoveUp && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}>
                Up
              </button>
            )}
            <button onClick={element.onDropIndexClick(element.index)}>
              Delete
            </button>
            <button onClick={(event) => { 
              if (event) event.preventDefault()
              console.log(props)
              console.log(element)
              setActualElement(element); setModalShow(true) }}>
              Configuração
            </button>
            <hr />
          </div>
        ))}

      {props.canAdd && (
        <div className="row">
          <p className="col-3 offset-9 array-item-add text-right">
            <button onClick={props.onAddClick} type="button">
              Custom +
            </button>
          </p>
        </div>
      )}
    </div>
    <FieldConfig
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        element={actualElement}
        onSubmit={processSubmit}
      />
    </>
  );
}


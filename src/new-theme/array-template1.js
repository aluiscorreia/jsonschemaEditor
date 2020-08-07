import React, { useState } from "react"
import { FieldConfig } from './FieldConfig'

export function ArrayFieldTemplate1(props) {
  const [modalShow, setModalShow] = useState(false)
  const [actualElement, setActualElement] = useState(null)

  return (
    <>
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
            <button onClick={() => { setActualElement(element); setModalShow(true) }}>
              Configuração
            </button>
            <hr />
          </div>
        ))}

      {props.canAdd && (
        <div className="row">
          <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
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
      />
    </>
  );
}


/**
 * Data structures and functions for table template for definition of fields of a theme
 */
import React, { useState } from "react"
import { FieldConfigForm } from './terrModalFieldConfig'

// ========================================================================
// Gobal Variables
// IMPORTANT: Sum of col values must be equal to 12
export const NT_ButtonsColID = "buttons"
export const NT_nomeCampo = "campo"
export const NT_tipoCampo = "tipo"
export const NT_FieldsTable = {
  [NT_nomeCampo]: { title: "Nome do campo*", colSize: "col-4", cssHeader: "td-vcenter", cssCell: "td-vcenter", style: "" }, 
  [NT_tipoCampo]: { title: "Tipo de dados*", colSize: "col-3", cssHeader: "td-vcenter", cssCell: "td-vcenter", style: "" },
  chave: { title: "Campo chave?", colSize: "col-1", cssHeader: "td-vcenter", cssCell: "td-vcenter", styles: { textAlign: "center" } },
  obrigatorio: { title: "Preench. Obrig.?", colSize: "col-1", cssHeader: "td-vcenter", cssCell: "td-vcenter", styles: { textAlign: "center"} },
  onList: { title: "Incluir na listagem?", colSize: "col-1", cssHeader: "td-vcenter", cssCell: "td-vcenter", styles: { textAlign: "center"} },
  [NT_ButtonsColID]: { title: "", colSize: "col-2", cssHeader: "", cssCell: "", style: { marginLeft: "auto"} }
}

const fieldsCols = Object.keys(NT_FieldsTable) // props.uiSchema["ui:ListFieldCols"]

// // ========================================================================
// //
// export function FieldCellWithoutLabelTemplate(props) {
//   const {classNames, help, description, errors, children, id, label, required} = props;
//   return (
//     <div className={classNames}>
//       {/* <label htmlFor={id}>{label}{required ? "*#*" : null}</label> */}
//       {label}
//       {children}
//       {description}

//       {errors}
//       {help}
//     </div>
//   )
// }

// ========================================================================
// Auxiliary function
function _getFieldValue(element, key) {
  return element.props ? 
    element.props.formData ? 
      element.props.formData.hasOwnProperty(key) ? element.props.formData[key] : undefined
    : undefined
  : undefined
}

// ========================================================================
// Template to generate each column of table (<td>...</td>)
export function RowTableColFieldObjTemplate(props) {
  const formData = props.formData
  return props.properties.map(prop => {
    prop.content.props.uiSchema["ui:disabled"] = (formData[prop.name + "Disabled"] === undefined ? false : formData[prop.name + "Disabled"])
    const ret = fieldsCols.includes(prop.name) && (
      <td 
        className={`${NT_FieldsTable[prop.name].colSize} ${NT_FieldsTable[prop.name].cssCell}`} 
        style={NT_FieldsTable[prop.name].styles} 
        key={prop.content.key}
      >
        {(formData[prop.name + "Removed"] === undefined ? true : !formData[prop.name + "Removed"]) && prop.content}
      </td>
    )
    return ret
  })
}

// ========================================================================
// Template that "concatenate" the columns of a row table
export function ListFieldRowTableTemplate(props) {
  return (
    <>
      {props.description}
      {props.children}
      {props.errors}
      {props.help}
    </>
  )
}

// ========================================================================
// Template to present array of fields
// Used in the two templates
function IconButton(props) {
  const { type = "default", icon, className, ...otherProps } = props;
  return (
    <button
      type="button"
      className={`btn btn-${type} ${className}`}
      {...otherProps}>
      <i className={`fas fa-${icon}`} />
    </button>
  )
}

function RowTableItem(rowProps, openModal) {
  const btnStyle = {
    flex: "0 0 25px",
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: "bold",
    marginLeft: 1,
    marginRight: 1
  };
  return (
    <tr className="row m-0" key={rowProps.key}>
      {rowProps.children}

      {rowProps.hasToolbar && ( 
        <td className={`${NT_FieldsTable[NT_ButtonsColID].colSize} ${NT_FieldsTable[NT_ButtonsColID].cssCell}`} style={NT_FieldsTable[NT_ButtonsColID].styles} >
          <div
            className="btn-group"
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
            {(rowProps.hasMoveUp || rowProps.hasMoveDown) && (
              <IconButton
                type="outline-dark"
                icon="arrow-up"
                aria-label="Move up"
                className="array-item-move-up"
                tabIndex="-1"
                style={btnStyle}
                disabled={rowProps.disabled || rowProps.readonly || !rowProps.hasMoveUp}
                onClick={rowProps.onReorderClick(rowProps.index, rowProps.index - 1)}
              />
            )}

            {(rowProps.hasMoveUp || rowProps.hasMoveDown) && (
              <IconButton
                type="outline-dark"
                icon="arrow-down"
                className="array-item-move-down"
                aria-label="Move down"
                tabIndex="-1"
                style={btnStyle}
                disabled={
                  rowProps.disabled || rowProps.readonly || !rowProps.hasMoveDown
                }
                onClick={rowProps.onReorderClick(rowProps.index, rowProps.index + 1)}
              />
            )}{' '}

            {rowProps.hasRemove && (
              <IconButton
                type="outline-danger"
                icon="trash-alt"
                aria-label="Remove"
                className="array-item-remove"
                tabIndex="-1"
                title="Remover campo"
                style={btnStyle}
                disabled={rowProps.disabled || rowProps.readonly || _getFieldValue(rowProps.children,"removeDisabled")}
                onClick={rowProps.onDropIndexClick(rowProps.index)}
              />
            )}
            <IconButton
                type="outline-info"
                icon="cog"
                aria-label="Detalhes"
                className="array-item-settings"
                tabIndex="-1"
                title="Configurar propriedades"
                style={btnStyle}
                disabled={rowProps.disabled || rowProps.readonly || _getFieldValue(rowProps.children,"configDisabled")}
                onClick={(event) => { 
                  if (event) event.preventDefault()
                  openModal(rowProps) 
                }}
              />
          </div>
        </td>
      )}
    </tr>
  )
}

export function ListFieldAsTableTemplate(props) {
  const [modalShow, setModalShow] = useState(false)
  const [actualElement, setActualElement] = useState(null)

  const openModal = (element) => {
    setActualElement(element); 
    setModalShow(true)
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
      <table className="table table-sm">
        <thead><tr className="row m-0" key={`table-item-list-${props.idSchema.$id}`}>
          {fieldsCols.map((col, colIndex) => (
            <th scope="col" className={`th-newTheme ${NT_FieldsTable[col].colSize} ${NT_FieldsTable[col].cssHeader}`} style={NT_FieldsTable[col].styles} key={`table-item-list-header-${col}`}>
              {col !== NT_ButtonsColID ? NT_FieldsTable[col].title : (
                <div className="row">
                  <p className={`col-6 offset-6 text-right array-item-add`}>
                    <IconButton
                      type="info"
                      icon="plus"
                      className="btn-add"
                      aria-label="Add"
                      tabIndex="0"
                      title="Adicionar campo"
                      onClick={props.onAddClick}
                      disabled={props.disabled || props.readonly}
                    />
                  </p>
                </div>
              )}
            </th>
          ))}
        </tr></thead>
        <tbody>
            {props.items &&
              props.items.map( element => RowTableItem(element, openModal))
            }
        </tbody> 
      </table>
    </div>
    <FieldConfigForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        element={actualElement}
        formContext={props.formContext}
        // onSubmit={processSubmit}
      />
    </>
  );
}

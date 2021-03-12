/**
 * New widgets for React JSON Form Schema 
 */
import React from "react"
import Form from 'react-bootstrap/Form'
import { utils } from "@rjsf/core"

// ========================================================================
// A switch widget 
// export function _NTSwitchWidget(props) {
//   return (
//     <button id="custom" className={props.value ? "checked" : "unchecked"} onClick={() => props.onChange(!props.value)}>
//         {String(props.value ? "Sim" : "Não")}
//     </button>
//   );
// }

// export function __NTSwitchWidget(props) {
//   return (
//     <div className="custom-control custom-switch">
//       <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
//     </div>
//   );
// }

function NTSwitchWidget(props) {
  return (
    <Form.Group  className={`checkbox ${props.disabled || props.readonly ? "disabled" : ""}`}>
      <Form.Check
        id={props.id}
        label={typeof props.options.label === "undefined" || props.options.label === true ? props.label : ""}
        checked={typeof props.value === "undefined" ? false : props.value}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readonly}
        autoFocus={props.autofocus}
        type="switch"
        onChange={({target: { checked }}) => props.onChange(checked)}
        onBlur={({target: { checked }}) => props.onBlur(props.id, checked)}
        onFocus={({target: { checked }}) => props.onFocus(props.id, checked)}
        // onClick={({target: { checked }}) => props.onChange(checked)}
        // aria-label="option 1"
      />
    </Form.Group>
  );
}

// ========================================================================
// A text widget that considers "options": { label: true/false }
// ADAPTED FROM: https://github.com/rjsf-team/react-jsonschema-form/blob/6f3c4c78765cbae67b91bf7762094c9b7e38c7d1/packages/bootstrap-4/src/TextWidget/TextWidget.tsx
function NTTextWidget({
  id, required, readonly, disabled, type, label, value, onChange, onBlur, onFocus, autofocus, placeholder, options, schema, rawErrors = []
}) {
  const _onChange = ({ target: { value } }) => onChange(value === "" ? options.emptyValue : value)
  const _onBlur = ({ target: { value } }) => onBlur(id, value)
  const _onFocus = ({ target: { value } }) => onFocus(id, value)

  // const classNames = [rawErrors.length > 0 ? "is-invalid" : "", type === 'file' ? 'custom-file-label': ""]
  return (
    <Form.Group className="mb-0">
      {(typeof options.label === "undefined" || options.label === true) && (
        <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
          {label || schema.title}
          {(label || schema.title) && required ? "*" : null}
        </Form.Label>
      )}
      <Form.Control
        id={id}
        autoFocus={autofocus}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        className={rawErrors.length > 0 ? "is-invalid" : ""}
        list={schema.examples ? `examples_${id}` : undefined}
        type={type || schema.type}
        placeholder={placeholder}
        value={value || value === 0 ? value : ""}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}

      />
      {schema.examples ? (
        <datalist id={`examples_${id}`}>
          {schema.examples
            .concat(schema.default ? ([schema.default]) : [])
            .map((example) => {
              return <option key={example} value={example} />
            })}
        </datalist>
      ) : null}
    </Form.Group>
  )
}

// ========================================================================
// A select widget that considers "options": { label: true/false }
// ADAPTED FROM: https://github.com/rjsf-team/react-jsonschema-form/blob/6f3c4c78765cbae67b91bf7762094c9b7e38c7d1/packages/bootstrap-4/src/SelectWidget/SelectWidget.tsx
const nums = new Set(["number", "integer"]);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema, value) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;
  if (value === "") {
    return undefined;
  } else if (type === "array" && items && nums.has(items.type)) {
    return value.map(utils.asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return utils.asNumber(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every(x => utils.guessType(x) === "number")) {
      return utils.asNumber(value);
    } else if (schema.enum.every(x => utils.guessType(x) === "boolean")) {
      return value === "true";
    }
  }

  return value;
}

function NTSelectWidget({
  schema, id, options, label, required, disabled, readonly, value, multiple, autofocus, onChange, onBlur,  onFocus,  placeholder, rawErrors = []
}) {
  const { enumOptions, enumDisabled } = options;

  const emptyValue = multiple ? [] : "";

  function getValue(event, multiple) {
    if (multiple) {
      return [].slice
        .call(event.target.options)
        .filter(o => o.selected)
        .map(o => o.value)
    } else {
      return event.target.value;
    }
  }

  return (
    <Form.Group>
      {(typeof options.label === "undefined" || options.label === true) && (
        <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
          {label || schema.title}
          {(label || schema.title) && required ? "*" : null}
        </Form.Label>
      )}
      <Form.Control
        as="select"
        custom
        id={id}
        value={typeof value === "undefined" ? emptyValue : value}
        required={required}
        multiple={multiple}
        disabled={disabled}
        readOnly={readonly}
        autoFocus={autofocus}
        className={rawErrors.length > 0 ? "is-invalid" : ""}
        onBlur={
          onBlur &&
          (event => {
            const newValue = getValue(event, multiple);
            onBlur(id, processValue(schema, newValue));
          })
        }
        onFocus={
          onFocus &&
          (event => {
            const newValue = getValue(event, multiple);
            onFocus(id, processValue(schema, newValue));
          })
        }
        onChange={event => {
          const newValue = getValue(event, multiple);
          onChange(processValue(schema, newValue));
        }}>
        {!multiple && schema.default === undefined && (
          <option value="">{placeholder}</option>
        )}
        {enumOptions.map(({ value, label }, i) => {
          const disabled =
            Array.isArray(enumDisabled) &&
            enumDisabled.indexOf(value) !== -1;
          return (
            <option key={i} id={label} value={value} disabled={disabled}>
              {label}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  )
}

// --- EXPORTING WIDGETS
export const NTwidgets = {
  ntSwitchWidget: NTSwitchWidget,
  TextWidget: NTTextWidget,
  SelectWidget: NTSelectWidget
}
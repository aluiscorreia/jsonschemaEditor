/**
 * Data structures and functions for theme and field definition
 */
import { RowTableColFieldObjTemplate, ListFieldRowTableTemplate } from "./terrThemeTemplates"
// ========================================================================
// Auxiliary functions
// ========================================================================
function validateVarnameForDB(varname) {
  const reservedWordsSQL = new Set(['A', 'ABORT', 'ABS', 'ABSENT', 'ABSOLUTE', 'ACCESS', 'ACCORDING', 'ACTION', 'ADA', 'ADD', 'ADMIN', 'AFTER', 'AGGREGATE', 'ALL', 'ALLOCATE', 'ALSO', 'ALTER', 'ALWAYS', 'ANALYSE', 'ANALYZE', 'AND', 'ANY', 'ARE', 'ARRAY', 'ARRAY_AGG', 'ARRAY_MAX_CARDINALITY', 'AS', 'ASC', 'ASENSITIVE', 'ASSERTION', 'ASSIGNMENT', 'ASYMMETRIC', 'AT', 'ATOMIC', 'ATTRIBUTE', 'ATTRIBUTES', 'AUTHORIZATION', 'AVG', 'BACKWARD', 'BASE64', 'BEFORE', 'BEGIN', 'BEGIN_FRAME', 'BEGIN_PARTITION', 'BERNOULLI', 'BETWEEN', 'BIGINT', 'BINARY', 'BIT', 'BIT_LENGTH', 'BLOB', 'BLOCKED', 'BOM', 'BOOLEAN', 'BOTH', 'BREADTH', 'BY', 'C', 'CACHE', 'CALL', 'CALLED', 'CARDINALITY', 'CASCADE', 'CASCADED', 'CASE', 'CAST', 'CATALOG', 'CATALOG_NAME', 'CEIL', 'CEILING', 'CHAIN', 'CHAR', 'CHARACTER', 'CHARACTERISTICS', 'CHARACTERS', 'CHARACTER_LENGTH', 'CHARACTER_SET_CATALOG', 'CHARACTER_SET_NAME', 'CHARACTER_SET_SCHEMA', 'CHAR_LENGTH', 'CHECK', 'CHECKPOINT', 'CLASS', 'CLASS_ORIGIN', 'CLOB', 'CLOSE', 'CLUSTER', 'COALESCE', 'COBOL', 'COLLATE', 'COLLATION', 'COLLATION_CATALOG', 'COLLATION_NAME', 'COLLATION_SCHEMA', 'COLLECT', 'COLUMN', 'COLUMNS', 'COLUMN_NAME', 'COMMAND_FUNCTION', 'COMMAND_FUNCTION_CODE', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', 'CONCURRENTLY', 'CONDITION', 'CONDITION_NUMBER', 'CONFIGURATION', 'CONFLICT', 'CONNECT', 'CONNECTION', 'CONNECTION_NAME', 'CONSTRAINT', 'CONSTRAINTS', 'CONSTRAINT_CATALOG', 'CONSTRAINT_NAME', 'CONSTRAINT_SCHEMA', 'CONSTRUCTOR', 'CONTAINS', 'CONTENT', 'CONTINUE', 'CONTROL', 'CONVERSION', 'CONVERT', 'COPY', 'CORR', 'CORRESPONDING', 'COST', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CSV', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_ROW', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CURSOR_NAME', 'CYCLE', 'DATA', 'DATABASE', 'DATALINK', 'DATE', 'DATETIME_INTERVAL_CODE', 'DATETIME_INTERVAL_PRECISION', 'DAY', 'DB', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFERRABLE', 'DEFERRED', 'DEFINED', 'DEFINER', 'DEGREE', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DENSE_RANK', 'DEPTH', 'DEREF', 'DERIVED', 'DESC', 'DESCRIBE', 'DESCRIPTOR', 'DETERMINISTIC', 'DIAGNOSTICS', 'DICTIONARY', 'DISABLE', 'DISCARD', 'DISCONNECT', 'DISPATCH', 'DISTINCT', 'DLNEWCOPY', 'DLPREVIOUSCOPY', 'DLURLCOMPLETE', 'DLURLCOMPLETEONLY', 'DLURLCOMPLETEWRITE', 'DLURLPATH', 'DLURLPATHONLY', 'DLURLPATHWRITE', 'DLURLSCHEME', 'DLURLSERVER', 'DLVALUE', 'DO', 'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', 'DYNAMIC', 'DYNAMIC_FUNCTION', 'DYNAMIC_FUNCTION_CODE', 'EACH', 'ELEMENT', 'ELSE', 'EMPTY', 'ENABLE', 'ENCODING', 'ENCRYPTED', 'END', 'END-EXEC', 'END_FRAME', 'END_PARTITION', 'ENFORCED', 'ENUM', 'EQUALS', 'ESCAPE', 'EVENT', 'EVERY', 'EXCEPT', 'EXCEPTION', 'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXEC', 'EXECUTE', 'EXISTS', 'EXP', 'EXPLAIN', 'EXPRESSION', 'EXTENSION', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FAMILY', 'FETCH', 'FILE', 'FILTER', 'FINAL', 'FIRST', 'FIRST_VALUE', 'FLAG', 'FLOAT', 'FLOOR', 'FOLLOWING', 'FOR', 'FORCE', 'FOREIGN', 'FORTRAN', 'FORWARD', 'FOUND', 'FRAME_ROW', 'FREE', 'FREEZE', 'FROM', 'FS', 'FULL', 'FUNCTION', 'FUNCTIONS', 'FUSION', 'G', 'GENERAL', 'GENERATED', 'GET', 'GLOBAL', 'GO', 'GOTO', 'GRANT', 'GRANTED', 'GREATEST', 'GROUP', 'GROUPING', 'GROUPS', 'HANDLER', 'HAVING', 'HEADER', 'HEX', 'HIERARCHY', 'HOLD', 'HOUR', 'ID', 'IDENTITY', 'IF', 'IGNORE', 'ILIKE', 'IMMEDIATE', 'IMMEDIATELY', 'IMMUTABLE', 'IMPLEMENTATION', 'IMPLICIT', 'IMPORT', 'IN', 'INCLUDING', 'INCREMENT', 'INDENT', 'INDEX', 'INDEXES', 'INDICATOR', 'INHERIT', 'INHERITS', 'INITIALLY', 'INLINE', 'INNER', 'INOUT', 'INPUT', 'INSENSITIVE', 'INSERT', 'INSTANCE', 'INSTANTIABLE', 'INSTEAD', 'INT', 'INTEGER', 'INTEGRITY', 'INTERSECT', 'INTERSECTION', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISNULL', 'ISOLATION', 'JOIN', 'K', 'KEY', 'KEY_MEMBER', 'KEY_TYPE', 'LABEL', 'LAG', 'LANGUAGE', 'LARGE', 'LAST', 'LAST_VALUE', 'LATERAL', 'LEAD', 'LEADING', 'LEAKPROOF', 'LEAST', 'LEFT', 'LENGTH', 'LEVEL', 'LIBRARY', 'LIKE', 'LIKE_REGEX', 'LIMIT', 'LINK', 'LISTEN', 'LN', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATION', 'LOCATOR', 'LOCK', 'LOCKED', 'LOGGED', 'LOWER', 'M', 'MAP', 'MAPPING', 'MATCH', 'MATCHED', 'MATERIALIZED', 'MAX', 'MAXVALUE', 'MAX_CARDINALITY', 'MEMBER', 'MERGE', 'MESSAGE_LENGTH', 'MESSAGE_OCTET_LENGTH', 'MESSAGE_TEXT', 'METHOD', 'MIN', 'MINUTE', 'MINVALUE', 'MOD', 'MODE', 'MODIFIES', 'MODULE', 'MONTH', 'MORE', 'MOVE', 'MULTISET', 'MUMPS', 'NAME', 'NAMES', 'NAMESPACE', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NESTING', 'NEW', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NIL', 'NO', 'NONE', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NOTHING', 'NOTIFY', 'NOTNULL', 'NOWAIT', 'NTH_VALUE', 'NTILE', 'NULL', 'NULLABLE', 'NULLIF', 'NULLS', 'NUMBER', 'NUMERIC', 'OBJECT', 'OCCURRENCES_REGEX', 'OCTETS', 'OCTET_LENGTH', 'OF', 'OFF', 'OFFSET', 'OIDS', 'OLD', 'ON', 'ONLY', 'OPEN', 'OPERATOR', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'ORDERING', 'ORDINALITY', 'OTHERS', 'OUT', 'OUTER', 'OUTPUT', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'OWNED', 'OWNER', 'P', 'PAD', 'PARAMETER', 'PARAMETER_MODE', 'PARAMETER_NAME', 'PARAMETER_ORDINAL_POSITION', 'PARAMETER_SPECIFIC_CATALOG', 'PARAMETER_SPECIFIC_NAME', 'PARAMETER_SPECIFIC_SCHEMA', 'PARSER', 'PARTIAL', 'PARTITION', 'PASCAL', 'PASSING', 'PASSTHROUGH', 'PASSWORD', 'PATH', 'PERCENT', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'PERIOD', 'PERMISSION', 'PLACING', 'PLANS', 'PLI', 'POLICY', 'PORTION', 'POSITION', 'POSITION_REGEX', 'POWER', 'PRECEDES', 'PRECEDING', 'PRECISION', 'PREPARE', 'PREPARED', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROGRAM', 'PUBLIC', 'QUOTE', 'RANGE', 'RANK', 'READ', 'READS', 'REAL', 'REASSIGN', 'RECHECK', 'RECOVERY', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'REINDEX', 'RELATIVE', 'RELEASE', 'RENAME', 'REPEATABLE', 'REPLACE', 'REPLICA', 'REQUIRING', 'RESET', 'RESPECT', 'RESTART', 'RESTORE', 'RESTRICT', 'RESULT', 'RETURN', 'RETURNED_CARDINALITY', 'RETURNED_LENGTH', 'RETURNED_OCTET_LENGTH', 'RETURNED_SQLSTATE', 'RETURNING', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROUTINE_CATALOG', 'ROUTINE_NAME', 'ROUTINE_SCHEMA', 'ROW', 'ROWS', 'ROW_COUNT', 'ROW_NUMBER', 'RULE', 'SAVEPOINT', 'SCALE', 'SCHEMA', 'SCHEMA_NAME', 'SCOPE', 'SCOPE_CATALOG', 'SCOPE_NAME', 'SCOPE_SCHEMA', 'SCROLL', 'SEARCH', 'SECOND', 'SECTION', 'SECURITY', 'SELECT', 'SELECTIVE', 'SELF', 'SENSITIVE', 'SEQUENCE', 'SEQUENCES', 'SERIALIZABLE', 'SERVER', 'SERVER_NAME', 'SESSION', 'SESSION_USER', 'SET', 'SETOF', 'SETS', 'SHARE', 'SHOW', 'SIMILAR', 'SIMPLE', 'SIZE', 'SKIP', 'SMALLINT', 'SNAPSHOT', 'SOME', 'SOURCE', 'SPACE', 'SPECIFIC', 'SPECIFICTYPE', 'SPECIFIC_NAME', 'SQL', 'SQLCODE', 'SQLERROR', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'STABLE', 'STANDALONE', 'START', 'STATE', 'STATEMENT', 'STATIC', 'STATISTICS', 'STDDEV_POP', 'STDDEV_SAMP', 'STDIN', 'STDOUT', 'STORAGE', 'STRICT', 'STRIP', 'STRUCTURE', 'STYLE', 'SUBCLASS_ORIGIN', 'SUBMULTISET', 'SUBSTRING', 'SUBSTRING_REGEX', 'SUCCEEDS', 'SUM', 'SYMMETRIC', 'SYSID', 'SYSTEM', 'SYSTEM_TIME', 'SYSTEM_USER', 'T', 'TABLE', 'TABLES', 'TABLESAMPLE', 'TABLESPACE', 'TABLE_NAME', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEXT', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TOKEN', 'TOP_LEVEL_COUNT', 'TRAILING', 'TRANSACTION', 'TRANSACTIONS_COMMITTED', 'TRANSACTIONS_ROLLED_BACK', 'TRANSACTION_ACTIVE', 'TRANSFORM', 'TRANSFORMS', 'TRANSLATE', 'TRANSLATE_REGEX', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIGGER_CATALOG', 'TRIGGER_NAME', 'TRIGGER_SCHEMA', 'TRIM', 'TRIM_ARRAY', 'TRUE', 'TRUNCATE', 'TRUSTED', 'TYPE', 'TYPES', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNDER', 'UNENCRYPTED', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNLINK', 'UNLISTEN', 'UNLOGGED', 'UNNAMED', 'UNNEST', 'UNTIL', 'UNTYPED', 'UPDATE', 'UPPER', 'URI', 'USAGE', 'USER', 'USER_DEFINED_TYPE_CATALOG', 'USER_DEFINED_TYPE_CODE', 'USER_DEFINED_TYPE_NAME', 'USER_DEFINED_TYPE_SCHEMA', 'USING', 'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', 'VALUE_OF', 'VARBINARY', 'VARCHAR', 'VARIADIC', 'VARYING', 'VAR_POP', 'VAR_SAMP', 'VERBOSE', 'VERSION', 'VERSIONING', 'VIEW', 'VIEWS', 'VOLATILE', 'WHEN', 'WHENEVER', 'WHERE', 'WHITESPACE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'XML', 'XMLAGG', 'XMLATTRIBUTES', 'XMLBINARY', 'XMLCAST', 'XMLCOMMENT', 'XMLCONCAT', 'XMLDECLARATION', 'XMLDOCUMENT', 'XMLELEMENT', 'XMLEXISTS', 'XMLFOREST', 'XMLITERATE', 'XMLNAMESPACES', 'XMLPARSE', 'XMLPI', 'XMLQUERY', 'XMLROOT', 'XMLSCHEMA', 'XMLSERIALIZE', 'XMLTABLE', 'XMLTEXT', 'XMLVALIDATE', 'YEAR', 'YES', 'ZONE']);
  reservedWordsSQL.add('GLOBAL')
  return varname ? (reservedWordsSQL.has(varname.toUpperCase()) ? 'Valor inválido (Palavra reservada)' : null) : null
}

function transformErrorPattern(error) {
  if (error.name === "pattern") {
    error.message = "Identificador inválido (ver regras para identificadores de tabelas e campos em bases de dados)"
  }
  return error
}

function validateTipoRequiredProps(tipoCampo, formData) {
  const requiredProps = NT_FldDatatypesConfig[tipoCampo].requiredProps || []
  const formProps = Object.keys(formData.specific || {})
  return requiredProps.every(prop => formProps.includes(prop)) ? null : "Falta configurar propriedades obrigatórias"
}

// ========================================================================
// Definition of properties for Field Data Types (to be used in Theme type except for fromwms)
// ========================================================================
// Auxiliary function
function getLimValueType(datatype, isMinimum) {
  return Object.assign({}, {
    jsSchema: { title: "",
                type: "object",
                properties: {
                  value: { type: datatype,
                             title: isMinimum ? "Valor mínimo" : "Valor máximo" },
                  valueExclusive: { type: "boolean",
                                  title: isMinimum ? "Valor mínimo exclusivo (valor tem de ser 'maior que')" : "Valor máximo exclusivo (valor tem de ser 'menor que')"} } },
    toRsjfSchemaProps: isMinimum ? 
                        (obj) => obj.valueExclusive ? { exclusiveMinimum: obj.value } : { minimum: obj.value } :
                        (obj) => obj.valueExclusive ? { exclusiveMaximum: obj.value } : { maximum: obj.value }
  })
}

function getDefaultType(datatype) {
  return {
    jsSchema: { title: "Valor por omissão",
                type: datatype },
    toRsjfSchemaProps: (value) => ({ default: value })
  }
}
// GLOBAL VARIABLE WITH DEFINITIONS
export const NT_FldDatatypesProps = {
  title: {
    jsSchema: { title: "Descrição 'curta' do campo para o formulário",
                type: "string" },
    uiSchema: { "ui:autofocus": true },
    toRsjfSchemaProps: undefined,
    toRsjfSchemaUi: undefined
  },
  description: {
    jsSchema: { title: "Texto descritivo do campo",
                type: "string" }
  },
  defaultTxt: getDefaultType("string"),
  defaultInt: getDefaultType("integer"),
  defaultNum: getDefaultType("number"),
  defaultBool: {
    jsSchema: { title: "Valor por omissão",
                type: "integer",
                default: 0,
                enum: [1, 0],
                enumNames: [ "SIM - Com visto", "NÃO - Sem visto"] },
    toRsjfSchemaProps: (value) => value ? { default: true } : {}
  },
  minLength: {
    jsSchema: { title: "Número mínimo de carateres",
                type: "integer" }
  },
  maxLength: {
    jsSchema: { title: "Número máximo de carateres",
                type: "integer" }
  },
  readOnly: {
    jsSchema: { title: "Campo só de leitura (Campo editável na inserção de novo registo, não sendo depois possível alterar o seu valor)",
                type: "boolean" }
  },
  unique: {
    jsSchema: { title: "Campo com valor único",
                description: "Permite definir campo que não aceite valores repetidos",
                type: "boolean",
                default: false },
    uiSchema: { "ui:widget": "radio", "ui:inline": true },
    toRsjfSchemaProps: (value) => value ? { database: { unique: value } } : {}
  },
  pattern: {
    jsSchema: { title: "Padrão de validação",
                description: "Preencher com uma expressão regular",
                type: "string" }
  },
  minValueInt: getLimValueType("integer", true),
  maxValueInt: getLimValueType("integer", false),
  minValueNum: getLimValueType("number", true),
  maxValueNum: getLimValueType("number", false),
  decimals: {
    jsSchema: { title: "Número de casas decimais",
                type: "integer" },
    toRsjfSchemaProps: (value) => value ? { database: { decimals: value } } : {}
  },
  dateTimeType: {
    jsSchema: { title: "Tipo de dados a registar",
                type: "string",
                enum: ["date", "time", "date-time", "date-time-stz"],
                enumNames: [ "Data", "Hora", "Data e hora (com time zone)", "Data e hora (sem time zone)"] },
    toRsjfSchemaProps: (value) => value === "date-time-stz" ? { format: "date-time", database: { timezone: "ignore"} } : { format: value }
  },
  builtInFormat: {
    jsSchema: { title: "Tipo de dados prédefinidos",
                type: "string",
                enum: ["email", "hostname", "uri", "ipv4", "ipv6"],
                enumNames: [ "Endereço de correio eletrónico (email)", "Endereço de servidor na internet (ex: http://exeplo.pt/)", "Identificador único de recurso (URI)", "Endereço IPv4", "Endereço IPv6"] },
    toRsjfSchemaProps: (value) => ({ format: value })
  },
  enumList: {
    // TODO enum List
  },
  foreignKey: {
    // TODO Froreign Key
  },
  geometryType: {
    jsSchema: { title: "",
                type: "object",
                required: ["geomSrs", "geomType"],
                properties: {
                  geomSrs: { type: "integer",
                             title: "Sistema de coordenadas",
                             enum: [4326,	3763, 5018,	27493, 20790],
                             enumNames: ['WGS 84', 'ETRS89/ PT-TM06',	'Datum Lisboa/ Hayford-Gauss', 'Datum 73/ Hayford-Gauss', 'Datum Lisboa/ Hayford-Gauss com falsa origem - Coordenadas Militares']},
                  geomType: { type: "string",
                              title: "Tipo de geometria",
                              enum: ["Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"] },
                  geomAllowOverlaps: {
                              title: "Não permitir a sobreposição de geometrias?",
                              type: "boolean" }
                }
              },
    toRsjfSchemaProps: (obj) => ({ database: { type: `geometry(${obj.geomType}, ${obj.geomSrs})`,
                                               allowOverlaps: obj.geomAllowOverlaps === true ? false : undefined } }),
    toRsjfSchemaUi: (obj) => ({ "ui:widget": "customGeoInput", 
                                "ui:options": { type: obj.geomType.includes('Point') ? 'point' : obj.geomType.includes('Line') ? 'line' : 'polygon', 
                                                placeholder: `Digitalizar ${obj.geomType.includes('Point') ? 
                                                  'ponto(s)' : obj.geomType.includes('Line') ? 'linha(s)' : 'polígono(s)'}`} })
  }
}

export const NT_FldDatatypesConfig = {
  texto: {
    label: "Texto",
    inAllThemeType: true,
    jsSchemaType: "string",
    properties: ["title", "description", "unique", "defaultTxt", "minLength", "maxLength", "readOnly", "pattern"],
    requiredProps: ["title"]
  },
  inteiro: {
    label: "Número inteiro",
    inAllThemeType: true,
    jsSchemaType: "integer",
    properties: ["title", "description", "unique", "defaultInt", "minValueInt", "maxValueInt", "readOnly"],
    requiredProps: ["title"]
  },
  numero: {
    label: "Número real",
    inAllThemeType: true,
    jsSchemaType: "number",
    properties: ["title", "description", "decimals", "defaultNum", "minValueNum", "maxValueNum", "readOnly"],
    requiredProps: ["title"]
  },
  autoIncremento: {
    label: "Auto-incremento",
    inAllThemeType: true,
    jsSchemaType: "integer",
    properties: ["title", "description"],
    requiredProps: ["title"],
    toRsjfSchemaProps: (_) => ({ database: { autoIncrement: true } }),
    toRsjfSchemaUi: undefined
  },
  booleano: {
    label: "Sim/Não (checkbox)",
    inAllThemeType: true,
    jsSchemaType: "boolean",
    properties: ["title", "description", "defaultBool", "readOnly"],
    requiredProps: ["title"]
  },
  data_hora: {
    label: "Data e/ou hora",
    inAllThemeType: true,
    jsSchemaType: "string",
    properties: ["title", "description", "dateTimeType", "readOnly"],
    requiredProps: ["title", "dateTimeType"]
  },
  builtInFormat: {
    label: "Formatos prédefinidos",
    inAllThemeType: true,
    jsSchemaType: "string",
    properties: ["title", "description", "builtInFormat", "readOnly"],
    requiredProps: ["title", "builtInFormat"]
  },
  geometry: {
    label: "Dados geográficos",
    inAllThemeType: false,
    jsSchemaType: "string",
    properties: ["title", "description", "geometryType", "readOnly"],
    requiredProps: ["geometryType"]
  }
   /*,
  geometria: {},
  listaValores: {},
  chaveEstrangeira: {} */
}

const defaultThemesFldDatatypes = Object.keys(NT_FldDatatypesConfig).reduce(
  (accu, val) => { if (NT_FldDatatypesConfig[val].inAllThemeType) accu.push(val)
                   return accu }, 
  []
)
export const NT_ThemesFldDatatypesLabels = (fldDatatypes) => {
  return fldDatatypes.map(fld => NT_FldDatatypesConfig[fld] ? NT_FldDatatypesConfig[fld].label : `ERROR - tipo '${fld}'`)
}
const DefaultThemeFieldType = defaultThemesFldDatatypes[0]

// ========================================================================
// Variable Json Schema for theme type of table type
const _NT_ThemeTypeTable = {}
_NT_ThemeTypeTable.jsSchema = {
  title: "Campos a incluir no tema",
  type: "array",
  items: {
    type: "object",
    required: ["campo", "tipo"],
    properties: {
      campo: {
        title: "Código do campo",
        type: "string",
        minLength: 4,
        maxLength: 12,
        pattern: "^[a-zA-Z_][a-zA-Z0-9_]*$",
        validateField: validateVarnameForDB,
        transformError: transformErrorPattern
      },
      tipo: {
        title: "Tipo de Campo",
        type: "string",
        default: DefaultThemeFieldType,
        enum: defaultThemesFldDatatypes,
        enumNames: NT_ThemesFldDatatypesLabels(defaultThemesFldDatatypes),
        validateField: validateTipoRequiredProps
      },
      chave: {
        type: "boolean"
      },
      obrigatorio: {
        type: "boolean"
      },
      onList: {
        type: "boolean"
      }
    }
  }
}

_NT_ThemeTypeTable.uiSchema = {
  "ui:disabled": false,
  // "ui:ListFieldCols": ["campo", "title"],
  // "ui:ListFieldColsWidth": ["col-3", "col-1"],
  items: {
    "ui:ObjectFieldTemplate": RowTableColFieldObjTemplate,
    "ui:FieldTemplate": ListFieldRowTableTemplate,
    campo: {
      "ui:options": { "label": false },
      "ui:placeholder": "Indique o campo"
    },
    tipo: {
      "ui:label": false 
    },
    chave: {
      "ui:widget": "ntSwitchWidget",
      "ui:options": { "label": false }
    },
    obrigatorio: {
      "ui:widget": "ntSwitchWidget",
      "ui:options": { "label": false }
    },
    onList: {
      "ui:widget": "ntSwitchWidget",
      "ui:options": { "label": false }
    }
    // ,
    // specific: {
    //   "ui:ObjectFieldTemplate": DefaultObjectFieldTemplate,
    //   classNames: "specific-hidden-anulado",
    //   campo1: { classNames: 'col-6' }, campo2: { classNames: 'col-6' }
    // }
  }
}
// ========================================================================
// Auxiliary functions for theme types
/**
 * Create the final JSON Schema for the new theme (in final format to be inserted in database)
 * @param {*} title_form 
 * @param {*} description_form 
 * @param {*} theme_fields 
 */
function getFinalSchema_fromwms(title_form, description_form, theme_fields) {
  return { // to garantee that just correct fields are returned
    ms_url: theme_fields.ms_url,
    ms_layer: theme_fields.ms_layer
  }
}

function getFinalSchema_ThemeTypeTable(title_form, description_form, theme_fields) {
  const addToObject = (object, value) => value ? Object.assign(object || {}, value) : object
  // TODO Create final Schema
  const requiredFlds = []
  const fldsUI = {}
  let fldsProps = {}

  theme_fields.forEach(field => {
    const config = NT_FldDatatypesConfig[field.tipo]
    let fldProps = { type: config.jsSchemaType }
    let uiProps = undefined

    if (field.chave) fldProps.database = addToObject(fldProps.database, { "primaryKey": true })
    if (field.onList) fldProps.database = addToObject(fldProps.database, { "onList": true })
    if (field.obrigatorio) requiredFlds.push(field.campo)

    if (field.specific) {
      config.properties.forEach(prop => {
        if (field.specific[prop]) {
          const funcProps = NT_FldDatatypesProps[prop].toRsjfSchemaProps
          if (funcProps) fldProps = objDeepMerge(fldProps, funcProps(field.specific[prop], field.specific))
          else fldProps[prop] = field.specific[prop]
          const funcUi = NT_FldDatatypesProps[prop].toRsjfSchemaUi
          if (funcUi) uiProps = objDeepMerge(uiProps || {}, funcUi(field.specific[prop], field.specific))
        }
      })
      if (config.toRsjfSchemaProps) objDeepMerge(fldProps, config.toRsjfSchemaProps(field.specific))
      if (config.toRsjfSchemaUi) objDeepMerge(fldProps, config.toRsjfSchemaUi(field.specific))
    }

    Object.assign(fldsProps, { [field.campo]: fldProps })
    if (uiProps)
      Object.assign(fldsUI, { [field.campo]: uiProps })
  })
  return {
    json_schema: {
      type: "object",
      title: title_form,
      description: description_form,
      required: requiredFlds.length === 0 ? undefined : requiredFlds,
      properties: fldsProps
    },
    ui_schema: fldsUI
  }
}

// ========================================================================
// Functions to validate fields of a theme
function validateThemeFields_alfa(theme_fields) {
  const countValidation = (fldId, min, max, txtFld) => {
    const countChaves = Object.values(theme_fields).reduce((accu, fldProps) => (fldProps[fldId] ? accu + 1 : accu), 0)
    if (min && countChaves < min) errors.push(`Pelo menos ${min} dos campos tem de ser '${txtFld}'`)
    if (max && countChaves > max) errors.push(`Só pode ser definido até ${max} campo como '${txtFld}'`)
  }
  const errors = []
  // Validar contagem de campos
  countValidation('chave',1,1,"Campo chave")
  countValidation('onList',1,undefined,"Campo a incluir na listagem")
  /* const countChaves = Object.values(theme_fields).reduce((accu, fldProps) => (fldProps.chave ? accu + 1 : accu), 0)
  if (countChaves === 0) errors.push("Pelo menos um dos campos tem de ser 'Campo chave'")
  if (countChaves > 1) errors.push("Só pode ser definido um campo como 'Campo chave'") */

  return errors
}

// ========================================================================
// Theme type configuration that can be useed in theme definition (different for fromwms)
export const NT_ThemeTypes = {
  // == ALFA ============================= 
  alfa: { 
    desc: "Dados alfanuméricos",
    allowedFldDatatypes: defaultThemesFldDatatypes,
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: [
      { campo: undefined, tipo: "texto", chave: true, obrigatorio: true, chaveDisabled: true, removeDisabled: true }
    ],
    getFinalSchema: getFinalSchema_ThemeTypeTable,
    validateThemeFields: validateThemeFields_alfa
  },
  // == ALFAGEOM ============================= 
  alfageom: {
    desc: "Dados alfanuméricos e geográficos",
    allowedFldDatatypes: defaultThemesFldDatatypes.concat("geometry"),
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: [
      { campo: undefined, tipo: "texto", chave: true, obrigatorio: true, chaveDisabled: true, removeDisabled: true },
      { campo: "geom", tipo: "geometry", chave: false, obrigatorio: true, tipoDisabled: true, onListDisabled: true, removeDisabled: true }
    ],
    getFinalSchema: getFinalSchema_ThemeTypeTable
  },
  // == VECTORLIST ============================= 
  vectorlist: { 
    desc: "Lista de temas vetoriais",
    allowedFldDatatypes: defaultThemesFldDatatypes,
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: [],
    getFinalSchema: getFinalSchema_ThemeTypeTable
  },
  // == RASTERLIST ============================= 
  rasterlist: { 
    desc: "Lista de temas raster",
    allowedFldDatatypes: defaultThemesFldDatatypes ,
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: [],
    getFinalSchema: getFinalSchema_ThemeTypeTable
  },
  // == FROMWMS ============================= 
  fromwms: {
    desc: "Tema de um serviço WMS",
    allowedFldDatatypes: null,
    jsSchema: {
      title: "Propriedades do tema WMS",
      type: "object",
      required: ["ms_url", "ms_layer"],
      properties: {
        ms_url: {
          title: "Endereço do serviço WMS",
          type: "string",
          format: "url"
        },
        ms_layer: {
          title: "Identificador do tema (WMS layer name)",
          type: "string"
        }
      }
    },
    uiSchema: {
      ms_url: { "ui:placeholder": "Introduza o endereço do serviço WMS" },
      ms_layer: { "ui:placeholder": "Introduza o identificador do layer do serviço WMS" }
    },
    defaultFields: {},
    getFinalSchema: getFinalSchema_fromwms
  }
  // == END OF THEME TYPES ============================= 
}
// -- Variables of theme types for combobox with enum names 
const EnumThemeTypes = [], EnumNamesThemeTypes = []
Object.entries(NT_ThemeTypes).forEach(([type, value]) => {
  EnumThemeTypes.push(type)
  EnumNamesThemeTypes.push(value.desc)
})
const EnumThemeTypes_default = EnumThemeTypes[0] // ALFA

// ========================================================================
// Global Json Schema for new theme/layer
export const NT_JSSchema = {
  title: "Criação de novo tema",
  description: "Formulário de apoio à criação de novo conjunto de dados",
  type: "object",
  required: [
    "code_table", "desc_theme", "theme_type", "title_form"
  ],
  properties: {
    desc_theme: {
      type: "string",
      title: "Conjunto de dados",
      description: "Texto de identificação do novo tema",
      minLength: 10,
      maxLength: 60
    },
    code_table: {
      type: "string",
      title: "Código único",
      description: "Código para criar tabela na base de dados (4 a 10 carateres)",
      pattern: "^[a-zA-Z_][a-zA-Z0-9_]*$",
      minLength: 4,
      maxLength: 10,
      validateField: validateVarnameForDB,
      transformError: transformErrorPattern 
    },
    title_form: {
      type: "string",
      title: "Título do formulário",
      description: "Título a utilizar no formulário dos dados do tema",
      maxlength: 60
    },
    description_form: {
      type: "string",
      title: "Subtítulo do formulário",
      description: "texto descritivo a utilizar no formulário dos dados do tema"
    },
    theme_type: {
      type: "string",
      title: "Tipo de tema",
      description: "Tipo de dados para o tema",
      default: EnumThemeTypes_default,
      enum: EnumThemeTypes,
      enumNames: EnumNamesThemeTypes
    },
    theme_fields: NT_ThemeTypes[EnumThemeTypes_default].jsSchema
  }
}

export const NT_UISchema = {
  desc_theme: {
    "ui:placeholder": "Texto descritivo do conjunto de dados",
    "ui:autofocus": true
  },
  theme_fields: NT_ThemeTypes[EnumThemeTypes_default].uiSchema
} 

// =================================================================================
// =================================================================================
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

/**
* Deep merge two objects.
* @param target
* @param source
*/
export function objDeepMerge(target, source) {
  if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
          if (isObject(source[key])) {
              if (!target[key] || !isObject(target[key])) {
                  target[key] = source[key];
              }
              objDeepMerge(target[key], source[key]);
          } else {
              Object.assign(target, { [key]: source[key] })
          }
      });
  }
  return target
}

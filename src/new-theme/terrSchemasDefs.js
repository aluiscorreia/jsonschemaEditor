/**
 * DAta structures and functions for theme and field definition
 */
// import { ObjectFieldTemplate, CustomFieldTemplate } from "../new-theme/array-template1"
import { RowTableColFieldObjTemplate, ListFieldRowTableTemplate } from "./terrThemeTemplates"
// import { DefaultObjectFieldTemplate } from '../rjsf-bs4/src/components/fields/ObjectField'
// import { ObjectFieldTemplate as DefaultObjectFieldTemplate } from'@rjsf/bootstrap-4'

// ========================================================================
// Auxiliary functions
function validateTableName(tablename) {
  const reservedWordsSQL = new Set(['A', 'ABORT', 'ABS', 'ABSENT', 'ABSOLUTE', 'ACCESS', 'ACCORDING', 'ACTION', 'ADA', 'ADD', 'ADMIN', 'AFTER', 'AGGREGATE', 'ALL', 'ALLOCATE', 'ALSO', 'ALTER', 'ALWAYS', 'ANALYSE', 'ANALYZE', 'AND', 'ANY', 'ARE', 'ARRAY', 'ARRAY_AGG', 'ARRAY_MAX_CARDINALITY', 'AS', 'ASC', 'ASENSITIVE', 'ASSERTION', 'ASSIGNMENT', 'ASYMMETRIC', 'AT', 'ATOMIC', 'ATTRIBUTE', 'ATTRIBUTES', 'AUTHORIZATION', 'AVG', 'BACKWARD', 'BASE64', 'BEFORE', 'BEGIN', 'BEGIN_FRAME', 'BEGIN_PARTITION', 'BERNOULLI', 'BETWEEN', 'BIGINT', 'BINARY', 'BIT', 'BIT_LENGTH', 'BLOB', 'BLOCKED', 'BOM', 'BOOLEAN', 'BOTH', 'BREADTH', 'BY', 'C', 'CACHE', 'CALL', 'CALLED', 'CARDINALITY', 'CASCADE', 'CASCADED', 'CASE', 'CAST', 'CATALOG', 'CATALOG_NAME', 'CEIL', 'CEILING', 'CHAIN', 'CHAR', 'CHARACTER', 'CHARACTERISTICS', 'CHARACTERS', 'CHARACTER_LENGTH', 'CHARACTER_SET_CATALOG', 'CHARACTER_SET_NAME', 'CHARACTER_SET_SCHEMA', 'CHAR_LENGTH', 'CHECK', 'CHECKPOINT', 'CLASS', 'CLASS_ORIGIN', 'CLOB', 'CLOSE', 'CLUSTER', 'COALESCE', 'COBOL', 'COLLATE', 'COLLATION', 'COLLATION_CATALOG', 'COLLATION_NAME', 'COLLATION_SCHEMA', 'COLLECT', 'COLUMN', 'COLUMNS', 'COLUMN_NAME', 'COMMAND_FUNCTION', 'COMMAND_FUNCTION_CODE', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', 'CONCURRENTLY', 'CONDITION', 'CONDITION_NUMBER', 'CONFIGURATION', 'CONFLICT', 'CONNECT', 'CONNECTION', 'CONNECTION_NAME', 'CONSTRAINT', 'CONSTRAINTS', 'CONSTRAINT_CATALOG', 'CONSTRAINT_NAME', 'CONSTRAINT_SCHEMA', 'CONSTRUCTOR', 'CONTAINS', 'CONTENT', 'CONTINUE', 'CONTROL', 'CONVERSION', 'CONVERT', 'COPY', 'CORR', 'CORRESPONDING', 'COST', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CSV', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_ROW', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CURSOR_NAME', 'CYCLE', 'DATA', 'DATABASE', 'DATALINK', 'DATE', 'DATETIME_INTERVAL_CODE', 'DATETIME_INTERVAL_PRECISION', 'DAY', 'DB', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFERRABLE', 'DEFERRED', 'DEFINED', 'DEFINER', 'DEGREE', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DENSE_RANK', 'DEPTH', 'DEREF', 'DERIVED', 'DESC', 'DESCRIBE', 'DESCRIPTOR', 'DETERMINISTIC', 'DIAGNOSTICS', 'DICTIONARY', 'DISABLE', 'DISCARD', 'DISCONNECT', 'DISPATCH', 'DISTINCT', 'DLNEWCOPY', 'DLPREVIOUSCOPY', 'DLURLCOMPLETE', 'DLURLCOMPLETEONLY', 'DLURLCOMPLETEWRITE', 'DLURLPATH', 'DLURLPATHONLY', 'DLURLPATHWRITE', 'DLURLSCHEME', 'DLURLSERVER', 'DLVALUE', 'DO', 'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', 'DYNAMIC', 'DYNAMIC_FUNCTION', 'DYNAMIC_FUNCTION_CODE', 'EACH', 'ELEMENT', 'ELSE', 'EMPTY', 'ENABLE', 'ENCODING', 'ENCRYPTED', 'END', 'END-EXEC', 'END_FRAME', 'END_PARTITION', 'ENFORCED', 'ENUM', 'EQUALS', 'ESCAPE', 'EVENT', 'EVERY', 'EXCEPT', 'EXCEPTION', 'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXEC', 'EXECUTE', 'EXISTS', 'EXP', 'EXPLAIN', 'EXPRESSION', 'EXTENSION', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FAMILY', 'FETCH', 'FILE', 'FILTER', 'FINAL', 'FIRST', 'FIRST_VALUE', 'FLAG', 'FLOAT', 'FLOOR', 'FOLLOWING', 'FOR', 'FORCE', 'FOREIGN', 'FORTRAN', 'FORWARD', 'FOUND', 'FRAME_ROW', 'FREE', 'FREEZE', 'FROM', 'FS', 'FULL', 'FUNCTION', 'FUNCTIONS', 'FUSION', 'G', 'GENERAL', 'GENERATED', 'GET', 'GLOBAL', 'GO', 'GOTO', 'GRANT', 'GRANTED', 'GREATEST', 'GROUP', 'GROUPING', 'GROUPS', 'HANDLER', 'HAVING', 'HEADER', 'HEX', 'HIERARCHY', 'HOLD', 'HOUR', 'ID', 'IDENTITY', 'IF', 'IGNORE', 'ILIKE', 'IMMEDIATE', 'IMMEDIATELY', 'IMMUTABLE', 'IMPLEMENTATION', 'IMPLICIT', 'IMPORT', 'IN', 'INCLUDING', 'INCREMENT', 'INDENT', 'INDEX', 'INDEXES', 'INDICATOR', 'INHERIT', 'INHERITS', 'INITIALLY', 'INLINE', 'INNER', 'INOUT', 'INPUT', 'INSENSITIVE', 'INSERT', 'INSTANCE', 'INSTANTIABLE', 'INSTEAD', 'INT', 'INTEGER', 'INTEGRITY', 'INTERSECT', 'INTERSECTION', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISNULL', 'ISOLATION', 'JOIN', 'K', 'KEY', 'KEY_MEMBER', 'KEY_TYPE', 'LABEL', 'LAG', 'LANGUAGE', 'LARGE', 'LAST', 'LAST_VALUE', 'LATERAL', 'LEAD', 'LEADING', 'LEAKPROOF', 'LEAST', 'LEFT', 'LENGTH', 'LEVEL', 'LIBRARY', 'LIKE', 'LIKE_REGEX', 'LIMIT', 'LINK', 'LISTEN', 'LN', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATION', 'LOCATOR', 'LOCK', 'LOCKED', 'LOGGED', 'LOWER', 'M', 'MAP', 'MAPPING', 'MATCH', 'MATCHED', 'MATERIALIZED', 'MAX', 'MAXVALUE', 'MAX_CARDINALITY', 'MEMBER', 'MERGE', 'MESSAGE_LENGTH', 'MESSAGE_OCTET_LENGTH', 'MESSAGE_TEXT', 'METHOD', 'MIN', 'MINUTE', 'MINVALUE', 'MOD', 'MODE', 'MODIFIES', 'MODULE', 'MONTH', 'MORE', 'MOVE', 'MULTISET', 'MUMPS', 'NAME', 'NAMES', 'NAMESPACE', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NESTING', 'NEW', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NIL', 'NO', 'NONE', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NOTHING', 'NOTIFY', 'NOTNULL', 'NOWAIT', 'NTH_VALUE', 'NTILE', 'NULL', 'NULLABLE', 'NULLIF', 'NULLS', 'NUMBER', 'NUMERIC', 'OBJECT', 'OCCURRENCES_REGEX', 'OCTETS', 'OCTET_LENGTH', 'OF', 'OFF', 'OFFSET', 'OIDS', 'OLD', 'ON', 'ONLY', 'OPEN', 'OPERATOR', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'ORDERING', 'ORDINALITY', 'OTHERS', 'OUT', 'OUTER', 'OUTPUT', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'OWNED', 'OWNER', 'P', 'PAD', 'PARAMETER', 'PARAMETER_MODE', 'PARAMETER_NAME', 'PARAMETER_ORDINAL_POSITION', 'PARAMETER_SPECIFIC_CATALOG', 'PARAMETER_SPECIFIC_NAME', 'PARAMETER_SPECIFIC_SCHEMA', 'PARSER', 'PARTIAL', 'PARTITION', 'PASCAL', 'PASSING', 'PASSTHROUGH', 'PASSWORD', 'PATH', 'PERCENT', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'PERIOD', 'PERMISSION', 'PLACING', 'PLANS', 'PLI', 'POLICY', 'PORTION', 'POSITION', 'POSITION_REGEX', 'POWER', 'PRECEDES', 'PRECEDING', 'PRECISION', 'PREPARE', 'PREPARED', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROGRAM', 'PUBLIC', 'QUOTE', 'RANGE', 'RANK', 'READ', 'READS', 'REAL', 'REASSIGN', 'RECHECK', 'RECOVERY', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'REINDEX', 'RELATIVE', 'RELEASE', 'RENAME', 'REPEATABLE', 'REPLACE', 'REPLICA', 'REQUIRING', 'RESET', 'RESPECT', 'RESTART', 'RESTORE', 'RESTRICT', 'RESULT', 'RETURN', 'RETURNED_CARDINALITY', 'RETURNED_LENGTH', 'RETURNED_OCTET_LENGTH', 'RETURNED_SQLSTATE', 'RETURNING', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROUTINE_CATALOG', 'ROUTINE_NAME', 'ROUTINE_SCHEMA', 'ROW', 'ROWS', 'ROW_COUNT', 'ROW_NUMBER', 'RULE', 'SAVEPOINT', 'SCALE', 'SCHEMA', 'SCHEMA_NAME', 'SCOPE', 'SCOPE_CATALOG', 'SCOPE_NAME', 'SCOPE_SCHEMA', 'SCROLL', 'SEARCH', 'SECOND', 'SECTION', 'SECURITY', 'SELECT', 'SELECTIVE', 'SELF', 'SENSITIVE', 'SEQUENCE', 'SEQUENCES', 'SERIALIZABLE', 'SERVER', 'SERVER_NAME', 'SESSION', 'SESSION_USER', 'SET', 'SETOF', 'SETS', 'SHARE', 'SHOW', 'SIMILAR', 'SIMPLE', 'SIZE', 'SKIP', 'SMALLINT', 'SNAPSHOT', 'SOME', 'SOURCE', 'SPACE', 'SPECIFIC', 'SPECIFICTYPE', 'SPECIFIC_NAME', 'SQL', 'SQLCODE', 'SQLERROR', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'STABLE', 'STANDALONE', 'START', 'STATE', 'STATEMENT', 'STATIC', 'STATISTICS', 'STDDEV_POP', 'STDDEV_SAMP', 'STDIN', 'STDOUT', 'STORAGE', 'STRICT', 'STRIP', 'STRUCTURE', 'STYLE', 'SUBCLASS_ORIGIN', 'SUBMULTISET', 'SUBSTRING', 'SUBSTRING_REGEX', 'SUCCEEDS', 'SUM', 'SYMMETRIC', 'SYSID', 'SYSTEM', 'SYSTEM_TIME', 'SYSTEM_USER', 'T', 'TABLE', 'TABLES', 'TABLESAMPLE', 'TABLESPACE', 'TABLE_NAME', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEXT', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TOKEN', 'TOP_LEVEL_COUNT', 'TRAILING', 'TRANSACTION', 'TRANSACTIONS_COMMITTED', 'TRANSACTIONS_ROLLED_BACK', 'TRANSACTION_ACTIVE', 'TRANSFORM', 'TRANSFORMS', 'TRANSLATE', 'TRANSLATE_REGEX', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIGGER_CATALOG', 'TRIGGER_NAME', 'TRIGGER_SCHEMA', 'TRIM', 'TRIM_ARRAY', 'TRUE', 'TRUNCATE', 'TRUSTED', 'TYPE', 'TYPES', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNDER', 'UNENCRYPTED', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNLINK', 'UNLISTEN', 'UNLOGGED', 'UNNAMED', 'UNNEST', 'UNTIL', 'UNTYPED', 'UPDATE', 'UPPER', 'URI', 'USAGE', 'USER', 'USER_DEFINED_TYPE_CATALOG', 'USER_DEFINED_TYPE_CODE', 'USER_DEFINED_TYPE_NAME', 'USER_DEFINED_TYPE_SCHEMA', 'USING', 'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', 'VALUE_OF', 'VARBINARY', 'VARCHAR', 'VARIADIC', 'VARYING', 'VAR_POP', 'VAR_SAMP', 'VERBOSE', 'VERSION', 'VERSIONING', 'VIEW', 'VIEWS', 'VOLATILE', 'WHEN', 'WHENEVER', 'WHERE', 'WHITESPACE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'XML', 'XMLAGG', 'XMLATTRIBUTES', 'XMLBINARY', 'XMLCAST', 'XMLCOMMENT', 'XMLCONCAT', 'XMLDECLARATION', 'XMLDOCUMENT', 'XMLELEMENT', 'XMLEXISTS', 'XMLFOREST', 'XMLITERATE', 'XMLNAMESPACES', 'XMLPARSE', 'XMLPI', 'XMLQUERY', 'XMLROOT', 'XMLSCHEMA', 'XMLSERIALIZE', 'XMLTABLE', 'XMLTEXT', 'XMLVALIDATE', 'YEAR', 'YES', 'ZONE']);
  reservedWordsSQL.add('GLOBAL')
  return tablename ? (reservedWordsSQL.has(tablename.toUpperCase()) ? 'Valor inválido (Palavra reservada)' : null) : null
}

function transformErrorPattern(error) {
  if (error.name === "pattern") {
    error.message = "Identificador inválido (ver regras para identificadores de tabelas e campos em bases de dados)"
  }
  return error
}

// ========================================================================
// Tipo de dados para os campos de um tema (exceto fromwms) 
const CommonFieldTypes = 
 [
  "texto",
  "inteiro",
  "número",
  "verdadeiro/falso",
  "date"
] 
const DefaultFieldType = CommonFieldTypes[0]

// ========================================================================
// Variable Json Schema for theme type
const _NT_ThemeTypeTable = {}
_NT_ThemeTypeTable.jsSchema = {
  title: "Campos a incluir no tema",
  type: "array",
  // minItems: 2, // TODO CONFiRM 
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
        transformError: transformErrorPattern
      },
      tipo: {
        title: "Tipo de Campo",
        type: "string",
        default: DefaultFieldType,
        enum: CommonFieldTypes
      },
      chave: {
        type: "boolean"
      },
      obrigatorio: {
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
// definition of fields datatype that can be useed in theme definition (different for fromwms)
export const NT_ThemeTypes = {
  // == ALFA ============================= 
  alfa: { 
    desc: "Dados alfanuméricos",
    fieldTypes: CommonFieldTypes,
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: [
      {
        campo: undefined,
        tipo: "texto",
        chave: true,
        obrigatorio: true,
        removeDisabled: false
      }
    ]
  },
  alfageom: { 
    desc: "Dados alfanuméricos e geográficos",
    fieldTypes: CommonFieldTypes.concat("geometry"),
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: []
  },
  vectorlist: { 
    desc: "Lista de temas vetoriais",
    fieldTypes: CommonFieldTypes,
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: []
  },
  rasterlist: { 
    desc: "Lista de temas raster",
    fieldTypes: CommonFieldTypes ,
    jsSchema: _NT_ThemeTypeTable.jsSchema,
    uiSchema: _NT_ThemeTypeTable.uiSchema,
    defaultFields: []
  },
  fromwms: {
    desc: "Tema de um serviço WMS",
    fieldTypes: null,
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
    defaultFields: {}
  }
}
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
    "code_table", "desc_theme", "data_type", "title_form"
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
      validateField: validateTableName,
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
    data_type: {
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

// ========================================================================
// Global settings of schemas by data type
export const NT_fieldTypeConfig = {
  common_fields: {
    schema_properties: {
      title: {
        title: "Descrição 'curta' do campo para o formulário",
        type: "string"
      },
      description: {
        title: "Texto descritivo do campo",
        type: "string"
      }
    },
    uiSchema: {
      title: { 
        "ui:autofocus": true
      }
    }
  },
  texto: {
    schema: {
      title: "Características específicas do campo",
      type: "object",
      properties: {
        default: {
          title: "Valor por omissão",
          type: "string"
        },
        minLength: {
          title: "Tamanho mínimo do texto",
          type: "integer"
        },
        maxLength: {
          title: "Tamanho mínimo do texto",
          type: "integer"
        },
        pattern: {
          title: "Padrão de validação",
          description: "Deve ser uma string com uma expressão regular",
          type: "string"
        }
      }
    },
    uiSchema: {
      
    }
  },
  inteiro: {

  },
  maxlenght: {
    schema: {
      maxlength: {
        type: "integer",
        title: "Tamanho máximo do campo"
      },
      exclusivemax: {
        type: "boolean",
        title: "Exclusivo"
      }
    },
    uischema: {

    },
    convert: (maxlenght) => {
      return null
    }
  }
}

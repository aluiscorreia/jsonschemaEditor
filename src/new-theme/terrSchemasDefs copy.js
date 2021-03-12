// import { ObjectFieldTemplate, CustomFieldTemplate } from "../new-theme/array-template1"
import { RowTableColFieldObjTemplate, ListFieldRowTableTemplate } from "./terrThemeTemplates"
// import { DefaultObjectFieldTemplate } from '../rjsf-bs4/src/components/fields/ObjectField'
import { ObjectFieldTemplate as DefaultObjectFieldTemplate } from'@rjsf/bootstrap-4'

// ========================================================================
// Tipo de temas
// "alfa",
// "alfageom",
// "vectorlist",
// "rasterlist",
// "fromwms"

// ========================================================================
// Tipo de dados por tipo de temas
const getEnumTipoDadosCampos = 
 [
  "string",
  "integer",
  "number",
  "boolean",
  "geometry",
  "Date??"
] 

// ========================================================================
// Global settings of schemas by data type
export const NT_fieldsCaract = {
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
  string: {
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
  integer: {

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
// ========================================================================
// Json Schema for new theme/layer
export const NT_JSSchema = 
{
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
      description: "Texto de descrição do novo tema",
      minLength: 10,
      maxLength: 60
    },
    code_table: {
      type: "string",
      title: "Código único",
      description: "Código para inserir na base de dados",
      pattern: "", // _TODO pattern with valid names for Postgresql tables and excluding reserved word - see custom validation
      minLength: 4
    },
    data_type: {
      type: "string",
      title: "Tipo de tema",
      description: "Tipo de dados para o tema",
      enum: [
        "alfa",
        "alfageom",
        "vectorlist",
        "rasterlist",
        "fromwms"
      ],
      enumNames: [
        "Dados alfanuméricos",
        "Dados alfanuméricos e geográficos",
        "Lista de temas vetoriais",
        "Lista de temas raster",
        "Tema com origem em WMS"
      ]
    },
    title_form: {
      type: "string",
      title: "Título do formulário",
      description: "Título a utilizar na edição dos dados do tema",
      maxlength: 60
    }
  },
  dependencies: {
    data_type: {
      oneOf: [
        { properties: {
            data_type: { enum: ["alfa"] },
            table_fields: { "$ref": "#/definitions/data_alfa" }
          }
        },
        { properties: {
            data_type: { enum: ["alfageom"] },
            table_fields: { "$ref": "#/definitions/data_alfa" }
          }
        },
        { properties: {
            data_type: { enum: ["vectorlist"] },
            table_fields: { "$ref": "#/definitions/data_vectorlist" }
          }
        },
        { properties: {
            data_type: { enum: ["rasterlist"] },
            table_fields: { "$ref": "#/definitions/data_rasterlist" }
          }
        },
        { properties: {
            data_type: { enum: ["fromwms"] },
            table_fields: { "$ref": "#/definitions/data_fromwms" }
          }
        }
      ]
    }
  },
  definitions: {
    // Common data to all data type
    common_data: {
      type: "object",
      properties: {
        campo: {
          title: "Código do campo",
          type: "string",
          minLength: 4,
          maxLength: 12,
          pattern: "^[a-zA-Z_][a-zA-Z0-9_]*$"
        },
        tipo: {
          title: "Tipo de Campo",
          type: "string",
          enum: getEnumTipoDadosCampos
          // [
          //   "string",
          //   "integer",
          //   "number",
          //   "boolean",
          //   "geometry",
          //   "Date??"
          // ]
        },
        chave: {
          type: "boolean"
        },
        obrigatorio: {
          type: "boolean"
        }
      }
    },
    // Fields for data_alfa
    data_alfa: {
      title: "Campos a incluir",
      type: "array",
      // minItems: 2, // TODO CONFiRM 
      items: {
        type: "object",
        required: ["campo", "tipo"],
        "allOf" :[
          { "$ref": "#/definitions/common_data" },
          { "properties": { 
              cpLixo: {
                type: "string",
                default: "test Lixo"
              }
            }
          } 
        ]
      }
    },
    data_vectorlist: {
      title: "Campos a incluir",
      type: "array",
      minItems: 2,
      items: {
        type: "object",
        required: ["campo", "tipo"],
        properties: {
          campo: {
            title: "Nome do campo",
            type: "string",
            minLength: 4,
            maxLength: 12
          },
          tipo: {
            title: "Tipo de Campo",
            type: "string",
            enum: [
              "string",
              "integer",
              "number",
              "boolean",
              "geometry",
              "Date??"
            ]
          },
          chave: {
            title: "Chave",
            type: "boolean"
          },
          obrigatorio: {
            type: "boolean"
          },
          specific: {
            type: "object",
            properties: {
              vector1: {
                title: "VectorList Campo1 field1",
                type: "string"
              },
              vector2: {
                title: "VectorList Campo1 field2",
                type: "integer"
              }
            }
          }
        }
      }
    }
  }
};

export const NT_UISchema = {
  desc_theme: {
    "ui:placeholder": "Texto descritivo do campo",
    "ui:autofocus": true
  },
  code_group: {
    // "ui:widget": "hidden"
    "ui:readonly": false
  },
  table_fields: {
    "ui:disabled": false,
    // "ui:ListFieldCols": ["campo", "title"],
    // "ui:ListFieldColsWidth": ["col-3", "col-1"],
    items: {
      "ui:ObjectFieldTemplate": RowTableColFieldObjTemplate,
      "ui:FieldTemplate": ListFieldRowTableTemplate,
      campo: {
        "ui:options": { "label": false }
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
      specific: {
        "ui:ObjectFieldTemplate": DefaultObjectFieldTemplate,
        classNames: "specific-hidden-anulado",
        campo1: { classNames: 'col-6' }, campo2: { classNames: 'col-6' }
      }
    }
  }
} 

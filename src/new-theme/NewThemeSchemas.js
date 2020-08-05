export const NT_JSSchema = 
{
  title: "Criação de conjunto de dados",
  description: "Formulário de apoio à criação de novo conjunto de dados",
  type: "object",
  required: [
    "code_table", "description", "data_type", "title_form"
  ],
  properties: {
    description: {
      type: "string",
      title: "Nome do conjunto de dados",
      maxlength: 60
    },
    code_table: {
      type: "string",
      title: "Código único",
      pattern: "", // TODO pattern with valid names for Postgresql tables and excluding reserved word - see custom validation
      minLength: 4
    },
    code_group: {
      type: "string",
      title: "Grupo a que pertence",
      enum: [
        "A preencher"
      ],
      enumNames: [
        "Label a preencher"
      ]
    },
    data_type: {
      type: "string",
      title: "Tipo de conjunto de dados",
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
      title: "Título para o formulário",
      maxlength: 60
    }
    /*
    create_order: {
      type: "integer",
      title: "Create Order? Por omissão fica o valor a seguir ao mais alto"
    },
    order_in_group: {
      type: "integer",
      title: "Order in Group? Será depois definido - Por omissão fica o último"
    },
    z_index: {
      type: "integer",
      title: "zIndex? Por omissão fica o valor a seguir ao mais alto - hipótese de reordenar?"
    }, */
  },
  dependencies: {
    data_type: {
      oneOf: [
        {
          properties: {
            data_type: { enum: ["alfa"] },
            table_fields: {
              "$ref": "#/definitions/data_alfa"
            }
          }
        },
        {
          properties: {
            data_type: { enum: ["alfageom"] }
          }
        },
        {
          properties: {
            data_type: { enum: ["vectorlist"] }
          }
        },
        {
          properties: {
            data_type: { enum: ["rasterlist"] }
          }
        },
        {
          properties: {
            data_type: { enum: ["fromwms"] }
          }
        }
      ]
    }
  },
  definitions: {
    data_alfa: {
      title: "Campos a incluir",
      type: "array",
      minItems: 2,
      // uniqueItems: true,
      items: {
        type: "object",
        required: ["campo", "tipo"],
        properties: {
          campo: {
            title: "Nome do campo",
            type: "string"
          },
          tipo: {
            title: "Tipo de campo",
            type: "string",
            enum: [
              "string",
              "integer",
              "number",
              "boolean",
              "geometry",
              "Date??"
            ]
          }
        }
      }
    }
  }
};

export const NT_UISchema = {
  description_rsjf: {
    "ui:placeholder": "Texto descritivo do campo"
  },
  code_group: {
    // "ui:widget": "hidden"
    "ui:readonly": false
  },
  props: {
    "ui:disabled": false
  }
} 

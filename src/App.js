import React, { useState } from 'react'
import TerrThemeForm from './new-theme/terrThemeForm'
import { ControlledEditor } from '@monaco-editor/react'
import { formDataTest } from './data'
import { PvtForm } from './pvtable/pvt-form'
import './App.css';

// =======================================================
// Dados a obter do serviço GET /api/[region_cod]/regions/foreignKeys com user Admin Region
// Serviço devolve um objeto como está a seguir

const themesFK = 
{
  "ra899909": {
      "name_table": "ra899909",
      "desc_table": "Recenseamentos Agrícolas de 1989, 1999 e 2009",
      "pk_field": "dicofre",
      "pk_type": "string",
      "displayfields": {
          "enum": [
              "freguesia",
              "municipio",
              "distrito",
              "expl_09",
              "expl_99",
              "expl_89",
              "explvin09",
              "explvin99",
              "explvin89",
              "sau09",
              "sau99",
              "sau89",
              "areavin09",
              "areavin99",
              "areavin89",
              "saumed_09",
              "saumed_99",
              "saumed_89",
              "supmedvin09",
              "supmedvin99",
              "supmedvin89",
              "vsv89_09",
              "vexcv89_09",
              "vsmvpex89_09",
              "pvsau2009",
              "pvsau99",
              "pvsau89",
              "vpvsau89_09",
              "pexcv2009",
              "vpexcv89_09"
          ],
          "enumNames": [
              "Freguesia",
              "Município",
              "Distrito",
              "Número de explorações agrícolas 2009",
              "Número de explorações agrícolas 1999",
              "Número de explorações agrícolas 1989",
              "Número de explorações agrícolas com vinha 2009",
              "Número de explorações agrícolas com vinha 1999",
              "Número de explorações agrícolas com vinha 1989",
              "Superfície Agrícola Utilizada 2009",
              "Superfície Agrícola Utilizada 1999",
              "Superfície Agrícola Utilizada 1989",
              "Área de vinha 2009",
              "Área de vinha 1999",
              "Área de vinha 1989",
              "SAU média por exploração 2009",
              "SAU média por exploração 1999",
              "SAU média por exploração 1989",
              "Superfície Média de Vinha por exploração 2009",
              "Superfície Média de Vinha por exploração 1999",
              "Superfície Média de Vinha por exploração 1989",
              "Variação da Superfície de Vinha 1989-2009",
              "Variação do Número de Explorações com vinha 1989-2009",
              "Variação da Superfície Média de Vinha por exploração 1989-2009",
              "Peso da Vinha na Superfície Agrícola Utilizada 2009",
              "Peso da Vinha na Superfície Agrícola Utilizada 1999",
              "Peso da Vinha na Superfície Agrícola Utilizada 1989",
              "Variação do Peso da Vinha na Superfície Agrícola Utilizada 1989-2009",
              "Peso das Explorações com Vinha no total 2009",
              "Variação do peso das explorações com vinha 1989-2009"
          ]
      }
  },
  "solosbd": {
      "name_table": "solosbd",
      "desc_table": "Solos (BD)",
      "pk_field": "area_id",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "classificacao",
              "declive",
              "risco_erosao",
              "aptidao_agric"
          ],
          "enumNames": [
              "Classificação",
              "Declive",
              "Risco de erosão",
              "Aptidão agrícola"
          ]
      }
  },
  "solos": {
      "name_table": "solos",
      "desc_table": "Solos",
      "pk_field": "id",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "descricao",
              "ano",
              "fonte",
              "ficheiro"
          ],
          "enumNames": [
              "Descrição",
              "Ano",
              "Fonte",
              "Ficheiro"
          ]
      }
  },
  "ra_teste": {
      "name_table": "ra_teste",
      "desc_table": "RA teste",
      "pk_field": "dicofre",
      "pk_type": "string",
      "displayfields": {
          "enum": [
              "freguesia",
              "municipio",
              "distrito",
              "expl_09",
              "expl_99",
              "expl_89",
              "sau09",
              "sau99",
              "sau89"
          ],
          "enumNames": [
              "Freguesia",
              "Município",
              "Distrito",
              "Número de explorações agrícolas 2009",
              "Número de explorações agrícolas 1999",
              "Número de explorações agrícolas 1989",
              "Superfície Agrícola Utilizada 2009",
              "Superfície Agrícola Utilizada 1999",
              "Superfície Agrícola Utilizada 1989"
          ]
      }
  },
  "parcelas": {
      "name_table": "parcelas",
      "desc_table": "Parcelas",
      "pk_field": "cod_parcela",
      "pk_type": "string",
      "pk_maxlength": 10,
      "displayfields": {
          "enum": [
              "identificacao",
              "data_registo",
              "area_registo",
              "num_proprietarios",
              "valor_patrimonial",
              "tem_vinha"
          ],
          "enumNames": [
              "Identificação",
              "Data de registo",
              "Área declarada (ha)",
              "Nº de proprietários",
              "Valor patrimonial (€)",
              "Tem plantação de vinha?"
          ]
      }
  },
  "solo_amostra": {
      "name_table": "solo_amostra",
      "desc_table": "Amostra de solos",
      "pk_field": "id_amostra",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "descricao",
              "data",
              "hora",
              "parametro1",
              "parametro2",
              "parametro3",
              "profundidade",
              "tipo_analise"
          ],
          "enumNames": [
              "Descrição",
              "Data",
              "Hora",
              "Parâmetro 1 (%)",
              "Parâmetro 2",
              "Parâmetro 3",
              "Profundidade análise (cm)",
              "Tipo de análise"
          ]
      }
  },
  "humidade": {
      "name_table": "humidade",
      "desc_table": "Humidade",
      "pk_field": "id",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "descricao",
              "data",
              "fonte",
              "ficheiro"
          ],
          "enumNames": [
              "Descrição",
              "Data",
              "Fonte",
              "Ficheiro"
          ]
      }
  },
  "datatypetest": {
      "name_table": "datatypetest",
      "desc_table": "Teste tipo de dados",
      "pk_field": "id_teste",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "descricao",
              "inteiro",
              "booleano",
              "numerico1",
              "numerico2",
              "listastring",
              "listainteiro",
              "data",
              "hora",
              "datahorawtz",
              "datahora"
          ],
          "enumNames": [
              "Descrição",
              "Valor inteiro",
              "Valor booleano",
              "Nomérico 10 com 2 decimals",
              "Nomérico double",
              "Lista de valores (string)",
              "Lista de valores (inteiro)",
              "Data",
              "Hora",
              "Data e hora (com time zone)",
              "Data e hora (sem time zone)"
          ]
      }
  },
  "alfageom1": {
      "name_table": "alfageom1",
      "desc_table": "Teste de tema do tipo ALFAGEOM",
      "pk_field": "chave",
      "pk_type": "string",
      "displayfields": {
          "enum": [
              "texto",
              "hora"
          ],
          "enumNames": [
              "Identificação",
              "Hora"
          ]
      }
  },
  "parcelas4326": {
      "name_table": "parcelas4326",
      "desc_table": "Parcelas4326",
      "pk_field": "cod_parcela",
      "pk_type": "string",
      "pk_maxlength": 10,
      "displayfields": {
          "enum": [
              "identificacao",
              "data_registo",
              "area_registo",
              "num_proprietarios",
              "valor_patrimonial",
              "tem_vinha"
          ],
          "enumNames": [
              "Identificação",
              "Data de registo",
              "Área declarada (ha)",
              "Nº de proprietários",
              "Valor patrimonial (€)",
              "Tem plantação de vinha?"
          ]
      }
  },
  "castas_vinha": {
      "name_table": "castas_vinha",
      "desc_table": "Castas de vinha",
      "pk_field": "id_casta",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "identificacao"
          ],
          "enumNames": [
              "Identificação"
          ]
      }
  },
  "tetetet": {
      "name_table": "tetetet",
      "desc_table": "tetetetette",
      "pk_field": "tetetet",
      "pk_type": "string",
      "displayfields": {}
  },
  "vlist": {
      "name_table": "vlist",
      "desc_table": "teste vectorlist",
      "pk_field": "id",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "descricao",
              "ano",
              "fonte",
              "ficheiro"
          ],
          "enumNames": [
              "Descrição",
              "Ano",
              "Fonte",
              "Ficheiro"
          ]
      }
  },
  "sdfsdfs": {
      "name_table": "sdfsdfs",
      "desc_table": "dffdsfdsfsd",
      "pk_field": "dddd",
      "pk_type": "string",
      "displayfields": {
          "enum": [
              "ddddd"
          ],
          "enumNames": [
              "fdfddfdd"
          ]
      }
  },
  "alfa2": {
      "name_table": "alfa2",
      "desc_table": "Teste de tema do tipo ALFA",
      "pk_field": "id_alfa1",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "desc_alfa1"
          ],
          "enumNames": [
              "Identificação"
          ]
      }
  },
  "rios": {
      "name_table": "rios",
      "desc_table": "Rios",
      "pk_field": "id_troco",
      "pk_type": "integer",
      "displayfields": {
          "enum": [
              "descricao",
              "caudal"
          ],
          "enumNames": [
              "Descrição",
              "Caudal (L/s)"
          ]
      }
  }
}


function App() {
  const editorFontSize = 12;
  const [recTheme, setRecTheme] = useState("{}")
  const [schema, setSchema] = useState("{}")
  const [UISchema, setUISchema] = useState("{}")
  const [formData, setFormData] = useState(formDataTest)

  const [modalPvtShow, setModalPvtShow] = useState(false)

  const handleEdits = (value, type) => {
    switch (type) {
      case "schema":
        // isJSON(value) && setSchema(value);
        break;
      case "uischema":
        // isJSON(value) && setUISchema(value);
        break;
      case "formdata":
        //isJSON(value) && setFormData(value);
        // setFormData(JSON.stringify(value, null, '  '))
        //setFormData(value)
        break;
      default:
        break;
    }
  }

  const processSubmit = (data) => {
    setRecTheme(JSON.stringify(data, null, '  '))
    setSchema(JSON.stringify(data.json_schema || {}, null, '  '))
    setUISchema(JSON.stringify(data.ui_schema || {}, null, '  '))
  }

  return (
    <React.Fragment>
      <main className="p-3 row">
        <TerrThemeForm
          groupName={"Exemplo de grupo"}
          themesFK={themesFK}
          formData={formDataTest} // {formData}
          onChange={(formData) => setFormData(formData) } //setFormData(JSON.stringify(event.formData, null, '  ')) }
          onSubmit={(data)=> processSubmit(data)}
          className="col-7"
        />
        <aside className="col-5 h-100 position-fixed" style={{ right: 0 }}>
          <div className="col" height="100%">
          <div style={{padding: "20px"}}>
          <button 
            onClick={(event) => { 
              if (event) event.preventDefault()
              setModalPvtShow(true) 
            }}
            >
            PIVOT TABLE
          </button></div>
            <h4>FormData</h4>
            <ControlledEditor
              border="blue solid 1px"
              height="500px"
              language="json"
              options={{readOnly: true, fontSize: editorFontSize}}
              value={JSON.stringify(formData, null, '  ')}
              onChange={(_, value) => handleEdits(value, "formdata")}
            />
          </div >
        </aside>
      </main>
      <div className="row" style={{height: "250px", borderTop: "2px solid gray"}}>
      <section className="col">
          <h4>Schema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            options={{readOnly: true, fontSize: editorFontSize}}
            value={recTheme}
            // onChange={(_, value) => handleEdits(value, "schema")}
          />
        </section>
        <section className="col">
          <h4>Schema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            options={{readOnly: true, fontSize: editorFontSize}}
            value={schema}
            // onChange={(_, value) => handleEdits(value, "schema")}
          />
        </section>
        <section className="col">
          <h4>UISchema</h4>
          <ControlledEditor
            height="100%"
            language="json"
            options={{readOnly: true, fontSize: editorFontSize}}
            value={UISchema}
            // onChange={(_, value) => handleEdits(value, "uischema")}
          />
        </section>
        {/* <section className="col">
          <h4>FormData</h4>
          <ControlledEditor
            height="100%"
            language="json"
            value={formData}
            onChange={(_, value) => handleEdits(value, "formadata")}
          />
        </section> */}
      </div>

      <PvtForm
        show={modalPvtShow}
        onHide={() => setModalPvtShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </React.Fragment>
  );
}

export default App;

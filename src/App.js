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
{"testphmo":{"name_table":"testphmo","desc_table":"Dados PH e MO","pk_field":"id","pk_type":"integer","displayfields":{"enum":["lat","long","data","ph_30","ph_60","phkcl_30","phkcl_60","mo_30","mo_60"],"enumNames":["Latitude","Longitude","Data","pH água (0 a 30cm)","pH água (30 a 60 cm)","pH KCl (0 a 30cm)","pH KCl (30 a 60 cm)","Matéria Orgânica (%) (0 a 30cm)","Matéria Orgânica (%) (30 a 60 cm)"]}},"raexpsau":{"name_table":"raexpsau","desc_table":"Explorações e SAU em 1989, 1999 e 2009","pk_field":"dicofre","pk_type":"string","displayfields":{"enum":["freguesia","municipio","distrito","expl_09","expl_99","expl_89","sau09","sau99","sau89"],"enumNames":["Freguesia","Município","Distrito","Número de explorações agrícolas 2009","Número de explorações agrícolas 1999","Número de explorações agrícolas 1989","Superfície Agrícola Utilizada 2009","Superfície Agrícola Utilizada 1999","Superfície Agrícola Utilizada 1989"]}},"rastmdt":{"name_table":"rastmdt","desc_table":"Modelos digitais do terreno","pk_field":"id","pk_type":"integer","displayfields":{"enum":["descricao","data","fonte","ficheiro"],"enumNames":["Descrição do raster","Data do tema","Fonte dos dados","Ficheiro com dados geográficos"]}},"parcelasp":{"name_table":"parcelasp","desc_table":"Parcelas do projeto","pk_field":"codigo","pk_type":"string","pk_maxlength":6,"displayfields":{"enum":["nome","localizacao"],"enumNames":["Identificação da parcela","Localização da parcela"]}},"ra899909":{"name_table":"ra899909","desc_table":"Recenseamentos Agrícolas de 1989, 1999 e 2009","pk_field":"dicofre","pk_type":"string","displayfields":{"enum":["freguesia","municipio","distrito","expl_09","expl_99","expl_89","explvin09","explvin99","explvin89","sau09","sau99","sau89","areavin09","areavin99","areavin89","saumed_09","saumed_99","saumed_89","supmedvin09","supmedvin99","supmedvin89","vsv89_09","vexcv89_09","vsmvpex89_09","pvsau2009","pvsau99","pvsau89","vpvsau89_09","pexcv2009","vpexcv89_09"],"enumNames":["Freguesia","Município","Distrito","Número de explorações agrícolas 2009","Número de explorações agrícolas 1999","Número de explorações agrícolas 1989","Número de explorações agrícolas com vinha 2009","Número de explorações agrícolas com vinha 1999","Número de explorações agrícolas com vinha 1989","Superfície Agrícola Utilizada 2009","Superfície Agrícola Utilizada 1999","Superfície Agrícola Utilizada 1989","Área de vinha 2009","Área de vinha 1999","Área de vinha 1989","SAU média por exploração 2009","SAU média por exploração 1999","SAU média por exploração 1989","Superfície Média de Vinha por exploração 2009","Superfície Média de Vinha por exploração 1999","Superfície Média de Vinha por exploração 1989","Variação da Superfície de Vinha 1989-2009","Variação do Número de Explorações com vinha 1989-2009","Variação da Superfície Média de Vinha por exploração 1989-2009","Peso da Vinha na Superfície Agrícola Utilizada 2009","Peso da Vinha na Superfície Agrícola Utilizada 1999","Peso da Vinha na Superfície Agrícola Utilizada 1989","Variação do Peso da Vinha na Superfície Agrícola Utilizada 1989-2009","Peso das Explorações com Vinha no total 2009","Variação do peso das explorações com vinha 1989-2009"]}},"solosv100":{"name_table":"solosv100","desc_table":"Solos (100k vetorial)","pk_field":"area_id","pk_type":"integer","displayfields":{"enum":["classifica","lito","declive","erodibil","risco_eros","apt_flor","apt_agri","aptidao"],"enumNames":["Classificação","Litologia","Declive (intervalo)","Erodibilidade","Risco de erosão","Aptidão florestal","Aptidão agrícola","Aptidão (classe)"]}}}

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
                    onChange={(formData) => setFormData(formData)} //setFormData(JSON.stringify(event.formData, null, '  ')) }
                    onSubmit={(data) => processSubmit(data)}
                    isLoading={false}
                    className="col-7"
                />
                <aside className="col-5 h-100 position-fixed" style={{ right: 0 }}>
                    <div className="col" height="100%">
                        <div style={{ padding: "20px" }}>
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
                            options={{ readOnly: true, fontSize: editorFontSize }}
                            value={JSON.stringify(formData, null, '  ')}
                            onChange={(_, value) => handleEdits(value, "formdata")}
                        />
                    </div >
                </aside>
            </main>
            <div className="row" style={{ height: "250px", borderTop: "2px solid gray" }}>
                <section className="col">
                    <h4>Schema</h4>
                    <ControlledEditor
                        height="100%"
                        language="json"
                        options={{ readOnly: true, fontSize: editorFontSize }}
                        value={recTheme}
                    // onChange={(_, value) => handleEdits(value, "schema")}
                    />
                </section>
                <section className="col">
                    <h4>Schema</h4>
                    <ControlledEditor
                        height="100%"
                        language="json"
                        options={{ readOnly: true, fontSize: editorFontSize }}
                        value={schema}
                    // onChange={(_, value) => handleEdits(value, "schema")}
                    />
                </section>
                <section className="col">
                    <h4>UISchema</h4>
                    <ControlledEditor
                        height="100%"
                        language="json"
                        options={{ readOnly: true, fontSize: editorFontSize }}
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

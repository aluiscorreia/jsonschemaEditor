import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';
import PivotTableUI from 'react-pivottable/PivotTableUI'
import TableRenderers from 'react-pivottable/TableRenderers'
import 'react-pivottable/pivottable.css'
import { demoPvtData } from './pvt-data'


export default function PvtTable(props) {
  const [ptState, setptState] = useState({});
  const [firstRender, setfirstRender] = useState(true);

  useEffect(() => {
    document.querySelectorAll(".pvtAxisContainer li span.pvtAttr").forEach(el => {
      let sp2 = (
        <>
        <label className="pvt-overflow">
          <span>{el.childNodes[0].textContent}</span>
        </label>
        <i className="fas fa-database">
          <span className="tooltiptext">Tooltip text
          some <b>more</b><br/>
          <i>and</i> more</span>
        </i>
        {/* <span class="fa-stack">
          <i class="fas fa-database fa-stack-2x"></i>
          <i class="fas fa-info fa-stack-1x"></i>
        </span> */}
        <span className="pvtTriangle"> ▾</span>
        </>
      )
      let sp2_str_html = ReactDOMServer.renderToString(sp2)
      let tmphtmp = document.createElement('div')
      tmphtmp.innerHTML = sp2_str_html

      el.removeChild(el.childNodes[0])
      el.insertBefore(tmphtmp.childNodes[0], el.childNodes[0])
      el.insertBefore(tmphtmp.childNodes[0], el.childNodes[1])

      // el.innerHTML = sp2_str_html
      let np = el.childNodes[0]
      if (np.offsetWidth < np.scrollWidth) // Ellipsis is Active
        np.className = "pvt-overflow pvt-overflow-tip"
    })

  setfirstRender(false)
}, [firstRender, ptState]) 

  return (
    <div>
      <PivotTableUI
        className="d-b"
        data={demoPvtData}
        onChange={(state) => setptState(state)}
        renderers={{ ...TableRenderers }}
        {...ptState}
      />
    </div>
  )
}
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
    // console.log('render! ' + firstRender);
    //if (!firstRender) {
      document.querySelectorAll(".pvtAxisContainer li span.pvtAttr").forEach(el => {
        // let lbl = document.createElement("label")
        // lbl.textContent = el.childNodes[0].textContent
        // lbl.className = "lb_ellipsis"
        // lbl.setAttribute("pvt-atr-title", el.childNodes[0].textContent)
        // el.replaceChild(lbl, el.childNodes[0])
        // let sp1 = document.createElement("span")
        // sp1.textContent = el.childNodes[0].textContent
        // let ic = document.createElement("i")
        // ic.className = 'fas fa-database'
        //sp1.appendChild(ic)
        // sp1.setAttribute('title', 'title\n' + el.childNodes[0].textContent);
        // let sp2 = document.createElement("label")
        // sp2.className = "pvt-overflow"
        // sp2.appendChild(sp1)
        //el.replaceChild(sp2, el.childNodes[0])
        //sp2 = (<label class="pvt-overflow"><span>{el.childNodes[0].textContent}</span></label>)
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

        el.innerHTML = sp2_str_html
        let np = el.childNodes[0]
        if (np.offsetWidth < np.scrollWidth) // Ellipsis is Active
          np.className = "pvt-overflow pvt-overflow-tip"
      })
    //}
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
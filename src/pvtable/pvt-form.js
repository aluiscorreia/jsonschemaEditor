import React from 'react'
import { Modal, Button } from 'react-bootstrap'
// import PivotTableUI from 'react-pivottable/PivotTableUI'
// import TableRenderers from 'react-pivottable/TableRenderers'
// import 'react-pivottable/pivottable.css'
// import { demoPvtData } from './pvt-data'
import PvtTable from './pvt-table'

export function PvtForm(props) {
  // const [ptState, setptState] = useState({});
  // const [firstRender, setfirstRender] = useState(true)
  
  // useEffect(() => {
  //   console.log(firstRender)
  //   document.querySelectorAll(".pvtAxisContainer li span.pvtAttr").forEach(el => {
  //     el.childNodes[0].innerhtml = '<label class="lb_ellipsis">' + el.childNodes[0].textContent + '</label>'
  //   })
  // })

  return (
    <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        // dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modalFixedZIndex"
      >
        <Modal.Header closeButton>
          <Modal.Title>Teste de Pivot Table</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "block" }}>
          <PvtTable />
          {/* <div>
         <PivotTableUI
            className="d-b"
            data={demoPvtData}
            onChange={(state) => { setptState(state); setfirstRender(false) }}
            renderers={{ ...TableRenderers }}
            {...ptState}
          /> </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}
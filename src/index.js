import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



// import PivotTableUI from 'react-pivottable/PivotTableUI';
// import { useState } from "react"
// import { Modal, Button } from 'react-bootstrap'
// import 'react-pivottable/pivottable.css';
// // see documentation for supported input formats
// const data = [['attribute', 'attribute2'], ['value1', 'value2']];

// class App extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = props;
//     }

//     render() {
//         return <Modal
//         // {...props}
//         show={true}
        
//         size="lg"
//         dialogClassName="modal-90w"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         className="modalFixedZIndex"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Teste de Pivot Table</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ display: "block" }}>
//           <div>
//          <PivotTableUI
//             className="d-b"
//             data={data}
//             onChange={s => this.setState(s)}

//             {...this.state}
//           /> </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button >Close</Button>
//         </Modal.Footer>
//       </Modal>;
//     }
// }




ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

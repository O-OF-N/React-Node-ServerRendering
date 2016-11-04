import React from 'react';
import * as Records from '../../records/records';
import * as Constants from '../../utils/constants';
import { connect } from 'react-redux';
import { Modal, Popover, Tooltip, OverlayTrigger, Button, closeButton } from 'react-bootstrap';
import { render } from 'react-dom';
import App from './App';
require('react-bootstrap');


const openClose = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  position: 'fixed',
  top: '100px', bottom: '0px', left: '100px', right: '0px',
  zIndex: 'auto',
  backgroundColor: '#F2F2F2',
  opacity: 1.5
};

const popover = () => (
  <Popover id="modal-popover" title="popover">
    very popover. such engagement
      </Popover>
);

const tooltip = () => (
  <Tooltip id="modal-tooltip">
    wow.
      </Tooltip>
);

const Example = ({slidingScale, dispatch}) => {
  const toggle = openClose.bind(null, dispatch);
  return (
    <Modal dialogClassName="custom-modal" show={slidingScale.visible} onHide={toggle} style={modalStyle}
      backdropStyle={backdropStyle}>
      <Modal.Header closeButton>
        <Modal.Title>Insulin Bolus Calculator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <App />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggle}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default connect(state => ({
  dispatch: state.dispatch,
  slidingScale: state.slidingScale
}))(Example);



import React from 'react';
import * as Records from '../../records/records';
import * as Constants from '../../utils/constants';
import { connect } from 'react-redux';
import { Modal, Popover, Tooltip, OverlayTrigger, Button, closeButton } from 'react-bootstrap';
import { render } from 'react-dom';
import IBC from './IBC';
require('react-bootstrap');


const openClose = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: '100px', bottom: '0px', left: '100px', right: '0px',
};

const backdropStyle = {
  position: 'fixed',
  top: '100px', bottom: '0px', left: '100px', right: '0px',
  zIndex: 'auto',
  backgroundColor: '#F2F2F2',
  opacity: 1.5
};


const IBCModal = ({slidingScale, dispatch}) => {
  const toggle = openClose.bind(null, dispatch);
  return (
    <Modal dialogClassName="custom-modal" show={slidingScale.visible} onHide={toggle} style={modalStyle}
      backdropStyle={backdropStyle}>
      <Modal.Header closeButton>
        <Modal.Title>Insulin Bolus Calculator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <IBC />
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
}))(IBCModal);



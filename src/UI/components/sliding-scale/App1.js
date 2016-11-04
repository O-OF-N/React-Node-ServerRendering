import React from 'react';
import * as Records from '../../records/records';
import * as Constants from '../../utils/constants';
import { connect } from 'react-redux';
import { Modal, Popover, Tooltip, OverlayTrigger, Button, closeButton } from 'react-bootstrap';
import { render } from 'react-dom';
require('react-bootstrap');

const openClose = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });

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
    <div className="modal fade" tabindex="-1" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">Modal title</h4>
      </div>
      <div className="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  );
}


export default connect(state => ({
  dispatch: state.dispatch,
  slidingScale: state.slidingScale
}))(Example);



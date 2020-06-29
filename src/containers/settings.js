import React from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from 'prop-types';
import colors from '../constants/color'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changebackg ,changeCacheState} from '../actions/index'

class Settings extends React.Component {
  instance = null;
  state = {
    value: 0
  }
  change = (e) => {
    this.setState({ value: e.target.value }, () => {
      this.props.changebackg({ color: colors[this.state.value] })
    });
  }

  toggleChange = () => {
    this.props.changeCacheState({cachefiles:!this.props.cacheFiles})
  }
  componentDidMount() {
    let options = {}
    let elem = document.querySelector('#' + this.props.id);
    this.instance = M.Modal.init(elem, options);
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, options);
    this.props.modalcontrol({
      open: () => { this.instance.open() }
    })
    
  }
  componentWillUnmount() {
    this.props.modalcontrol(null);
  }
  render() {
    let items = colors.map((item, index) => {
      return <option key={index} value={index} >{`Theme -${index} `}</option>
    })
    return (
      <div id={this.props.id} className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Settings</h5>
            <i className="material-icons" onClick={(e) => { this.instance.close() }} style={{ 'position': 'absolute', 'right': '2px', 'top': '2px', 'cursor': 'pointer' }}>close</i>
          </div>
          <div className="modal-body">
            <h6>Change Theme</h6>
            <div className="input-field col s12">
              <select value={this.state.value} onChange={this.change}>
                <option disabled>Choose your theme</option>
                {items}
              </select>
            </div>
            <br></br>
            <br></br>
            <label>
              <input type="checkbox"  className="filled-in" checked={this.props.cacheFiles} onChange={this.toggleChange} />
              <span style={{'color':'black'}}>Cache Files</span>
            </label>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    )
  }
}
Settings.defaultProps = {
  id: 'settings'
};
Settings.propTypes = {
  id: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    cacheFiles: state.cacheFiles.cachefiles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changebackg,
    changeCacheState
  }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Settings);
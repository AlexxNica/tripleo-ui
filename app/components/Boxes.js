import React from 'react';

import Actions from '../actions/Actions';
import FlavorStore from '../stores/FlavorStore';

import Flavors from '../data/Flavors';
import Roles from '../data/Roles';
import NodePicker from './NodePicker';
import NodeStack from './NodeStack';


export default class Boxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = FlavorStore.getState();
  }

  componentDidMount() {
    FlavorStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    FlavorStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(FlavorStore.getState());
  }

  render() {
    return (
      <div className="row">
        <PageHeader text="Overcloud Deployment"/>
        <FlavorPanelList flavors={this.state.flavors}/>
      </div>
    );
  }
}


export class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header">
        <h1>{this.props.text}</h1>
      </div>
    );
  }
}


// export class FreeRolesList extends React.Component {
//   render() {
//     let freeRoles = this.props.data.filter((role, index) => {
//       return role;
//     });
//     return (
//       <div className="row">
//         <RoleList roles={freeRoles}/>
//       </div>
//     );
//   }
// }


export class FlavorPanelList extends React.Component {
  render() {
    let flavors = this.props.flavors.map((flavor, index) => {
      return (
        <FlavorPanel flavor={flavor} key={index}/>
      );
    });
    return (
      <div>
        {flavors}
      </div>
    );
  }
}


export class FlavorPanel extends React.Component {
  render() {
    return (
      <div className="panel panel-default flavor-panel">
        <div className="panel-heading">
          <h3 className="panel-title">
            <strong>{this.props.flavor.name}</strong>
            <small className='subheader'> {this.props.flavor.hwSpecs}</small>
          </h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <FreeNodesPanel nodeCount={this.props.flavor.freeNodeCount} />
            </div>
            <RoleList roles={this.props.flavor.roles}/>
            <div className="col-sm-4 col-md-3">
              <DropZonePanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export class RoleList extends React.Component {
  render() {
    let roles = this.props.roles.map((role, index) => {
      return (
        <div className="col-sm-4 col-md-3" key={index}>
          <RolePanel role={role}/>
        </div>
      );
    });
    return (
      <div>
        {roles}
      </div>
    );
  }
}


export class FreeNodesPanel extends React.Component {
  render() {
    return (
      <div className="panel panel-default role-panel free-nodes-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Free Nodes</h3>
        </div>
        <div className="panel-body clearfix">
          <NodeStack count={this.props.nodeCount} />
        </div>
      </div>
    );
  }
}


export class DropZonePanel extends React.Component {
  render() {
    return (
      <div className="panel panel-default role-panel drop-zone-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Add Role</h3>
        </div>
        <div className="panel-body clearfix">
          <span className="glyphicon glyphicon-plus"></span>
        </div>
      </div>
    );
  }
}


export class RolePanel extends React.Component {
  updateCount(increment) {
    Actions.updateRole(this.props.role.name, this.props.role.nodeCount + increment);
  }

  render() {
    return (
      <div className={"panel panel-default role-panel " + this.props.role.name.toLowerCase()}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.role.name}</h3>
        </div>
        <div className="panel-body clearfix">
          <NodePicker onIncrement={this.updateCount.bind(this)} nodeCount={this.props.role.nodeCount} />
        </div>
      </div>
    );
  }
}

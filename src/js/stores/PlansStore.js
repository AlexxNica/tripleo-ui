import BaseStore from './BaseStore';
import PlansConstants from '../constants/PlansConstants';

class PlansStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      currentPlanName: undefined,
      planNames: []
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case PlansConstants.GET_PLAN:
      this.onGetPlan(payload.planName);
      break;
    case PlansConstants.LIST_PLANS:
      this.onListPlans(payload.plans);
      break;
    default:
      break;
    }
  }

  onGetPlan(planName) {
    this.state.currentPlanName = planName;
    this.emitChange();
  }

  onListPlans(plans) {
    let planNames = [];
    plans.forEach(item => {
      planNames.push(item.name);
    });
    this.state.planNames = planNames;
    this.emitChange();
  }

  getState() {
    return this.state;
  }

  /**
   * Returns a plan obj, either by name or current
   * (if name is omitted).
   */
  // getPlan() {
  //   return this.state.plan;
  // }

  getCurrentPlanName() {
    return this.state.currentPlanName;
  }

  getPlanNames() {
    return this.state.planNames;
  }
}

export default new PlansStore();
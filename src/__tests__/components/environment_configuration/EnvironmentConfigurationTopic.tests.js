import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EnvironmentConfigurationTopic from
  '../../../js/components/environment_configuration/EnvironmentConfigurationTopic';
import MockPlan from '../../mocks/MockPlan';

const topic = MockPlan.capabilities.topics[0];

describe('EnvironmentConfigurationTopic component', () => {
  let EnvConfTopicVdom;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <EnvironmentConfigurationTopic key={0}
                                     title={topic.title}
                                     description={topic.description}
                                     environmentGroups={topic.environment_groups}/>
    );
    EnvConfTopicVdom = shallowRenderer.getRenderOutput();
  });

  it('should render list of EnvironmentGroups in fieldset', () => {
    expect(EnvConfTopicVdom.type).toEqual('fieldset');
    expect(EnvConfTopicVdom.props.className).toContain('environment-topic');
    expect(EnvConfTopicVdom.props.children.length).toEqual(2);
    expect(EnvConfTopicVdom.props.children[0].type.name).toEqual('EnvironmentGroup');
    expect(EnvConfTopicVdom.props.children[1].type.name).toEqual('EnvironmentGroup');
  });
});

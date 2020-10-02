import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as App from '../lib/app-stack';
import * as External from 'external/lib/external-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new App.AppStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(matchTemplate({
    "Resources": {}
  }, MatchStyle.EXACT));
});

test('SynthUtils local stack', () => {
  const app = new cdk.App();
  const stack = new App.AppStack(app, 'MyTestStack');
  SynthUtils.toCloudFormation(stack);
});

test('SynthUtils external stack', () => {
  const app = new cdk.App();
  const stack = new External.ExternalStack(app, 'MyTestStack');
  SynthUtils.toCloudFormation(stack);
});

#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppStack } from '../lib/app-stack';
import { ExternalStack } from 'external/lib/external-stack';

const app = new cdk.App();
new AppStack(app, 'AppStack');
new ExternalStack(app, 'ExternalStack');

#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ExternalStack } from '../lib/external-stack';

const app = new cdk.App();
new ExternalStack(app, 'ExternalStack');

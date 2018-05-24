import React from 'react';

import { storiesOf } from '@storybook/react';

import GranularFLIP from './GranularFLIP'
import SingleFLIP from './SingleFLIP'

storiesOf('FLIP examples', module)
  .add('Single FLIP', () => <SingleFLIP/>)
  .add('Granular FLIP', () => (<GranularFLIP/>));

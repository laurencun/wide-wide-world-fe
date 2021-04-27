import React from 'react';
import { render } from '@testing-library/react';
import Comment from '../components/Comment.js';

test('renders at least on li', () => {
    render(<li/>);
  });
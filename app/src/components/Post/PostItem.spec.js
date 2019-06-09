import React from 'react';
import { PostItem } from './PostItem';
import { shallow } from 'enzyme';

describe('PostItem Component', () => {
  it('renders without crashing', () => {
      shallow(<PostItem />);
   });
});
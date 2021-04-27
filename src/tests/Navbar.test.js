import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Navbar from '../components/Navbar.js';
import {Dropdown} from 'semantic-ui-react'

configure({adapter: new Adapter()})

describe('<Navbar/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Dropdown.Item/>)
    })

    it('renders no dropdown item', () => {
        expect(wrapper.find(Dropdown.Item)).toHaveLength(0);
      });

    it('<Dropdown.Item> should have length of zero', () => {
    wrapper.setProps({store: []})
    expect(wrapper.find(Dropdown.Item)).toHaveLength(0);
    });

    it('should have link to logout', () => {
        expect(wrapper.contains(<Dropdown.Item>Log Out</Dropdown.Item>));
        });
})
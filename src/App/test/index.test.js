import React from 'react';
import ReactDOM from 'react-dom';
import App  from './App';
import Input from './Input/';
import ListItem from './ListItem/';
import { mount } from 'enzyme';

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('finds the input component and field', () => {
        const component = mount(<App/>);
        expect(component.find('input').length).toEqual(1)
        expect(component.find(Input).length).toEqual(1)
    });

    it('should update state in enter', () => {
        const component = mount(<App/>);
        const input = component.find('input');
        input.instance().value = "newThing";
        input.simulate('change');
    })

})

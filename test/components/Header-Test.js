import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Header from './../../src/components/Header/Header';
import Logo from './../../src/components/Logo/Logo';

describe('Header Component ', () => {

  it('renders one <Logo /> component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(Logo)).to.have.length(1);
  });

  it('switches to hamburger when size shrinks', () => {
    expect(false).to.eql(true);
  });
});

//   it('should have 6 <p> tags', function() {
//     const wrapper = shallow(<EventCardInfo />);
//     expect(wrapper.find('p').length).to.equal(7);
//   })
//
//   it('should have a "More Info" button', function() {
//     const wrapper = shallow(<EventCardInfo />);
//     expect(wrapper.find(MoreInfo).length).to.equal(1);
//   })
//
//   it('should have the correct event name', function() {
//     const wrapper = mount(<EventCardInfo eventName={'awesome event'} />);
//     console.log(wrapper.find('p'));
//     expect(wrapper.find('p')[0].text()).to.equal('awesome event');
//   })
//
//   it ('should have the correct location', function() {
//     const wrapper = mount(<EventCardInfo location={{name: 'Codesmith', address: '5300 Beethoven St', city: 'Los Angeles', state: 'CA', zip: '91775'}} />);
//     expect(wrapper.find('div')[2].text()).to.equal('Codesmith');
//     expect(wrapper.find('div')[3].text()).to.equal('5300 Beethoven St');
//     expect(wrapper.find('div')[4].text()).to.equal('Los Angeles, CA 90066');
//   })
// })

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import FormInput from './../../src/components/FormInputs/FormInput.js';

describe('Form Input Component', () => {
  const inputType = 'password';
  const inputID = 'loginPassword';
  const labelText = 'Enter Password';
  const handleChangeFn = sinon.spy();
  const wrapper = shallow(
    <FormInput
      inputType={inputType}
      inputID={inputID}
      labelText={labelText}
      handleChangeFn={handleChangeFn}
    />);

  it('should have an input tag', () => {
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should have a label tag', () => {
    expect(wrapper.find('label')).to.have.length(1);
  });

  it('should have label text equal the labelText prop', () => {
    expect(wrapper.find('label').text()).to.equal('Enter Password');
  });

  it('should have an input type equal to the inputType prop', () => {
    expect(wrapper.find(`input [type="${inputType}"]`)).to.have.length(1);
  });

  it('should have an input id equal to the inputID prop', () => {
    expect(wrapper.find(`input #${inputID}`)).to.have.length(1);
  });

  it('should have a label with a for attribute equal to the inputID prop', () => {
    expect(wrapper.find(`label [htmlFor="${inputID}"]`)).to.have.length(1);
  });

  it('should invoke the handleChangeFn on input change', () => {
    wrapper.find('input').simulate('change');
    expect(handleChangeFn.callCount).to.equal(1);
  });
});

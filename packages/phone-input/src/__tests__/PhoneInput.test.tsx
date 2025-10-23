import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PhoneInput from '../components/PhoneInput';

describe('PhoneInput', () => {
  it('should render without crashing', () => {
    const { getByPlaceholderText } = render(<PhoneInput defaultCountry="US" />);
    expect(getByPlaceholderText('Enter phone number')).toBeTruthy();
  });

  it('should call onChange when text changes', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <PhoneInput defaultCountry="US" onChange={onChange} />
    );
    
    const input = getByPlaceholderText('Enter phone number');
    fireEvent.changeText(input, '+14155552671');
    
    expect(onChange).toHaveBeenCalled();
  });

  it('should display custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <PhoneInput defaultCountry="US" placeholderText="Custom placeholder" />
    );
    expect(getByPlaceholderText('Custom placeholder')).toBeTruthy();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByPlaceholderText } = render(
      <PhoneInput defaultCountry="US" disabled />
    );
    const input = getByPlaceholderText('Enter phone number');
    expect(input.props.editable).toBe(false);
  });

  it('should show error text when error prop is provided', () => {
    const { getByText } = render(
      <PhoneInput defaultCountry="US" error="Invalid number" showError />
    );
    expect(getByText('Invalid number')).toBeTruthy();
  });

  it('should hide flag when showFlag is false', () => {
    const { queryByTestId } = render(
      <PhoneInput defaultCountry="US" showFlag={false} />
    );
    // Flag component won't be rendered
    expect(queryByTestId('flag')).toBeNull();
  });

  it('should use controlled value', () => {
    const { getByDisplayValue } = render(
      <PhoneInput defaultCountry="US" value="+14155552671" />
    );
    expect(getByDisplayValue('+1 415-555-2671')).toBeTruthy();
  });
});


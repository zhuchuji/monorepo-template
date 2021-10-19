/**
 * base on react datepicker: https://github.com/Kiarash-Z/react-modern-calendar-datepicker
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactDatePicker, {
  DatePickerProps as TempDatePickerProps,
  RenderInputProps,
} from '@live/date-picker';
import '@live/date-picker/dist/index.css';

import SvgIcon from '../../SvgIcon';
import BaseInput, { BaseInputProps } from '../BaseInput';

interface DatePickerProps
  extends Omit<BaseInputProps, 'onChange'>,
    Partial<Pick<TempDatePickerProps, 'onChange' | 'dateFormat' | 'maxDate' | 'minDate'>> {}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { value: valueProp, onChange, dateFormat, maxDate, minDate, ...baseInputProps } = props;

  const [value, setValue] = useState(() =>
    'value' in props ? valueProp : baseInputProps.defaultValue,
  );

  useEffect(() => {
    setValue(() => ('value' in props ? valueProp : baseInputProps.defaultValue));
  }, [props]);

  const handleChange = (time: number) => {
    if (!('value' in props)) {
      setValue(time);
    }
    typeof onChange === 'function' && onChange(time);
  };

  return (
    <ReactDatePicker
      dateFormat={dateFormat || 'yyyy-MM-dd'}
      value={value}
      onChange={(time) => handleChange(time)}
      maxDate={maxDate}
      minDate={minDate}
      renderInput={({ inputRef, formatValue }: RenderInputProps) => (
        <BaseInput
          ref={inputRef}
          prepend={<Icon id="icon-calendar" />}
          append={<Icon id="icon-arrow-down" />}
          {...baseInputProps}
          value={formatValue}
        />
      )}
    />
  );
};
export default DatePicker;

const Icon = styled(SvgIcon)`
  font-size: 14px;
  color: #d8d8d8;
  cursor: pointer;
`;

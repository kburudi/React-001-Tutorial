import React from 'react';

import InputCss from './Input.css';

const input = (props) => {
  let inputElement = null;
  let InputClassesCss = [InputCss.InputElement];
  console.log(props.invalid, props.touched)
  if (props.invalid && props.shouldValidate && props.touched){
    InputClassesCss.push(InputCss.Invalid);
  }

  switch (props.elementtype) {
    case 'input':
        inputElement = <input
          className={InputClassesCss.join(' ')}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />;
      break;

    case 'select':
        inputElement = (
          <select
            className={InputClassesCss.join(' ')}
            value={props.value}
            onChange={props.changed}>
            {props.elementconfig.options.map(option => (
              <option value={option.value} key={option.value}> {option.displayValue} </option>
            ))}
          </select>);
      break;

    case 'textarea':
        inputElement = <textarea
          className={InputClassesCss.join(' ')}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        > </textarea>;
      break;

    default:
        inputElement = <input
          className={InputClassesCss.join(' ')}
          {...props.elementconfig}
          onChange={props.changed}
          value={props.value}
        />

  }
  return (
    <div className={InputCss.Input}>
      <label className={InputCss.Label}> {props.label} </label>
      {inputElement}
    </div>
  );
};

export default input;

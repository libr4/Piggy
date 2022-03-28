import React from 'react'

export default function FormRow({type, name, value, handleChange, labelText}) {
  return (
      <div className='form-row'>
        <label htmlFor={name}>{labelText || name}</label>
        <input onChange={handleChange} className='form-input' value={value} name={name} type={type}></input>
      </div>
  )
}

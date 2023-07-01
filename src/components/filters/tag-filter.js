import React from "react";

function TagFilter({filterCategory, onChange, tagOptions, tagsSelected = [], disabled}) {
  const handleOnChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      onChange((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  }

  return <div className='flex flex-wrap mb-4 border rounded-md border-colo-1 p-2 mr-4'>
    <label className="border-b border-color-1 w-full">{filterCategory}</label>
    <div className="overflow-auto max-h-80">
      {tagOptions.map((tag, index) => {
        return <div key={`filter-tag-${index}-${tag.value}`}>
          <input 
            disabled={disabled}
            className='form-check' 
            id={tag?.id || tag.value}
            value={tag.value}
            checked={tagsSelected.includes(tag.value)} 
            onChange={handleOnChange} 
            type='checkbox' 
          /> <label className="cursor-pointer" style={{fontSize: '12px'}} htmlFor={tag.value}>{tag.label}</label>
        </div>
      })}
    </div>
  </div>
}

export default TagFilter;
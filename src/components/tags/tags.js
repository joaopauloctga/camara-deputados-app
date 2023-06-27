import React from "react";

function Tags({tags, onTagChanged, keyValue = 'id', label = 'nome', emptyText}) {
  const buildTags = () => {
    return tags.map((tag) => {
      const tagObj = {};
      tagObj.key = tag[keyValue];
      tagObj.label = tag[label];
      return tagObj;
    })
  }
  return <ul className="flex flex-wrap">
    {tags.length === 0 && <span>{emptyText}</span>}
    {buildTags(tags).map((tag, index) => 
      <li 
        onClick={() => onTagChanged(tag)} 
        className="rounded-md bg-4 px-2 mr-1 text-sm" 
        key={`tag-${index}-${tag.key}`}>
        {tag.label}
      </li>)
    }
  </ul>
}

export default Tags;
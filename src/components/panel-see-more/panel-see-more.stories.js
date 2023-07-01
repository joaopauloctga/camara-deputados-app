import PanelSeeMore from "./panel-see-more"

const Items = () => {
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
  ];
  return <div className="flex flex-wrap">
    <div className="w-1/2 p-2 border border-black">
      <PanelSeeMore maxHeight={100}>
        <ul>
          {items.map(value => <li key={value}>{value}</li>)}
        </ul>
      </PanelSeeMore>
    </div>
    
    <div className="w-1/2 p-2 border border-black">
      <PanelSeeMore theme='green' maxHeight={100} full>
        <ul>
          {items.map(value => <li key={value}>{value}</li>)}
        </ul>
      </PanelSeeMore>
    </div>

    <div className="w-1/2 p-2 border border-black">
      <PanelSeeMore theme='green' maxHeight={200} full>
        <ul>
          {items.map(value => <li key={value}>{value}</li>)}
        </ul>
      </PanelSeeMore>
    </div>

    <div className="w-1/2 p-2 border border-black">
      <PanelSeeMore theme='green' maxHeight={400} full>
        <ul>
          {items.concat(items).map(value => <li key={value}>{value}</li>)}
        </ul>
      </PanelSeeMore>
    </div>
  </div>
}

export default {
  component: <Items />
}

export const AllCards = {
  render: () => <Items />
}
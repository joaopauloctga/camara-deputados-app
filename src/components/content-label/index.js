const ContentLabel = ({label, children}) => {
  return <div className="mb-4">
    <h6 className="m-0 p-0 text-xs">{label}</h6>
    <div className="m-0 p-0">
      {children}
    </div>
  </div>
}

export default ContentLabel;
const PartidoDetails = ({id}) => {
  return <h1>{id}</h1>
}

export const getServerSideProps = async ({query}) => {
  const id = query.id
  return {
    props:{
      id
    }
  }
}

export default PartidoDetails;
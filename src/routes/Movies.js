import React from 'react'
import { useParams } from 'react-router-dom'

const Movies = () => {
  let { type } = useParams();

  return (
    <div>
      movies {type}
    </div>
  );
}

export default Movies
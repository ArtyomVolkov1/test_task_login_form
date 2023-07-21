import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { username } = useSelector((state) => state.user);
  return (
    <div>Welcome { username } </div>
  )
}

export default Home;
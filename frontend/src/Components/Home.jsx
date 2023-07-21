import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { username } = useSelector((state) => state.user);
  return (
    <div><h1>Welcome { username }</h1></div>
  )
}

export default Home;
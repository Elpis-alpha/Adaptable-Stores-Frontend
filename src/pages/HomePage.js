import styled from 'styled-components'

import { motion } from 'framer-motion'

import { pageAnimation } from '../beautify/animations'


const HomePage = () => {

  return (

    <Home variants={pageAnimation} initial="hidden" animate="show" exit="exit">

      <h1>I am the Home Page</h1>

      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi deleniti, praesentium quas possimus cupiditate incidunt eaque a laudantium, soluta nostrum et sit nemo obcaecati accusamus explicabo reiciendis. Illum nemo unde placeat. Rem eius magnam ullam inventore velit excepturi vero, ducimus debitis quae laboriosam, sunt saepe. Excepturi velit ipsam accusamus debitis?</p>

    </Home>

  )

}

const Home = styled(motion.div)`

padding: 0 1rem;

h1{
  font-size: 1.5rem;
  line-height: 2rem;
  padding: .5rem 0;
  font-family: 'Times New Roman', Times, serif;
}

`

export default HomePage
import styled from 'styled-components'

import { motion } from 'framer-motion'

import { pageAnimation } from '../beautify/animations'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'

import { fetchItems, setDisplay } from '../store/actions/itemsAction'

import { ButtonStyle } from '../beautify/styles'


const AboutPage = () => {

  const dispatch = useDispatch()

  useEffect(x => dispatch(fetchItems()), [dispatch])

  const data = useSelector(state => state.items.data.display)

  const RandomizeDisplayUser = () => {

    dispatch(setDisplay(Math.ceil(Math.random() * 20)))

  }

  return (

    <About variants={pageAnimation} initial="hidden" animate="show" exit="exit">

      <h1>I am the About Page</h1>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, maiores corporis expedita, architecto odio ratione quae sunt necessitatibus nesciunt optio ipsa aliquam impedit est nobis modi. Alias optio vero repellat nulla tempora, cumque vitae, blanditiis architecto harum consectetur, at iusto atque laudantium sed. Tenetur ratione fugit maiores nesciunt, atque cumque et quis aliquid, saepe sequi nam officiis eius doloremque. Culpa commodi velit nisi optio veritatis tempore rem molestiae vitae magnam doloribus sapiente laboriosam expedita incidunt harum, earum omnis labore nulla?</p>

      <div>

        <p>Name: {data.name}</p>

        <p>Age: {data.age}</p>

        <p>Address: {data.address}</p>

        <p>Description: {data.description}</p>

      </div>

      <ButtonStyle onClick={RandomizeDisplayUser}>Click Me</ButtonStyle>

    </About>

  )

}

const About = styled(motion.div)`

padding: 0 1rem;

h1{
  font-size: 1.5rem;
  line-height: 2rem;
  padding: .5rem 0;
  font-family: 'Times New Roman', Times, serif;
}
`

export default AboutPage
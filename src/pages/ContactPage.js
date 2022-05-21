import styled from 'styled-components'

import { ButtonStyle } from '../beautify/styles'

import { motion } from 'framer-motion'

import { pageAnimation } from '../beautify/animations'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'

import { fetchUsers } from '../store/actions/userAction'


const ContactPage = () => {

  const dispatch = useDispatch()

  // Dispatch fetch users
  useEffect(() => dispatch(fetchUsers()), [])

  // Retreive user from store
  const data = useSelector(store => store.user)

  return (

    <Contact variants={pageAnimation} initial="hidden" animate="show" exit="exit">

      <h1>I am the Contact Page</h1>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, sit at! Placeat id sunt, illo asperiores aspernatur voluptatem in libero expedita facere reprehenderit repellat saepe adipisci, nobis reiciendis doloribus ut quas hic magni nisi ratione? Quod quia, excepturi sed fugit consectetur doloremque incidunt officia eligendi, dolorem nobis harum est necessitatibus autem perspiciatis minus voluptatibus. Sequi recusandae quod possimus distinctio tempore.</p>

      <ButtonStyle>Contact Me</ButtonStyle>

    </Contact>

  )

}

const Contact = styled(motion.div)`

padding: 0 1rem;

h1{
  font-size: 1.5rem;
  line-height: 2rem;
  padding: .5rem 0;
  font-family: 'Times New Roman', Times, serif;
}

`

export default ContactPage
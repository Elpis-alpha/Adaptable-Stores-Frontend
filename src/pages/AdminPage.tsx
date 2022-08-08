import { useState } from 'react'

import AdminActions from '../components/admin/AdminActions'

import SecureAdmin from '../components/admin/SecureAdmin'


const AdminPage = () => {

  const [allowAdmin, setAllowAdmin] = useState("")

  if (allowAdmin === "") return <SecureAdmin setAllowAdmin={setAllowAdmin} />

  else return <AdminActions allowAdmin={allowAdmin} />

}



export default AdminPage

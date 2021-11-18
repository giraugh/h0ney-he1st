import api from './'

export const fetchRoles = async gamecode => {
  const { data } = await api.get('/roles', { params: { gamecode } })
  return data
}

export const createBear = async ({ gamecode, name, role }) => {
  const { data } = await api.get('/signup', { params: { gamecode, name, role } })
  return data
}

export const fetchBear = async ({ gamecode, name }) => {
  const { data } = await api.get('/login', { params: { gamecode, name } })
  return data
}

export const removeAllBears = async ({ gamecode }) => {
  const { data } = await api.get('/resetGame', { params: { gamecode } }).data
  return data
}

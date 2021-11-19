import api from './'

export const fetchRoles = async gamecode => {
  const { data } = await api.get('/roles', { params: { gamecode } })
  return data
}

export const createBear = async ({ gamecode, bear_name, player_name, role }) => {
  const { data } = await api.get('/signup', { params: { gamecode, bear_name, player_name, role } })
  return data
}

export const fetchBear = async ({ gamecode, bear_name }) => {
  const { data } = await api.get('/login', { params: { gamecode, bear_name } })
  return data
}

export const removeAllBears = async ({ gamecode }) => {
  const { data } = await api.get('/resetGame', { params: { gamecode } }).data
  return data
}

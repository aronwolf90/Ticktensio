export default {
  getUser (state, getters) {
    return (id) => getters.entry({ type: 'users', id: id })
  },
  users (state, getters) {
    return (getters.collection('users') || [])
      .concat(getters.collection('customers') || [])
      .concat(getters.collection('employees') || [])
      .concat(getters.collection('admins') || [])
      .sort((a, b) => a.id - b.id)
  }
}

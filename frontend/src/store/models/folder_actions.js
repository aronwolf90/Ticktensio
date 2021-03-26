const endpoint = '/api/v1'

export default {
  getArchiveFolders (context) {
    return context.dispatch('get', {
      endpoint,
      resource: 'folders?include[]=documents&filter[project_id]=null'
    })
  },
  getFolder (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `folders/${id}?include[]=documents`
    })
  },
  getProjectFolder (context, projectId) {
    return context.dispatch('getProject', projectId).then(response => {
      return context.dispatch(
        'loadRelationship', {
          entry: response.data,
          name: 'folder'
        }
      )
    })
  }
}

import React from 'react'

const menu = ({ page }) => {
  return (
      <div>menu</div>

      

    

  )
}

export default menu

/* 
          <Route index element={<Home isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
          <Route path="logout" element={<Logout />} />

          <Route path="projects">
            <Route index element={<ListProjects isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path=":id" element={<SingleProject project={project} isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path="new" element={<CreateProject isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
          </Route>

          <Route path="tickets">
            <Route index element={<ListTickets isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path=":id" element={<SingleTicket ticket={ticket} isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path="new" element={<CreateTicket isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
          </Route>

          <Route path="users">
            
            <Route path=":id" element={<SingleUser user={user} isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
          </Route>

          <Route path="admin/" element={<AdminRoute />}>
            <Route path="projects" element={<ManageProjects isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
            <Route path="roles" element={<ManageRoles isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
          </Route>

*/
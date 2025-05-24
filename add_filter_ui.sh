sed -i "/return (<AdminLayout/a \
      <div className=\"mb-4\">\
        <label htmlFor=\"statusFilter\" className=\"mr-2 font-medium\">Filter by Status:</label>\
        <select\
          id=\"statusFilter\"\
          value={statusFilter}\
          onChange={(e) => setStatusFilter(e.target.value)}\
          className=\"border px-3 py-1 rounded\"\
        >\
          <option value=\"all\">All</option>\
          <option value=\"active\">Active</option>\
          <option value=\"expired\">Expired</option>\
          <option value=\"suspended\">Suspended</option>\
        </select>\
      </div>" pages/admin/builders/index.tsx

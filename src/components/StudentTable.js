
import React from "react";

function StudentTable({students,deleteStudent,setEditStudent}){

return(

<table>

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Age</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{students.map((s)=>(

<tr key={s.id}>

<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.age}</td>

<td>

<button
className="edit"
onClick={()=>setEditStudent(s)}
>
Edit
</button>

<button
className="delete"
onClick={()=>deleteStudent(s.id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

);
}

export default StudentTable;

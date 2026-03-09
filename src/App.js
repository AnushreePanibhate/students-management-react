
import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Loading from "./components/Loading";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./App.css";

function App(){

const [students,setStudents]=useState([]);
const [editStudent,setEditStudent]=useState(null);
const [loading,setLoading]=useState(true);

useEffect(()=>{
setTimeout(()=>{
setStudents([
{id:1,name:"Rahul",email:"rahul@mail.com",age:22},
{id:2,name:"Anita",email:"anita@mail.com",age:21}
]);
setLoading(false);
},1500);
},[]);

const addStudent=(student)=>{
setStudents([...students,{...student,id:Date.now()}]);
};

const updateStudent=(student)=>{
setStudents(students.map(s=>s.id===student.id?student:s));
setEditStudent(null);
};

const deleteStudent=(id)=>{
if(window.confirm("Delete this student?")){
setStudents(students.filter(s=>s.id!==id));
}
};

const exportExcel=()=>{
const worksheet=XLSX.utils.json_to_sheet(students);
const workbook=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook,worksheet,"Students");

const buffer=XLSX.write(workbook,{bookType:"xlsx",type:"array"});

const data=new Blob([buffer],{
type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
});

saveAs(data,"students.xlsx");
};

if(loading) return <Loading/>;

return(
<div className="container">

<h1>Students Management</h1>

<StudentForm
addStudent={addStudent}
editStudent={editStudent}
updateStudent={updateStudent}
/>

<button onClick={exportExcel} className="export-btn">
Download Excel
</button>

<StudentTable
students={students}
deleteStudent={deleteStudent}
setEditStudent={setEditStudent}
/>

</div>
);
}

export default App;

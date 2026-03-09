
import React,{useState,useEffect} from "react";

function StudentForm({addStudent,editStudent,updateStudent}){

const [student,setStudent]=useState({name:"",email:"",age:""});
const [errors,setErrors]=useState({});

useEffect(()=>{
if(editStudent) setStudent(editStudent);
},[editStudent]);

const validate=()=>{

let err={};

if(!student.name) err.name="Name required";

if(!student.email) err.email="Email required";
else if(!/\S+@\S+\.\S+/.test(student.email))
err.email="Invalid email";

if(!student.age) err.age="Age required";

setErrors(err);

return Object.keys(err).length===0;
};

const handleSubmit=(e)=>{

e.preventDefault();

if(!validate()) return;

if(editStudent) updateStudent(student);
else addStudent(student);

setStudent({name:"",email:"",age:""});
};

return(

<form onSubmit={handleSubmit}>

<input
placeholder="Name"
value={student.name}
onChange={(e)=>setStudent({...student,name:e.target.value})}
/>
<div>{errors.name}</div>

<input
placeholder="Email"
value={student.email}
onChange={(e)=>setStudent({...student,email:e.target.value})}
/>
<div>{errors.email}</div>

<input
placeholder="Age"
value={student.age}
onChange={(e)=>setStudent({...student,age:e.target.value})}
/>
<div>{errors.age}</div>

<button type="submit">
{editStudent?"Update":"Add"} Student
</button>

</form>

);
}

export default StudentForm;

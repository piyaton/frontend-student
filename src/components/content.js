import React from 'react'
import { Route } from 'react-router-dom'
import StudentComponent from '../student/student.component'

const studentComponent = () => <StudentComponent></StudentComponent>

export default function Content() {
    return(
        <Route path="/StudentComponent" component={studentComponent}/>    
    )
}
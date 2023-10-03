import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { saveTask } from "../services/TaskServiece";

export function TaskForm() {
    const[formData , setFormData] = useState({});

    const handleChange=(eventObj)=>{
       setFormData({...formData , [eventObj.target.name]:eventObj.target.value});
    }

    const handleSubmit=async(eventObj)=>{
      eventObj.preventDefault();
           const response  =  await saveTask(formData);
           console.log(response.data);
    }
  return (
    <>
      <Container className="mt-5 text-center">
        <Alert variant="primary">Create New Task</Alert>
      </Container>
      <Container className="mt-5" style={{}}>
        <Row>
          <Col lg="6" style={{ margin:"auto" ,border:"3px solid rgb(204, 255, 230)" , padding:"12px" ,"border-radius":"10px"}}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Task Name </Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter task name" onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" placeholder="Enter description" onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Deadline </Form.Label>
                <Form.Control type="date" name="deadline"  onChange={handleChange}/>
              </Form.Group>

              <Button type="submit" variant="success" style={{border:"3px solid  rgb(204, 255, 230)","margin-left":"40%"}} >Create Task</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

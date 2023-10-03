import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { getTasks } from "../services/TaskServiece";


export function Dashboard() {
  const [tasks,setTasks] = useState([]);
  const[totalTasks ,setTotalTasks] = useState();
  const[completedTasks ,setCompletedTasks] = useState();
  const[pendingTasks ,setPendingTasks] = useState();

  const fetchCounts = async()=>{
        const totalCount  =  await getTasks("totalTasks");
        const completedCount =  await getTasks("completedTasks");
        const pendingCount =   await getTasks("pendingTasks");

        setTotalTasks(totalCount.data[0].totalTasks);
        setCompletedTasks(completedCount.data[0].completedTasks);
        setPendingTasks(pendingCount.data[0].pendingTasks);
  }

  useEffect(()=>{
    fetchCounts();
  },[])

 async function getTasksByUrl(task){
    const response = await getTasks(task);
    // console.log(response.data);
    setTasks(response.data);
  }
  return (
    <>
      <Container className="mt-5 text-center">
        <Alert>welcome to task manager</Alert>
      </Container>
      <Container>
        <Row>
          <Col lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Total Task</Card.Title>
                <Card.Text>
                 <Alert variant="primary">Total : {totalTasks?totalTasks:0} tasks</Alert>
                </Card.Text>
                <Button variant="primary" onClick={()=>{getTasksByUrl("all")}}>view all tasks</Button>
              </Card.Body>
            </Card>
            </Col>

            <Col lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Completed Task</Card.Title>
                <Card.Text>
                 <Alert variant="success" >Completed : {completedTasks?completedTasks:0} tasks</Alert>
                </Card.Text>
                <Button variant="success" onClick={()=>{getTasksByUrl("completed")}}>view Completed tasks</Button>
              </Card.Body>
            </Card>
            </Col>
     
            <Col lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Pending Task</Card.Title>
                <Card.Text>
                 <Alert>Pending : {pendingTasks?pendingTasks:0} tasks</Alert>
                </Card.Text>
                <Button variant="danger" onClick={()=>{getTasksByUrl("pending")}}>view pending tasks</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container >
     
     {tasks.length>0?
      <Container className="mt-5 text-center" >
        <Row>
          {
            tasks.map((t)=>{
              return(
                <Col lg="3">
                 <Card>
                  <Alert variant={t.isCompleted?"success":"danger"}>
                    {t.isCompleted?"Completed":"Pending"}
                  </Alert>
                  <Card.Body>
                    <Card.Title>{t.name}</Card.Title>
                    <Card.Text>
                      <Alert variant="primary">{t.description}</Alert>
                    </Card.Text>
                    {/* <Button variant="danger" className="btn-sm " onClick={async()=>{
                        await deleteTask(t._id);
                        await getTaskByUrl("all");
                    }}>remove</Button> */}
                    {/* {!t.isCompleted?
                    <Button variant="primary" className="btn-sm ms-4" onClick={async()=>{
                        await completeTask(t._id);
                        await getTaskByUrl("all");
                    }
                    }>complete</Button>:null
                    } */}
                  </Card.Body>
                 </Card>                
                </Col>
              )
            })
          }
        </Row>
      </Container>:null
     }
    </>
  );
}

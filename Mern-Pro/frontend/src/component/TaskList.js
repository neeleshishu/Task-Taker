import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { completeTask, deleteTask, getTasks } from "../services/TaskServiece";

export function TaskList() {
  const [task, setTask] = useState([]);

  const getTaskByUrl = async (url) => {
    const response = await getTasks(url);
    setTask(response.data);
  };

  useEffect(() => {
    getTaskByUrl("all");
  },[]);
  return (
    <>
      <Container className="mt-5 text-center">
        <Alert>List of Tasks</Alert>
      </Container>
      <Container>
      <Dropdown className="mt-4 mb-4" onSelect={async(k,eventObj)=>{
        await getTaskByUrl(eventObj.target.innerHTML);
       
      }}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Task
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >All</Dropdown.Item>
        <Dropdown.Item >Pending</Dropdown.Item>
        <Dropdown.Item >Completed</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </Container>
      {task.length>0?
      <Container>
        <Row>
          {task.map((t) => {
            return (
              <Col lg="4">
                <Card>
                    <Alert variant={t.isCompleted?"success":"danger"}>
                    {t.isCompleted?"Completed":"Pending"}
                    </Alert>
                  <Card.Body>
                    <Card.Title>{t.name}</Card.Title>
                    <Card.Text>
                      <Alert variant="primary">{t.description}</Alert>
                    </Card.Text>
                    <Button variant="danger" className="btn-sm " onClick={async()=>{
                        await deleteTask(t._id);
                        await getTaskByUrl("all");
                    }}>remove</Button>
                    {!t.isCompleted?
                    <Button variant="primary" className="btn-sm ms-4" onClick={async()=>{
                        await completeTask(t._id);
                        await getTaskByUrl("all");
                    }
                    }>complete</Button>:null
                    }
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>:null
      }
    </>
  );
}

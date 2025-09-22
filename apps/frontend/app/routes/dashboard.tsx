import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Nav from 'react-bootstrap/Nav';
import { Tab, Tabs } from 'react-bootstrap';
import WorkflowCard from '~/components/Dashboard/WorkflowCard';

const credentials = [
    { title: "Credential 1", description: "Credential 1 description" },
    { title: "Credential 2", description: "Credential 2 description" },
    { title: "Credential 3", description: "Credential 3 description" },
]

const executions = [
    { title: "Execution 1", description: "Execution 1 description" },
    { title: "Execution 2", description: "Execution 2 description" },
    { title: "Execution 3", description: "Execution 3 description" },
]

const Workflows = () => {
    const navigate = useNavigate();
    const [workflows, setWorkflows] = useState([]);
    const [credentials, setCredentials] = useState([]);
    
    const loadWorkflows = () => {
        fetch( `${import.meta.env.VITE_BACKEND_URL}workflow`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            }
        }).then(res => res.json()).then(data => {
            setWorkflows(data);
            console.log("Workflows", data);
        }).catch(err => console.log(err));
    };

    const loadCredentials = () => {
        fetch( `${import.meta.env.VITE_BACKEND_URL}credential`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            }
        }).then(res => res.json()).then(data => {
            setCredentials(data);
            console.log("Credentials", data);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        loadWorkflows();
        loadCredentials();
        // loadExecutions();
    }, [])

    return (
        <div className="p-4 !px-36 bg-[#2D2E2E] h-[90vh] ">
            <div className="flex justify-end">
                <button className=" bg-orange-500 text-white text-sm px-4 py-1 rounded" onClick={() => navigate("/workflow")}>Create Workflow</button>
            </div>
            <div className=''>
                <Tabs defaultActiveKey="home" id="tabs-example">
                    <Tab eventKey="home" title="Workflows">
                        <ul className='space-y-4 mt-4 px-0 text-center'>
                            {workflows.length > 0 ? workflows.map((workflow, index) => (
                                <li key={index}>
                                    {WorkflowCard(workflow)}
                                </li>
                            )) : <p >No workflows found</p>}
                        </ul>
                    </Tab>

                    <Tab eventKey="option2" title="Credentials">
                        <ul className='space-y-4 mt-4 px-0 '>
                            {credentials.map((credential, index) => (
                                <li key={index}>
                                    {WorkflowCard(credential)}
                                </li>
                            ))}
                        </ul>
                    </Tab>

                    <Tab eventKey="option3" title="Executions">
                        <ul className='space-y-4 mt-4 px-0 '>
                            {executions.map((execution, index) => (
                                <li key={index}>
                                    {WorkflowCard(execution)}
                                </li>
                            ))}
                        </ul>
                    </Tab>
                </Tabs>

            </div>
        </div>
    )
}

export default Workflows;



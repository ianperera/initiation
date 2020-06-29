import React, { useEffect, useContext, useState } from "react";
import { Container, Card, CardBody } from 'reactstrap'
import axios from "axios";
import { AppContext } from "../context";

const DashboardPage: React.FC<{}> = () => {
  const { state } = useContext(AppContext);
  const [ domains, setDomains ] = useState([])
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.intelliscan.io/user/domains/",
      headers: { token: state.token },
    }).then((res) => {
      setDomains(res.data.domains);
    });
  }, [state.token]);
  return (
    <Container className="py-4">
      {domains.map((domain, idx) => (
        <Card key={idx}>
          <CardBody>{domain}</CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default DashboardPage;

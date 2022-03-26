import React, { useState, useEffect } from "react";
import CompanyEditForm from "./CompanyEditForm";
import CompanyCard from "./CompanyCard";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import * as Api from "../../api";

function Company({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("회사");
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("company", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Container style={{ padding: "0px" }}>
      {isEditing ? (
        <CompanyEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <CompanyCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </Container>
  );
}
export default Company;
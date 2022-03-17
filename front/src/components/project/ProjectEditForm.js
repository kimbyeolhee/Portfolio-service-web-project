import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import * as Api from "../../api";

/**
 * 편집 폼 컴포넌트
 * @param currentProject Projects -> Project 컴포넌트로부터 전달받은 project 데이터
 * @param setProjects Projects -> Project 컴포넌트로부터 전달받은 setProjects 함수
 * @param setIsEditing Project 컴포넌트로부터 전달받은 인자 :  isEditing의 상태 관리 함수 (true일 경우 편집 폼 컴포넌트 보여짐)
 * @return 프로젝트 제목, 상세내용, 시작일,종료일, 확인/취소 버튼
 */

function ProjectEditForm({ currentProject, setIsEditing, setProjects }) {
  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [startDate, setStartDate] = useState(new Date(currentProject.from_date));
  const [endDate, setEndDate] = useState(new Date(currentProject.to_date));
  // TODO: 데이터 전송, 나중에 Form에 onSubmit 집어넣기
  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = currentProject.user_id;

    await Api.put(`projects/${currentProject.id}`, {
      user_id,
      title,
      description,
      from_date: startDate,
      to_date: endDate,
    });

    // ? 1. 수정된 정보 GET요청
    // ? 2. 수정된 정보 projects에 저장
    // ? 3. 편집 폼 종료
    const res = await Api.get("projectlist", user_id);
    setProjects(res.data);
    setIsEditing(false);
  }

  return(
    <Form>
      <Form.Group controlId="formBasicTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 상세내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col md="auto">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Col>
        <Col md="auto">
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-3">확인</Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default ProjectEditForm;
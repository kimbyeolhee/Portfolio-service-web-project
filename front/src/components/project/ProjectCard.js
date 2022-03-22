import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// 하위 컴포넌트
import ProjectEditForm from "./ProjectEditForm";

// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false)
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남

function ProjectCard({ project, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await Api.delete(`projects/${project.id}`);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        {isEditing ? (
          <ProjectEditForm
            currentProject={project}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col>
            <div>{project.title}</div>
            <div>{project.description}</div>
            <div>
              {project.from_date.slice(0, 10)} ~ {project.to_date.slice(0, 10)}
            </div>
          </Col>
        )}

        {isEditable && (
          <Col xs lg="2">
            {!isEditing && (
              <>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="mr-3"
                >
                  편집
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    alert("정말로 삭제하시겠습니까?");
                    handleDelete();
                  }}
                  className="mr-3"
                >
                  삭제
                </Button>
              </>
            )}
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;

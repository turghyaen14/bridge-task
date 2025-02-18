import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { StepFormContext } from "../../context/StepFormContext";

const HighScores = () => {
  const [highscores, setHighScores] = useState([]);
  const { name } = useContext(StepFormContext);
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("http://localhost:5000/scores");
        response.json().then((data) => {
          const sortedData = data.sort((a, b) => b.score - a.score);
          setHighScores(sortedData);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScores();
  }, []);

  if (highscores.length === 0) return "...loading";

  return (
    <>
      <h2 className="text-center fs-2 my-3">🎉 High Scores 🎉</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Scores</th>
          </tr>
        </thead>
        <tbody>
          {highscores.map((item, index) =>
            item.name === name ? (
              <tr style={{ backgroundColor: "#D6EEEE" }}>
                <td style={{ backgroundColor: "#D6EEEE" }}>{index + 1}</td>
                <td style={{ backgroundColor: "#D6EEEE" }}>{item.name}</td>
                <td style={{ backgroundColor: "#D6EEEE" }}>{item.score}</td>
              </tr>
            ) : (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default HighScores;

import "./App.css";
import { useState } from "react";

const initialDatas = [
  {
    status: "To-Do",
    tickets: [
      {
        no: "1",
        desc: "First",
      },
      {
        no: "2",
        desc: "Second",
      },
      {
        no: "3",
        desc: "Third",
      },
    ],
  },
  {
    status: "In-Progress",
    tickets: [
      {
        no: "4",
        desc: "First",
      },
      {
        no: "5",
        desc: "Second",
      },
      {
        no: "6",
        desc: "Third",
      },
    ],
  },
  {
    status: "Done",
    tickets: [
      {
        no: "7",
        desc: "First",
      },
      {
        no: "8",
        desc: "Second",
      },
      {
        no: "9",
        desc: "Third",
      },
    ],
  },
];

function App() {
  const [allDatas, setAllDatas] = useState(initialDatas);

  const onDrag = (id, status) => {
    setCurrentData({ id, status });
  };

  const onDrop = (column) => {

    // Find the column where the ticket is currently located
    const dragColumn = allDatas.find((data) => data.status === currentData.status);

    // Find the ticket being dragged
    const draggedTicket = dragColumn.tickets.find((ticket) => ticket.no === currentData.id);
  
    // Remove the ticket from the original column
    const updatedDragColumn = {
      ...dragColumn,
      tickets: dragColumn.tickets.filter((ticket) => ticket.no !== currentData.id),
    };
  
    // Find the target column where the ticket will be dropped
    const dropColumn = allDatas.find((data) => data.status === column);
  
    // Add the ticket to the target column
    const updatedDropColumn = {
      ...dropColumn,
      tickets: [...dropColumn.tickets, draggedTicket],
    };
  
    // Update the state with the modified columns
    const updatedAllDatas = allDatas.map((data) => {
      if (data.status === dragColumn.status) {
        return updatedDragColumn;
      } else if (data.status === dropColumn.status) {
        return updatedDropColumn;
      }
      return data;
    });
  
    setAllDatas(updatedAllDatas);
  };

  const [currentData, setCurrentData] = useState({});

  return (
    <div className="App">
      <header className="App-header">Drap & Drop</header>
      <div className="container">
        {allDatas.map((columnData, index) => {
          return (
            <div
              className="to-do"
              key={index}
              onDrop={() => onDrop(columnData.status)}
              onDragOver={(event) => event.preventDefault()}
            >
              <h3>{columnData.status}</h3>
              {columnData.tickets.map((data) => (
                <div
                  className="card"
                  draggable="true"
                  onDragStart={() => onDrag(data.no, columnData.status)}
                  key={data.no}
                >
                  <p>{data.no}</p>
                  <p>{data.desc}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

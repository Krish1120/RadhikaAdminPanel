import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function PreviewImage({ filesData, deleteHandler }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {filesData &&
        filesData.map((file, key) => {
          return (
            <div key={key} style={{ margin: 5 }}>
              <img
                src={URL.createObjectURL(file)}
                alt="image"
                height="200rem"
                width="200rem"
              />
              <IconButton
                aria-label="delete"
                size="small"
                style={{
                  color: "red",
                  position: "relative",
                  right: 32,
                  bottom: 83,
                  backgroundColor: "white",
                }}
                onClick={() => deleteHandler(key)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          );
        })}
    </div>
  );
}

export default PreviewImage;

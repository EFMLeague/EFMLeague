import React from "react";
import "./circularProgress.css";
export default function circularProgress({
  percent,
  color,
  title,
  textInside,
  textSpan,
}: {
  percent: string;
  color: string;
  title: string;
  textInside: string;
  textSpan: string;
}) {
  return (
    <div className="cardProgress">
      <div className="percent">
        <svg>
          <circle cx="105" cy="105" r="100"></circle>
          <circle
            cx="105"
            cy="105"
            r="100"
            style={{
              ["--percent" as any]: percent,
              ["--colorHex" as any]: color,
            }}
          ></circle>
        </svg>
        <div className="number">
          <h3>
            {textInside}
            <span>{textSpan}</span>
          </h3>
        </div>
      </div>
      <div className="title">
        <h2>{title}</h2>
      </div>
    </div>
  );
}

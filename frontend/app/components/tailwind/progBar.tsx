"use client";
import Progress from "@material-tailwind/react/components/Progress";
import Typography from "@material-tailwind/react/components/Typography";
import { colors } from "@material-tailwind/react/types/generic";
import React from "react";

export default function progBar({
  value,
  colors,
  barProps,
  percent,
  typography,
}: {
  value: number;
  colors: colors;
  barProps: string;
  percent?: boolean;
  typography?: string;
}) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-end gap-4">
        <Typography color="blue-gray" variant="small">
          {percent === true ? typography : value + "%"}
        </Typography>
      </div>
      <Progress value={value} color={colors} className={barProps} />
    </div>
  );
}

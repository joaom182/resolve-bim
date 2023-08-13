import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export const Accordion = ({ children }: Props) => {
  return (
    <div>
      <h1>Accordion</h1>
      {children}
    </div>
  );
};

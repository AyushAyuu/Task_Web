import React from "react";
import { FaRegHandshake } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="position-fixed bottom-0 w-100 container-fluid text-center box-shadow border-top bg-dark p-2">
        <h6 className="text-light">
          Authorized@2024 By <FaRegHandshake /> Ayuu Developer{" "}
        </h6>
      </div>
    </>
  );
};

export default Footer;

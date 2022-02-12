import React from "react";
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return ( 
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="Cursos que recomiendo de Udemy" />
    </div>
  );
}
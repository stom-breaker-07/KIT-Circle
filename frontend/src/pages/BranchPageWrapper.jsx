import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BranchPage from "../components/BranchPage";
import '../index.css'

/**
 * This wrapper reads params and passes them to BranchPage.
 * BranchPage is in components because it is a self-contained section.
 */
export default function BranchPageWrapper() {
  const { code } = useParams();
  const navigate = useNavigate();

  // If invalid code, fallback to home
  const allowed = ["cse", "ise", "ece", "aiml", "civil", "mech"];
  if (!allowed.includes(code)) {
    navigate("/", { replace: true });
    return null;
  }

  return <BranchPage branch={code} />;
}

import { useAppContext } from "../context/AppContext";

export default function Alert() {
  const {showAlert, alertText, alertType} = useAppContext(); 
  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>
  )
}

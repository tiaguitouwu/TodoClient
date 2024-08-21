import useProtected from "../hooks/useProtected";

function Protected() {
    const{  
      message
    } = useProtected();
  
    return (
        <div>
          <h2>Protected Route</h2>
          <p>{message}</p>
        </div>
    );
    
}
export default Protected;
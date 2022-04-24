import { useParams } from "react-router-dom";

export default function UserProfile() {
  console.log("user profile");
  let { id } = useParams();
  return (
    <div>
      {id}
    </div>
  )
}

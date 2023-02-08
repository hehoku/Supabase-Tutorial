import { Edit } from "react-feather";
import { Link } from "react-router-dom";
import "./work.css";

export default function Work({ work }) {
  return (
    <div className="work">
      <a href={work.url}>
        <p>{work.title}</p>
      </a>
      <button>
        <Link to={"/" + work.id}>
          <Edit />
        </Link>
      </button>
    </div>
  );
}

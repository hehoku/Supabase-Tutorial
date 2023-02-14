import { Edit, Trash2 } from "react-feather";
import { Link } from "react-router-dom";

import supabase from "../config/supabaseClient";
import "../config/supabaseClient";
import "./work.css";

export default function Work({ work, onDelete }) {
  let handleDelete = async () => {
    let { data, error } = await supabase
      .from("works")
      .delete()
      .eq("id", work.id)
      .select();

    if (data) {
      console.log(data);
      onDelete(data.id);
    }

    if (error) {
      console.log(error);
    }
  };

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

      <button onClick={handleDelete} className="delete">
        <Trash2 />
      </button>
    </div>
  );
}

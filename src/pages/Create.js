import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
  let [title, setTitle] = useState("");
  let [url, setUrl] = useState("");
  let [formError, setFormError] = useState(null);

  let navigate = useNavigate();

  let handleSubmit = async function (e) {
    e.preventDefault();

    if (!title || !url) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    let { data, error } = await supabase
      .from("works")
      .insert({
        title: title,
        url: url,
      })
      .select();

    if (error) {
      setFormError(error);
    }

    if (data) {
      console.log(data);
      setFormError(null);
      return navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="url">
          Url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button>Add New Project</button>
      </form>
      {formError && <p>{formError}</p>}
    </div>
  );
};

export default Create;

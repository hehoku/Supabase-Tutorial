import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import "./update.css";

const Update = () => {
  const [fetchError, setFetchError] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [formError, setFormError] = useState(null);
  const [workId, setWorkId] = useState("");

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let { id: workId } = params;
    setWorkId(workId);
    const fetchWorks = async () => {
      let { data, error } = await supabase
        .from("works")
        .select()
        .eq("id", workId);

      if (error) {
        setFetchError("Could not fetch the works");
      }

      if (data) {
        console.log(data);
        setFetchError(null);
        let { title, url } = data[0];
        setTitle(title);
        setUrl(url);
        setFormError(null);
      }
    };

    fetchWorks();
  }, [params]);

  let handleSubmit = async function (e) {
    console.log("handleSubmit");
    e.preventDefault();

    if (!title || !url) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    let { data, error } = await supabase
      .from("works")
      .update({
        title: title,
        url: url,
      })
      .eq("id", workId)
      .select();

    if (error) {
      setFormError(error);
    }

    if (data) {
      console.log("update return data: ", data);
      return navigate("/");
    }
  };
  return (
    <div className="page update">
      <h2>Update</h2>
      <div className="formContainer">
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
          {formError && <p className="error">*{formError}</p>}
          {fetchError && <p className="error">*{fetchError}</p>}
          <button>Update Project</button>
        </form>
      </div>
    </div>
  );
};

export default Update;

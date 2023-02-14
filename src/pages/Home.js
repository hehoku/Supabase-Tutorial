import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import Work from "../components/Work";
import "./home.css";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [works, setWorks] = useState(null);
  const [order, setOrder] = useState("created_at");
  const handleDelete = (id) => {
    setWorks((prevWorks) => {
      prevWorks.filter((work) => work.id !== id);
    });
  };

  useEffect(() => {
    const fetchWorks = async () => {
      let { data, error } = await supabase
        .from("works")
        .select()
        .order(order, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the works");
        setWorks(null);
      }

      if (data) {
        console.log(data);
        setWorks(data);
        setFetchError(null);
      }
    };

    fetchWorks();
  }, [order]);

  return (
    <div className="page home">
      <h2>Home</h2>
      <button
        className={order === "created_at" ? "active sortBtn" : "sortBtn"}
        onClick={() => setOrder("created_at")}
      >
        created_at
      </button>
      <button
        className={order === "title" ? "active sortBtn" : "sortBtn"}
        onClick={() => setOrder("title")}
      >
        title
      </button>

      {fetchError && <p>{fetchError}</p>}
      {works && (
        <div className="worksContainer">
          {works.map((item) => (
            <Work key={item.id} onDelete={handleDelete} work={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

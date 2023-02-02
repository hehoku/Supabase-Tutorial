import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import Work from "../components/Work";
import "./home.css";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [works, setWorks] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      let { data, error } = await supabase.from("works").select();

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
  }, []);

  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && <p>{fetchError}</p>}
      {works && (
        <div className="worksContainer">
          {works.map((item) => (
            <Work key={item.id} work={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

import { useState } from "react";
import Towers from "./Towers";
import Videos from "./Videos";
import "./HomePage.css";

function HomePage() {
  const [video, setVideo] = useState(true);

  return (
    <div className={`home_page`}>
      {video && <Videos />}
      <Towers onDescription={() => setVideo(!video)} />
    </div>
  );
}

export default HomePage;

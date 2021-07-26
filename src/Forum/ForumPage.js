import { useState } from "react";
import ForumCategories from "./ForumCategories";
import ForumTopics from "./ForumTopics";
import "./ForumPage.css";

function ForumPage() {
  const [categoryID, setCategoryID] = useState("");

  const handleCategoryID = (e, forumCategory) => {
    if (
      e.target.className.includes("forum_category ") ||
      e.target.className === "forum_category_title"
    ) {
      setCategoryID(forumCategory._id);
    }
  };

  return (
    <div className={`forum`}>
      <h2>Forum</h2>
      <ForumCategories
        onClick={handleCategoryID}
        resetCategories={setCategoryID}
      />
      <ForumTopics categoryID={categoryID} />
    </div>
  );
}

export default ForumPage;

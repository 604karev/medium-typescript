import { Article } from "pages/Article";
import { Routes, Route } from "react-router-dom";

function ArticleRoutes() {
  return (
    <Routes>
      <Route path="/article/:slug" element={<Article />} />
      <Route path="/article/new" element={<Article />} />
      <Route path="/article/:slug/edit" element={<Article />} />
    </Routes>
  );
}

export default ArticleRoutes;

import { GlobalFeed } from "pages/GlobalFeed";
import { Routes, Route } from "react-router-dom";

function GlobalFeedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed />}>
        <Route path="tags" element={<GlobalFeed />}>
          <Route path=":tag" element={<GlobalFeed />} />
        </Route>
        <Route path="feed" element={<GlobalFeed />} />
      </Route>
    </Routes>
  );
}

export default GlobalFeedRoutes;
